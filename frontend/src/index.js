import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FormProvider } from './store/Middleware';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FormProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FormProvider>
);

