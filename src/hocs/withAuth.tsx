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
    return <Navigate to="/auth" />;
    return <h1>Hello</h1>;
  }
};
