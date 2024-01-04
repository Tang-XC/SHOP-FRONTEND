import { FC, useEffect, useImperativeHandle, useState } from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

interface ActionRef {
  reload: () => void;
}
interface columnsItem {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: any) => JSX.Element;
}
interface dataSourceItem {
  [key: string]: any;
}
interface TableProps {
  searchMode: 'simple' | 'advance' | false;
  columns: columnsItem[];
  elevation?: number;
  request: () => Promise<{ data: dataSourceItem[] }>;
  onCreate: Function;
  actionRef?: React.MutableRefObject<ActionRef>;
}

const Table: FC<TableProps> = (props: TableProps) => {
  const {
    elevation,
    columns = [],
    request,
    searchMode = false,
    onCreate,
    actionRef,
  } = props;
  const [dataSource, setDataSource] = useState<dataSourceItem[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const getData = async () => {
    setLoading(true);
    const result = await request();
    setDataSource(result.data);
    setLoading(false);
  };
  const reload = () => {
    getData();
  };
  useEffect(() => {
    getData();
  }, []);
  useImperativeHandle(actionRef, () => ({
    reload,
  }));
  return (
    <>
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
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              position: 'relative',
            }}>
            {loading && (
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255,255,255,0.8)',
                  zIndex: 1,
                  display: 'grid',
                  placeItems: 'center',
                }}>
                <CircularProgress />
              </Box>
            )}
            {dataSource.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(row[column.dataIndex], row)
                      : row[column.dataIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
        <TablePagination
          component="div"
          count={3} // 总条数
          page={0} // 当前页
          onPageChange={() => {}}
          rowsPerPage={10} // 每页显示多少条
        />
      </TableContainer>
    </>
  );
};
export default Table;
