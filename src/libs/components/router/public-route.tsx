import { AppRoute } from '@/libs/enums';
import { useAuthStore } from '@/packages/auth';
import { Navigate, useLocation } from 'react-router-dom';

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute = (props: PublicRouteProps) => {
  const { children } = props;

  const user = useAuthStore((state) => state.user);

  const isAuthenticated = Boolean(user);

  const location = useLocation();
  const from = location.state?.from?.pathname || AppRoute.HOME;

  return isAuthenticated ? <Navigate to={from} replace /> : children;
};

export { PublicRoute };
