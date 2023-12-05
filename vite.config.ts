import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import { apiConfig } from './src/config/api'

// https://vitejs.dev/config/
export const isProduction = () => process.env.NODE_ENV === 'production'
export const isDevelopment = () => process.env.NODE_ENV === 'development'
// Load environment variables
const PROFINANCE_API = 'https://moviesapi.ir'
const ACADEMYLAND_API = 'https://acm.academyland.net/api/web/'

export const PROXY_CONFIG = isProduction()
    ? {
      '/api/v1': {
        target: SELECTED_API,
        changeOrigin: true,
        rewrite: { '^/api/v1': '' },
        secure: false,
        ws: true
      }
    }
    : {}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5500,
    proxy: PROXY_CONFIG,
  },
})
