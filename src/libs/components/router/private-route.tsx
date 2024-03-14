import { AppRoute } from '@/libs/enums';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  // const user = useProfileStore((state) => state.user);
  // const isAuthenticated = Boolean(user);
  const isAuthenticated = true;

  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoute.SIGN_IN} state={{ from: location }} replace />
  );
};

export { PrivateRoute };
