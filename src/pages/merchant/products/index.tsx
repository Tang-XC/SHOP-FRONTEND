import { FC } from 'react';
import { Outlet } from 'react-router-dom';
const Product: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default Product;
