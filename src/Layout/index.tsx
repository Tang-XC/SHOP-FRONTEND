import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import './index.less';
interface Props {}
const LayoutPage: FC<Props> = (props: Props) => {
  return (
    <div className="layout">
      <div className="layout-header">
        <Header />
      </div>
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutPage;
