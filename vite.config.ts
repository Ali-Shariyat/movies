import { defineConfig, loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const defaultConfig = {
    plugins: [vue(), basicSsl()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
}


export default defineConfig(({ command, mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    return {
        ...defaultConfig,
        server: {
            port: 80,
            strictPort: true,
            hmr: {
                clientPort: 80,
            },
            proxy: {
                '/api/v1/': {
                    target: process.env.VITE_API_MOVIES,
                    changeOrigin: true,
                    secure: false,
                    ws: false,
                },
                '/omdbapi/': {
                    target: process.env.VITE_API_OMDBAPI,
                    changeOrigin: true,
                    secure: false,
                    ws: false,
                    rewrite: (path) => path.replace(/^\/omdbapi/, ''),
                },
            },
        },
    }
})