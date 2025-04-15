import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   optimizeDeps: {
      include: ['@tanstack/react-query'],
   },
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
         'src': path.resolve(__dirname, './src'), // Optional: Enable absolute imports like src/...
         '@mocks': path.resolve(__dirname, './src/lib/api/mock/mock-data/index.ts"'), // Optional: Enable absolute imports like src/...
      },
   }
});
