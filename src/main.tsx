import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getUserTheme } from './utils/theme';
import './styles/normalize.css';
import './styles/index.css';

document.documentElement.dataset.theme = localStorage.getItem(getUserTheme()) || 'light';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
