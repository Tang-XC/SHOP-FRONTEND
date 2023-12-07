import { FC, useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from './components/header';
import BaseAlert from './components/baseAlert';
import { useMessage } from '@/contexts/messageContext';
import './index.less';
interface Props {}
const LayoutPage: FC<Props> = (props: Props) => {
  const { state } = useMessage();
  return (
    <div className="layout">
      <div className="layout-header">
        <Header />
      </div>
      <div>
        <BaseAlert {...state} />
      </div>
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutPage;
