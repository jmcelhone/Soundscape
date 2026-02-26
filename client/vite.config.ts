import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	resolve: {
		dedupe: ['react', 'react-dom'],
	},
    server: {
        proxy: {
            '/api': {
                target: 'https://localhost:8000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    plugins: [react()],
    test: {
		globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
    },
})
