import { AppRoute } from './enums';
import { Models, NewStudy, SignIn, Studies, Users } from '@/pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout, UserLayout } from '../libs/components';
import { PrivateRoute, PublicRoute } from '../libs/components/router';
import { useAuthStore } from '@/packages/auth';
import { Role } from '@/packages/users';

const UserRoutes = (
  <Route path={AppRoute.HOME}>
    <Route index element={<Studies />} />
    <Route path={AppRoute.NEW_STUDY} element={<NewStudy />} />
  </Route>
);

const AdminRoutes = (
  <>
    <Route path={AppRoute.USERS} element={<Users />} />
    <Route path={AppRoute.MODELS} element={<Models />} />
    <Route path={AppRoute.HOME} element={<Navigate to={AppRoute.USERS} />} />
  </>
);

const Router = () => {
  const currentUser = useAuthStore((state) => state.user);

  return (
    <Routes>
      <Route
        element={
          <PrivateRoute>
            {currentUser?.role === Role.ADMIN ? (
              <AdminLayout />
            ) : (
              <UserLayout />
            )}
          </PrivateRoute>
        }
      >
        {currentUser?.role === Role.ADMIN ? AdminRoutes : UserRoutes}
      </Route>
      <Route
        path={AppRoute.SIGN_IN}
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route path={AppRoute.ANY} element={<Navigate to={AppRoute.HOME} />} />
    </Routes>
  );
};

export { Router };
