import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true }) // opens an HTML report after build
  ],
  optimizeDeps: {
    include: ['@tanstack/react-query'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'src': path.resolve(__dirname, './src'),
      '@mocks': path.resolve(__dirname, './src/lib/api/mock/mock-data/index.ts'), // fixed extra quote
    },
  },
  build: {
    outDir: 'dist', // output folder
    sourcemap: true, // optional, generate source maps
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: undefined // default for now
      },
    },
  },
});
