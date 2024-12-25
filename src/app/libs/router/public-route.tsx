import { AppRoute } from '@/app';
import { useGetProfile } from '../queries';
import { Navigate, useLocation } from 'react-router-dom';

import { NavigationState } from './types';

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute = (props: PublicRouteProps) => {
  const { children } = props;

  const { data: user } = useGetProfile();

  const isAuthenticated = Boolean(user);

  const location = useLocation();
  const locationState = location.state as NavigationState;

  const from = locationState.from?.pathname || AppRoute.HOME;

  return isAuthenticated ? <Navigate to={from} replace /> : children;
};

export { PublicRoute };
