import { ConfigProvider, theme } from 'antd';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthContext';
import RouterProvider from '@/providers/RouterProvider';

import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <div id="app">
        <AuthProvider>
          <BrowserRouter>
            <RouterProvider />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </ConfigProvider>
  );
}

export default App;
