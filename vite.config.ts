import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const prod = mode === 'production';

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://moviesapi.ir/api',
          changeOrigin: true,
          secure:false,
          ws:true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});