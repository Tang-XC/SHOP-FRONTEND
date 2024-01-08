import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import _401_ from '@/pages/Error/401';
export default (
  Component: React.ComponentType,
  path?: string,
  role?: number[]
) => {
  const { state } = useAuth();
  const { token, roles } = state;
  const location = useLocation();
  const isAuthing = location.pathname === '/auth';
  if (
    (token && roles.some((it) => role?.some((item) => item === it.id))) ||
    isAuthing
  ) {
    if (roles.some((it) => it.id === 1) && isAuthing) {
      return <Navigate to="/admin" />;
    } else if (roles.some((it) => it.id === 3) && isAuthing) {
      return <Navigate to="/merchant" />;
    } else {
      return <Component />;
    }
  } else {
    if (!path) {
      return <_401_ />;
    }
    return <Navigate to={path as string} />;
  }
};
