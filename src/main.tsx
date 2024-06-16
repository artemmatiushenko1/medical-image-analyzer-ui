import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, useAuthStore } from './app';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeConfig } from './libs/theme';
import { initi18n } from './i18n';
import { useAppStore } from './app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './libs/packages/react-query';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/inter';

import { httpClient } from './libs/packages/http';
import { initDayJs } from './i18n/helpers';
import { config } from './libs/packages/config';
import { NotificationsProvider } from './libs/components';

const enableMockApi = async () => {
  if (!config.ENABLE_MOCK_API) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start();
};

const initLocalization = async () => {
  const appLanguage = useAppStore.getState().language;

  return Promise.all([initi18n(appLanguage), initDayJs(appLanguage)]);
};

const initHttpClient = () => {
  httpClient.setAuthTokenGetter(() => useAuthStore.getState().accessToken);
  httpClient.setBaseUrl(config.BASE_API_URL);
};

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeConfig>
            <NotificationsProvider />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeConfig>
        </LocalizationProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
};

void enableMockApi()
  .then(initLocalization)
  .then(initHttpClient)
  .then(renderApp);
