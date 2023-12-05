import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import { apiConfig } from './src/config/api'

// https://vitejs.dev/config/

// Load environment variables
const { VITE_API, VITE_API_SECOND, VITE_API_PREFIX, VITE_API_SECOND_PREFIX } = process.env;

// Determine the API target based on the environment
const apiTarget = process.env.NODE_ENV === 'production' ? VITE_API : VITE_API_SECOND;
const apiPrefix = process.env.NODE_ENV === 'production' ? VITE_API_PREFIX : VITE_API_SECOND_PREFIX;
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5500,
    proxy: {
      [apiPrefix]: {
        target: apiTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${apiPrefix}`), ''),
      },
    },
  },
})
