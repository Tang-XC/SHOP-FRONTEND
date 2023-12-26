import { FC } from 'react';

import { SvgIcon } from '@/components';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const _401_: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const handleBack = (): void => {
    navigate(-1);
  };
  return (
    <div className="d-flex w-50 h-100 m-auto">
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <SvgIcon name="noAuth" size="400" />
      </div>
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <div
          style={{
            fontSize: '30px',
          }}>
          您没有权限
        </div>
        <div
          style={{
            marginTop: '20px',
          }}>
          <Button variant="outline-primary" onClick={handleBack}>
            返回
          </Button>
          <Button
            style={{
              marginLeft: '12px',
            }}
            variant="primary">
            登录
          </Button>
        </div>
      </div>
    </div>
  );
};
export default _401_;
