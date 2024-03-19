import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './libs/components/app';
import '@fontsource/inter';
import './libs/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
