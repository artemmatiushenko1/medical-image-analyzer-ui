import { AppRoute } from '@/app';
import { Navigate, useLocation } from 'react-router-dom';
import { Role } from '@/packages/users';
import { ValueOf } from '@/libs/types';
import { useGetProfile } from '../queries';

type PrivateRouteProps = {
  children: React.ReactNode;
  roles?: ValueOf<typeof Role>[];
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const { children, roles } = props;

  const { data: user } = useGetProfile();

  const isAllowedRole = user && roles?.includes(user.role);

  const isAuthenticated = Boolean(user);

  const location = useLocation();

  if (roles?.length && !isAllowedRole) {
    return <Navigate to={AppRoute.HOME} state={{ from: location }} replace />;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={AppRoute.SIGN_IN} state={{ from: location }} replace />
  );
};

export { PrivateRoute };
