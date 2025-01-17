import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {  HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { AuthProvider } from './context/AuthProvider.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <HashRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          

          <App />
        </LocalizationProvider>
        </ HashRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

