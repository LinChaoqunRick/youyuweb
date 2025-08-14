import * as path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

import { defineConfig, ProxyOptions } from 'vite';

type ProxyList = [string, string][];
type ProxyTargetList = Record<string, ProxyOptions>;

// 预设本地开发代理配置
const persistDevConfig: ProxyOptions = {
  changeOrigin: true,
  secure: false,
};

const createProxy = (list: ProxyList = []): ProxyTargetList => {
  return list.reduce((acc, [prefix, target]) => {
    acc[`^${prefix}`] = {
      target,
      ...persistDevConfig,
      rewrite: path => path.replace(/^\/plat/, ''),
    };
    return acc;
  }, {} as ProxyTargetList);
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3030,
    open: false,
    // proxy: createProxy([['/plat', 'https://v2.youyul.com' || '']]),
    proxy: createProxy([
      ['/plat', 'http://localhost:8080' || ''],
      ['/ws', 'https://apis.map.qq.com'],
    ]),
  },
});
