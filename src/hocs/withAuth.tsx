import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
export default (Component: React.ComponentType) => {
  const location = useLocation();
  const { state } = useAuth();
  const { token } = state;
  if (token) {
    if (location.pathname === '/auth') {
      return <Navigate to="/" />;
    }
    return <Component />;
  } else {
    if (location.pathname === '/auth') {
      return <Component />;
    }
    return <Navigate to="/auth" />;
  }
};
