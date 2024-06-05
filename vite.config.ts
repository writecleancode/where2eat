/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const baseUrl = process.env.NODE_ENV === 'development' ? './' : '/where2eat/';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: baseUrl,
	resolve: {
		alias: {
			src: '/src',
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
	},
});
