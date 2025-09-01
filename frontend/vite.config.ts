import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

const buildTimestamp = JSON.stringify(new Date().toISOString());

export default defineConfig({
  define: {
    buildTimestamp
  },
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true })
  ],
  optimizeDeps: {
    include: ['@tanstack/react-query'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'src': path.resolve(__dirname, './src'),
      '@mocks': path.resolve(__dirname, './src/lib/api/mock/mock-data/index.ts'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-${new Date().getTime()}.js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
        manualChunks: undefined
      },
    },
  },
});
