import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FormProvider } from './store/User';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <FormProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FormProvider>
  </BrowserRouter>
);

