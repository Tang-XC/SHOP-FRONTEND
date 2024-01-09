import React, { FC, useEffect, useState } from 'react';
import { Tabs, Tab, Box, Button, Paper } from '@mui/material';
import { PriceChip, ProductCard } from '@/components';
import { getCategoryList } from '@/api/category';
import { getProductList } from '@/api/product';
import './index.less';
interface CategoryItem {
  id: number;
  name: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface Props {}
const TabPanel: FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index } = props;
  return (
    <Box
      sx={{
        flexGrow: 1,
        pl: 3,
      }}
      role="tabpanel"
      hidden={value !== index}>
      {children}
    </Box>
  );
};
const Shop: FC<Props> = (props) => {
  const [tabItems, setTabItems] = useState<CategoryItem[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [products, setProducts] = useState<any>([]);
  const getProducts = async (): Promise<void> => {
    const result = await getProductList();
    if (result.code === 200) {
      setProducts(result.data.products);
    }
  };
  const getTabItems = async (): Promise<void> => {
    const result = await getCategoryList();
    if (result.code === 200) {
      setTabItems(result.data.filter((item: CategoryItem) => item.id != 0));
    }
  };
  useEffect(() => {
    getTabItems();
    getProducts();
  }, []);
  return (
    <Box
      sx={{
        mt: -3,
      }}>
      <Box
        sx={{
          position: 'sticky',
          bgcolor: 'var(--elementBgColor)',
          top: 0,
          ml: -3,
          mr: -3,
          pr: 3,
          pl: 3,
        }}>
        <Tabs
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
          value={currentTab}
          onChange={(_: React.SyntheticEvent, newValue: number) =>
            setCurrentTab(newValue)
          }>
          {tabItems.map((item) => {
            return <Tab label={item.name} value={item.id} />;
          })}
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={currentTab} index={1}>
          <Box
            component={Paper}
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'var(--elementBgColor)',
              pt: 3,
              ml: -3,
              mt: 3,
              mb: 3,
            }}>
            <Box
              sx={{
                height: 400,
              }}>
              <img src="https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/pdp/phones/mate60-pro/img/kv/sellpoint-5@2x.webp" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 400,
                ml: 10,
              }}>
              <div className="shop-product-tag">最热</div>
              <div className="shop-product-title">HUAWEI Mate 60 Pro</div>
              <div className="shop-product-price">
                <PriceChip
                  price={5499}
                  originPrice={6499}
                  chips={['全网低价', '最新上市']}
                />
              </div>
              <div className="shop-product-buttons">
                <Button variant="contained">加入购物车</Button>
                <Button variant="outlined">立即购买</Button>
              </div>
            </Box>
            <Box></Box>
          </Box>
          <Box
            sx={{
              ml: -3,
            }}>
            <ProductCard
              products={products.map((item: any) => {
                return {
                  key: item.id,
                  name: item.name,
                  price: item.price,
                  cover: item.image,
                  desc: item.desc,
                };
              })}
            />
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};
export default Shop;
