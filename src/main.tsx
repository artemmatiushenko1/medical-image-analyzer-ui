import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './libs/components/app';
import '@fontsource/inter';
import './libs/i18n';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="bottom-right" theme="colored" />
  </React.StrictMode>,
);
