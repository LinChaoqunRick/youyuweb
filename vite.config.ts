import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', //ip地址
    port: 3000, //端口号
    open: false, //启动后是否自动打开浏览器,
    proxy: {
      '/plat': {
        target: "http://localhost:8080",
        // target: "http://124.222.79.236:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/plat/, '')
      },
      /*'/api': {
        target: "https://116.62.114.102:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }*/
    }
  },
})
