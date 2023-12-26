import { FC, useEffect, useState } from 'react';
import { Button, Image, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Table } from '@/components';
import classNames from 'classnames';
import { getCategoryList } from '@/api/category';
import './index.less';
interface CategoryItem {
  name: string;
  id: number;
}
interface ProductItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image: string;
}
const ProductList: FC = () => {
  const productList: ProductItem[] = [
    {
      id: 1,
      name: '小米14',
      brand: '小米',
      price: 4299,
      stock: 100,
      category: '手机',
      description: '小米14',
      image:
        'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1698307639.33126162.png',
    },
  ];
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [isProductShow, setIsProductShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<number>(0);
  const columns: any[] = [
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      render: (text: any, record: any) => {
        return (
          <div className="product-image">
            <Image src={text} className="w-100 h-100" />
          </div>
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
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => {
        return (
          <div className="product-action">
            <a
              className="p-1"
              onClick={() => {
                setIsProductShow(true);
                setActionType(2);
              }}>
              详情
            </a>
            <a
              className="p-1"
              onClick={() => {
                setIsProductShow(true);
                setActionType(1);
              }}>
              修改
            </a>
            <a
              className="p-1"
              onClick={() => {
                console.log(record);
              }}>
              删除
            </a>
          </div>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const handleSelected = (id: number): void => {
    setCurrentCategory(id);
  };
  const getData = () => {
    return {
      data: productList,
    };
  };
  const getCategoryListData = async (): Promise<void> => {
    const result = await getCategoryList();
    if (result.code === 200) {
      setCategoryList([
        {
          name: '全部',
          id: 0,
        },
        ...result.data,
      ]);
    }
  };
  useEffect(() => {
    getCategoryListData();
  }, []);
  return (
    <>
      <div className="product-wrap d-flex justify-content-center border">
        <div className="product-category border-box border p-3">
          <div>
            <Button variant="outline-primary" className="w-100">
              添加分类
            </Button>
          </div>
          <div className="pt-3">
            {categoryList.map((item) => {
              return (
                <div
                  key={item.id}
                  className={classNames({
                    'category-item': true,
                    'border-bottom': true,
                    'border-box': true,
                    'p-3': true,
                    'd-flex': true,
                    'justify-content-center': true,
                    'category-item-active': currentCategory === item.id,
                  })}
                  onClick={() => handleSelected(item.id)}>
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="product-list p-3 flex-grow-1">
          <div className="product-list-title d-flex justify-content-between align-items-center">
            <div>商品列表</div>
            <div>
              <Button
                variant="outline-primary"
                onClick={() => {
                  navigate('/merchant/products/add');
                }}>
                添加商品
              </Button>
            </div>
          </div>
          <div className="pt-3">
            <Table columns={columns} request={getData} />
          </div>
        </div>
      </div>
      <Modal show={isProductShow} onHide={() => setIsProductShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {
              {
                0: '添加商品',
                1: '修改商品',
                2: '查看商品',
              }[actionType]
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>商品名称</Form.Label>
              <Form.Control type="text" placeholder="请输入商品名称" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>商品描述</Form.Label>
              <Form.Control type="text" placeholder="请输入商品描述" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>商品价格</Form.Label>
              <Form.Control type="text" placeholder="请输入商品价格" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>商品库存</Form.Label>
              <Form.Control type="text" placeholder="请输入商品库存" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>商品分类</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>请选择商品分类</option>
                {categoryList.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>商品品牌</Form.Label>
              <Form.Control type="text" placeholder="请输入商品品牌" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>商品图片</Form.Label>
              <Form.Control type="text" placeholder="请输入商品图片" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>商品详情</Form.Label>
              <Form.Control type="text" placeholder="请输入商品详情" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsProductShow(false)}>
            取消
          </Button>
          <Button variant="primary">提交</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ProductList;
