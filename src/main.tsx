import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './libs/components/app';
import '@fontsource/inter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ThemeConfig } from './libs/theme';
import { initi18n } from './libs/i18n';
import { useAppStore } from './stores/app.store';

const renderApp = () => {
  initi18n(useAppStore.getState().language);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeConfig>
          <App />
        </ThemeConfig>
      </LocalizationProvider>
      <ToastContainer position="bottom-right" theme="colored" />
    </React.StrictMode>,
  );
};

renderApp();
