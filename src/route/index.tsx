import { FC, useEffect } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';

import routes from './routes';

const Route: FC = () => {
  const { state: authState, getUserInfo } = useAuth();
  const routing = useRoutes(routes);
  useEffect(() => {
    if (authState.token) {
      getUserInfo();
    }
  }, []);
  return routing;
};
const Router: FC = () => {
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
};
export default Router;
