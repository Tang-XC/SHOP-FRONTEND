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
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller } from 'react-hook-form';
import { Table, SvgIcon, Upload } from '@/components';
import { getCategoryList } from '@/api/category';
import { getProductList, createProduct } from '@/api/product';
import { uploadImages } from '@/api/file';
interface CategoryItem {
  id: number;
  name: string;
}

const ShopList: FC = () => {
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [selected, setSelected] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<number>(0);
  const form = useRef<any>();
  const actionRef = useRef<any>();
  const { control, handleSubmit, reset } = useForm();

  const columns = [
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => {
        return (
          <Box
            sx={{
              width: 100,
              height: 100,
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
      render: (text: string) => {
        return (
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}>
            <IconButton type="button" sx={{ p: '10px' }}>
              <InfoIcon color="primary" />
            </IconButton>
            <IconButton type="button" sx={{ p: '10px' }}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton type="button" sx={{ p: '10px' }}>
              <DeleteIcon color="primary" />
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
  const getCategory = async () => {
    const result = await getCategoryList();
    if (result.code === 200) {
      setCategoryList(result.data);
    }
  };
  const getProducts = async () => {
    const result = await getProductList();
    if (result.code === 200) {
      return {
        data: result.data,
      };
    }
    return {
      data: [],
    };
  };
  const onCreate = () => {
    reset();
    setActionType(0);
    setOpen(true);
  };
  const onSubmit = async (val: any) => {
    const formData = new FormData();
    val.image.fileList.forEach((item: any) => {
      formData.append('files', item.originFileObj);
    });
    const filesResponse = await uploadImages(formData);
    if (filesResponse.code === 200) {
      const result = await createProduct({
        ...val,
        price: parseInt(val.price),
        stock: parseInt(val.stock),
        image: filesResponse.data[0].url || '',
      });
      if (result.code === 200) {
        setOpen(false);
        actionRef.current.reload();
      }
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
          height: '100%',
        }}>
        <Box
          component={Paper}
          elevation={3}
          sx={{
            width: 150,
            height: 'fit-content',
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
            actionRef={actionRef}
            elevation={3}
            searchMode="simple"
            columns={columns}
            request={getProducts}
            onCreate={() => setOpen(true)}
          />
        </Box>
      </Box>
      <Dialog open={open} onClose={onCreate} scroll="paper">
        <DialogTitle>{actionType === 0 ? '新增' : '编辑'}商品</DialogTitle>

        <DialogContent
          sx={{
            width: '500px',
          }}>
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
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
                      {...(fieldProps as any)}
                      {...field}
                      value={field.value || ''}
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
                      {...(fieldProps as any)}
                      {...field}
                      value={field.value || ''}>
                      {categoryList.map((item) => (
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
                      {...(fieldProps as any)}
                      {...field}
                      value={field.value || ''}
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
                      {...(fieldProps as any)}
                      {...field}
                      value={field.value || 0}
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
                      {...(fieldProps as any)}
                      {...field}
                      value={field.value || 0}
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
                      {...(fieldProps as any)}
                      {...field}
                      value={field.value || ''}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Upload
                      label="商品图片"
                      listType="picture-card"
                      multiple={true}
                      fileList={[
                        {
                          uid: '-1',
                          name: 'image.png',
                          url: 'https://secure-res.craft.do/v2/SndzjVW5t6K3GdRuGbWpq8uUUgKVVoPiQGuHk45wCSHssLToodZ9Uy7gzz1tsUxoWYaRGaZHsuBx6cXdN3ZX1dhi3rbZ7BEtnY5KE4AmbNrCbBWzgox3ACgNYeKntvsk7SWPTd32xATkywbaPH5JyeRz4pn4h4bpaSA2xGecXSrTmmZ/Starfield_Journey_Through_Space_16x9_Center.jpg',
                        },
                      ]}
                      {...field}>
                      <AddIcon />
                    </Upload>
                  )}
                />
              </Grid>
            </Grid>
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
            type="submit"
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
    </>
  );
};
export default ShopList;
