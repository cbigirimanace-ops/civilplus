import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CurrencyProvider } from './context/CurrencyContext.jsx';
import { I18nProvider } from './i18n/I18nContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>
);
