import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import _401_ from '@/pages/Error/401';
export default (
  Component: React.ComponentType,
  path?: string,
  role?: number
) => {
  const { state } = useAuth();
  const { token, roles } = state;
  console.log(roles);
  if (token && roles.some((it) => it.id === role)) {
    return <Component />;
  } else {
    if (!path) {
      return <_401_ />;
    }
    return <Navigate to={path as string} />;
  }
};
