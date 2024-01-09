import { FC, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import {
  Table as MuiTable,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  InputBase,
  IconButton,
  CircularProgress,
  TablePagination,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SvgIcon } from '@/components';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

interface ActionRef {
  reload: () => void;
}
interface columnsItem {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
  fixed?: string;
  render?: (text: any, record: any) => JSX.Element;
}
interface dataSourceItem {
  [key: string]: any;
}
interface TableProps {
  searchMode: 'simple' | 'advance' | false;
  columns: columnsItem[];
  elevation?: number;
  request: (params?: any) => Promise<{ data: dataSourceItem[] }>;
  onCreate: Function;
  actionRef?: React.MutableRefObject<ActionRef>;
  params?: {
    [key: string]: any;
  };
  maxHeight?: string;
  pagination?: {
    page: number;
    size: number;
    total: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement> | null,
      page: number
    ) => void;
  };
}

const Table: FC<TableProps> = (props: TableProps) => {
  const {
    elevation,
    columns = [],
    searchMode = false,
    onCreate,
    actionRef,
    pagination,
    params,
    request,
  } = props;
  const [dataSource, setDataSource] = useState<dataSourceItem[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [currentParams, setCurrentParams] = useState<any>(params);
  const getData = async (params?: any) => {
    setLoading(true);
    const result = await request(params);
    setDataSource(result.data);
    if (!pagination) {
      setTotal(result.data.length);
    }
    setLoading(false);
  };
  const reload = () => {
    getData(params);
  };
  //创建一个变量存放分页后的数据
  const paginationDataSource = useMemo(() => {
    if (pagination) return dataSource;
    return dataSource.slice(page * size, page * size + size);
  }, [page, size, dataSource, pagination]);

  //初始化时，请求数据
  useEffect(() => {
    getData(params);
  }, []);

  //当params改变时，重新请求数据
  useEffect(() => {
    getData(params);
  }, [currentParams]);

  useEffect(() => {
    let nowArg = {
      ...currentParams,
      ...params,
    };
    if (
      JSON.stringify(nowArg) != '{}' &&
      JSON.stringify(nowArg) != JSON.stringify(currentParams)
    ) {
      setCurrentParams(nowArg);
      getData(nowArg);
    }
  }, [params]);

  //自定义分页
  useEffect(() => {
    setPage(pagination?.page || 0);
    setSize(pagination?.size || 10);
    setTotal(pagination?.total || 0);
  }, [pagination]);

  useImperativeHandle(actionRef, () => ({
    reload,
  }));
  return (
    <Box
      sx={{
        maxHeight: props.maxHeight || 'auto',
        display: 'flex',
        flexDirection: 'column',
        pr: 1,
      }}>
      <Box>
        {searchMode && searchMode === 'simple' && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <div>
              <InputBase
                sx={{ mb: 1, borderBottom: 1, borderColor: 'divider' }}
                placeholder="输入关键字搜索"
              />
              <IconButton type="button" sx={{ p: '10px' }}>
                <SearchIcon />
              </IconButton>
            </div>
            {onCreate && (
              <div>
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  onClick={() => onCreate()}>
                  <PlaylistAddIcon />
                </IconButton>
              </div>
            )}
          </Box>
        )}
      </Box>
      <TableContainer component={Paper} elevation={elevation}>
        <MuiTable stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  width={column.width ? column.width : 100}
                  key={column.key}>
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody
            sx={{
              position: 'relative',
            }}>
            {loading && (
              <Box
                component="tr"
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255,255,255,0.8)',
                  zIndex: 1,
                  display: 'grid',
                  placeItems: 'center',
                }}>
                <td>
                  <CircularProgress />
                </td>
              </Box>
            )}

            {paginationDataSource.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    width={column.width ? column.width : 100}>
                    {column.render
                      ? column.render(row[column.dataIndex], row)
                      : row[column.dataIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
        {paginationDataSource.length === 0 && (
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              fontSize: 150,
              pb: 3,
            }}>
            <SvgIcon name="empty" />
            <Typography
              sx={{
                fontSize: 20,
                color: '#666',
              }}>
              {loading ? '加载中...' : '暂无数据'}
            </Typography>
          </Box>
        )}
        <TablePagination
          sx={{
            position: 'sticky',
            bottom: 0,
            background: '#fff',
            boxShadow: '0px -1px 0px #e0e0e0',
          }}
          component="div"
          count={total} // 总条数
          page={page} // 当前页
          rowsPerPage={10} // 每页条数
          onPageChange={
            pagination
              ? pagination.onPageChange
              : (event, page) => {
                  setPage(page);
                }
          }
          labelRowsPerPage="每页条数"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} 共 ${count}`
          }
        />
      </TableContainer>
    </Box>
  );
};
export default Table;
