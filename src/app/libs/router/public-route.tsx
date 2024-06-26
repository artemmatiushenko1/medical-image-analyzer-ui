import { AppRoute, useAuthStore } from '@/app';
import { Navigate, useLocation } from 'react-router-dom';

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute = (props: PublicRouteProps) => {
  const { children } = props;

  const user = useAuthStore((state) => state.user);

  const isAuthenticated = Boolean(user);

  const location = useLocation();
  const from = (location.state?.from?.pathname as string) || AppRoute.HOME;

  return isAuthenticated ? <Navigate to={from} replace /> : children;
};

export { PublicRoute };
