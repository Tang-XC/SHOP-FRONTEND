import { FC, useEffect, useRef, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Paper,
  Stack,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  DialogTitle,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Popover,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller } from 'react-hook-form';
import { Table, SvgIcon, Upload } from '@/components';
import PhoneSpec from './spec/phone';
import PcSpec from './spec/pc';
import { getCategoryList } from '@/api/category';
import {
  getProductList,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/api/product';
import { uploadImages } from '@/api/file';
import { useAuth } from '@/contexts/authContext';
import { useMessage } from '@/contexts/messageContext';

interface CategoryItem {
  id: number;
  name: string;
}

const ShopList: FC = () => {
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [popConfirm, setPopConfirm] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const columns = [
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => {
        return (
          <Box
            sx={{
              width: 60,
              height: 60,
            }}>
            <img
              src={text}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        );
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '105px',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => {
        return (
          <span>
            {categoryList.find((item) => item.id === parseInt(text))?.name}
          </span>
        );
      },
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    },

    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => {
        return (
          <span
            style={{
              fontSize: '24px',
              color: 'orange',
              display: 'flex',
              alignItems: 'center',
            }}>
            {text}
            <SvgIcon name="rmb" color="orange" />
          </span>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (text: string, record: any) => {
        return (
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}>
            <IconButton
              type="button"
              sx={{ p: 0 }}
              onClick={() => onDetail(record)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton
              type="button"
              sx={{ p: 0 }}
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setPopConfirm(true);
                setCurrentId(parseInt(record.id));
              }}>
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  const fieldProps = {
    margin: 'normal',
    fullWidth: true,
    // variant: 'standard',
  };
  const defaultFormValues = {
    name: '',
    category: undefined,
    brand: '',
    price: 0,
    stock: 0,
    desc: '',
    files: [],
  };
  const form = useRef<any>();
  const actionRef = useRef<any>();
  const { state } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues,
  });
  console.log(errors);
  const { dispatch: dispatchMessage } = useMessage();
  const watchCategory = watch('category');

  const getCategory = async () => {
    const result = await getCategoryList();
    if (result.code === 200) {
      setCategoryList(result.data);
    }
  };
  const getProducts = async (params: any) => {
    const result = await getProductList(params);
    if (result.code === 200) {
      setTotal(result.data.total);
      return {
        data: result.data.products,
      };
    }
    return {
      data: [],
    };
  };
  const onCreate = (): void => {
    reset(defaultFormValues);
    setActionType(0);
    setOpen(true);
  };
  const onDetail = (val: any): void => {
    setCurrentId(val.id);
    setActionType(1);
    setOpen(true);
    reset({
      ...val,
    });
  };
  const onSubmit = async (val: any): Promise<void> => {
    const formData = new FormData();
    val.files.forEach((item: any) => {
      formData.append('files', item.originFileObj);
    });
    if (actionType === 0) {
      const filesResponse = await uploadImages(formData);
      if (filesResponse.code === 200) {
        const result = await createProduct({
          ...val,
          price: parseInt(val.price),
          stock: parseInt(val.stock),
          image: filesResponse.data[0].url || '',
          files: filesResponse.data.map((item: any) => item.id),
        });
        if (result.code === 200) {
          dispatchMessage({
            type: 'SET_MESSAGE',
            payload: {
              type: 'success',
              content: result.data,
              delay: 5000,
            },
          });
          setOpen(false);
          actionRef.current.reload();
        }
      }
    } else if (actionType === 1) {
      const filesResponse = await uploadImages(formData);
      if (filesResponse.code === 200) {
        let image = filesResponse.data
          ? filesResponse.data[0].url
          : val.files[0]
          ? val.files[0].url
          : '';
        let files = filesResponse.data ? filesResponse.data : [];
        let oldFiles = val.files instanceof Array ? val.files : [];
        const result = await updateProduct(currentId, {
          ...val,
          price: parseInt(val.price),
          stock: parseInt(val.stock),
          image: image,
          files: [...files, ...oldFiles]
            .map((item: any) => item.id)
            .filter((item: any) => item),
        });
        if (result.code === 200) {
          dispatchMessage({
            type: 'SET_MESSAGE',
            payload: {
              type: 'success',
              content: result.data,
              delay: 5000,
            },
          });
          setOpen(false);
          actionRef.current.reload();
        }
      }
    }
  };
  const onDelete = async (id: number): Promise<void> => {
    const result = await deleteProduct(id);
    if (result.code === 200) {
      dispatchMessage({
        type: 'SET_MESSAGE',
        payload: {
          type: 'success',
          content: result.data,
          delay: 5000,
        },
      });
      actionRef.current.reload();
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}>
        <Box
          component={Paper}
          elevation={3}
          sx={{
            width: 150,
            maxHeight: 'calc(100vh - 118px)',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <h3>商品分类</h3>
          <List
            sx={{
              width: '100%',
            }}>
            {categoryList.map((item) => (
              <Box key={item.id}>
                <Divider />
                <ListItem key={item.id}>
                  <ListItemButton
                    sx={{
                      textAlign: 'center',
                    }}
                    selected={selected === item.id}
                    onClick={() => {
                      setSelected(item.id);
                    }}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            ml: 3,
            flexGrow: 1,
          }}>
          <Table
            maxHeight="calc(100vh - 118px)"
            actionRef={actionRef}
            elevation={3}
            searchMode="simple"
            columns={columns}
            request={getProducts}
            params={{
              page: page,
              size: size,
              category: selected,
              owner: state.id,
            }}
            pagination={{
              total: total,
              page: page,
              size: size,
              onPageChange: (event, page) => {
                setPage(page);
              },
            }}
            onCreate={onCreate}
          />
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} scroll="paper">
        <DialogTitle>{actionType === 0 ? '新增' : '编辑'}商品</DialogTitle>
        <DialogContent
          sx={{
            width: '500px',
          }}>
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <Typography>商品图片(第一张为封面)</Typography>
            <Grid item xs={12}>
              <Controller
                name="files"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Upload
                    label=""
                    listType="picture-card"
                    multiple={true}
                    error={!!errors.files}
                    helperText={errors.files ? '商品图片不能为空' : ''}
                    {...(fieldProps as any)}
                    {...field}>
                    <AddIcon />
                  </Upload>
                )}
              />
            </Grid>
            <Divider
              sx={{
                my: 2,
              }}
            />

            <Typography>基本信息</Typography>
            <Grid container columnSpacing={1}>
              <Grid item xs={6}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id={field.name}
                      label="商品名称"
                      error={!!errors.name}
                      helperText={errors.name ? '商品名称不能为空' : ''}
                      {...(fieldProps as any)}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id={field.name}
                      label="分类"
                      select
                      error={!!errors.category}
                      helperText={errors.category ? '分类不能为空' : ''}
                      {...(fieldProps as any)}
                      {...field}>
                      {categoryList
                        .filter((item) => item.id !== 0)
                        .map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="brand"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id={field.name}
                      margin="normal"
                      fullWidth
                      label="品牌"
                      error={!!errors.brand}
                      helperText={errors.brand ? '品牌不能为空' : ''}
                      {...(fieldProps as any)}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id={field.name}
                      label="价格"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon name="rmb" color="inherit" />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.price}
                      helperText={errors.price ? '价格不能为空' : ''}
                      {...(fieldProps as any)}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="stock"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id={field.name}
                      label="库存"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">件</InputAdornment>
                        ),
                      }}
                      error={!!errors.stock}
                      helperText={errors.stock ? '库存不能为空' : ''}
                      {...(fieldProps as any)}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="desc"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id={field.name}
                      label="描述"
                      multiline
                      rows={4}
                      error={!!errors.desc}
                      helperText={errors.desc ? '描述不能为空' : ''}
                      {...(fieldProps as any)}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Divider
              sx={{
                my: 2,
              }}
            />
            {watchCategory && <Typography>规格</Typography>}
            {watchCategory === 1 && (
              <PhoneSpec control={control} fieldProps={fieldProps} />
            )}
            {watchCategory === 2 && (
              <PcSpec control={control} fieldProps={fieldProps} />
            )}
            {watchCategory === 3 && (
              <PhoneSpec control={control} fieldProps={fieldProps} />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}>
            取消
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              form.current.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
              );
            }}>
            确定
          </Button>
        </DialogActions>
      </Dialog>

      <Popover
        open={popConfirm}
        anchorEl={anchorEl}
        onClose={() => setPopConfirm(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>
        <Typography sx={{ p: 2 }} display="flex" alignItems="center">
          <InfoIcon sx={{ pr: 1 }} color="warning" />
          确定要删除吗?
        </Typography>
        <DialogActions>
          <Button
            size="small"
            onClick={() => {
              setPopConfirm(false);
            }}>
            取消
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => {
              onDelete(currentId);
              setPopConfirm(false);
            }}>
            确定
          </Button>
        </DialogActions>
      </Popover>
    </>
  );
};
export default ShopList;
