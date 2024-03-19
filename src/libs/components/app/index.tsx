import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { ThemeConfig } from '@/libs/theme';
import { NewImageDialog } from '../new-image-dialog';

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ThemeConfig>
      <RouterProvider router={router} />
      <NewImageDialog />
    </ThemeConfig>
  );
};

export { App };
