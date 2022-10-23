/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
    restoreMocks: true,
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['src/test', 'src/theme'],
    },
  },
});
