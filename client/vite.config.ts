import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

const env = loadEnv("", process.cwd(), "VITE_");

export default defineConfig({
    define: {
        'process.env': env,
    },
	resolve: {
		dedupe: ['react', 'react-dom'],
	},
    server: {
        proxy: {
            '/api': {
                target: env.VITE_SERVER_URL!,
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    plugins: [react(), tsconfigPaths()],
    base: './',
    build: {
        lib: {
            entry: resolve(__dirname, "src/main.tsx"),
            formats: ["es"],
        },
        rollupOptions: {
            input: 'index.html',
        },
    },
    test: {
		globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
    },
})
