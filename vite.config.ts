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
        '/api/v1': {
          target: 'https://moviesapi.ir',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => {
            console.log('pathpathpathpathpathpathpath', path)
            return path.replace(/^\/api\/v1/, '/api/v1')
          },
        },
      },
    },
  };
});