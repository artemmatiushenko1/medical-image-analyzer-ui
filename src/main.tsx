import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeConfig } from './libs/theme';
import { initi18n } from './i18n';
import { useAppStore } from './app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './libs/packages/react-query';
import { BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';

import '@fontsource/inter';
import 'react-toastify/dist/ReactToastify.css';

// TODO: load dynamically. See initDayJs helper
import 'dayjs/locale/en';
import 'dayjs/locale/uk';

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/production').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

const renderApp = () => {
  const appLanguage = useAppStore.getState().language;

  initi18n(appLanguage);
  dayjs.locale(appLanguage);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeConfig>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeConfig>
        </LocalizationProvider>
        <ReactQueryDevtoolsProduction initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer position="bottom-right" theme="colored" />
    </React.StrictMode>,
  );
};

renderApp();
