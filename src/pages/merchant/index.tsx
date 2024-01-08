import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import withAuth from '@/hocs/withAuth';

const Merchant: FC = (): JSX.Element => {
  return <Outlet />;
};

export default () => withAuth(Merchant, undefined, [2]);
