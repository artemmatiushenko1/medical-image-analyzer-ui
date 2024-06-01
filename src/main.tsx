import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import '@fontsource/inter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeConfig } from './libs/theme';
import { initi18n } from './i18n';
import { useAppStore } from './app';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './libs/packages/react-query';
import { BrowserRouter } from 'react-router-dom';

const renderApp = () => {
  initi18n(useAppStore.getState().language);

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
      </QueryClientProvider>
      <ToastContainer position="bottom-right" theme="colored" />
    </React.StrictMode>,
  );
};

renderApp();
