import { FC, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Products from './products';
interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}
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
const Shop: FC = () => {
  const [value, setValue] = useState('shop');
  const items = [
    {
      label: '商品管理',
      key: 'shop',
    },
    {
      label: '订单管理',
      key: 'order',
    },
    {
      label: '店铺管理',
      key: 'store',
    },
    {
      label: '营销管理',
      key: 'marketing',
    },
    {
      label: '统计管理',
      key: 'statistics',
    },
    {
      label: '设置',
      key: 'setting',
    },
  ];
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 112px)',
        overflow: 'hidden',
      }}>
      <Box
        sx={{
          minWidth: '120px',
          height: '100%',
        }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            height: '100%',
          }}>
          {items.map((item) => (
            <Tab
              key={item.key}
              label={item.label}
              value={item.key}
              sx={{
                p: 3,
                fontSize: 'inherit',
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          height: '100%',
        }}>
        <TabPanel value={value} index="shop">
          <Products />
        </TabPanel>
        <TabPanel value={value} index="order">
          Item Two
        </TabPanel>
      </Box>
    </Box>
  );
};
export default Shop;
