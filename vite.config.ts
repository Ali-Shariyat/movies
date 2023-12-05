import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const defaultConfig = {
  plugins: [vue(),
    basicSsl()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}
export default defineConfig(({ command, mode }) => {
  // if (command === 'serve') {
    const isDev = mode === 'development'

    return {
      ...defaultConfig,
      server: {
        port:8880,
        proxy: {
          '/api/v1/': {
            target: isDev ? 'https://moviesapi.ir': 'https://moviesapi.ir',
            changeOrigin: true,
            secure: false,
            ws:false,
          },
          '/omdbapi/': {
            target: isDev ? 'https://www.omdbapi.com': 'https://www.omdbapi.com',
            changeOrigin: true,
            secure: false,
            ws:false,
            rewrite: (path) => path.replace(/^\/omdbapi/, '')
          },
        },
      },
    }
  // } else {
  //   return defaultConfig
  // }
});