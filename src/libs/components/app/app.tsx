import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import ThemeConfig from '@/libs/theme';

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ThemeConfig>
      <RouterProvider router={router} />
    </ThemeConfig>
  );
};

export { App };
