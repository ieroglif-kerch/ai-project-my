import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ai-project-my/',
  root: '.',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
  },
});
