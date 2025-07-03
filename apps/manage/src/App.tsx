import { ConfigProvider, theme } from 'antd';
import Logo from './components/menu/Logo.tsx';
import Menu from './components/menu/index.tsx';

import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <div id="app">
        <div className="app-menu">
          <Logo />
          <Menu />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
