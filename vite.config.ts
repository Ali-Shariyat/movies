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
        '/api/v1/': {
          target: 'https://moviesapi.ir/api/v1',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace('/api/v1', ''),
        },
      },
    },
  };
});