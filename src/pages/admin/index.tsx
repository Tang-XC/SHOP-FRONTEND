import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import withAuth from '@/hocs/withAuth';

const Admin: FC = (): JSX.Element => {
  return <Outlet />;
};

export default () => withAuth(Admin, undefined, 1);
