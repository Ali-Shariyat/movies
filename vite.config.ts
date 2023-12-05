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
      // ... other server configurations
      proxy: {
        '/api/v1': {
          target: prod ? process.env.VITE_API : '',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api^\/v1/, ''),
        },
      },
    },
  };
});