import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import '@youyu/shared/fonts/index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
