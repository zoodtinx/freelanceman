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
         '@types': path.resolve(__dirname, '../shared/types'),
         '@mocks': path.resolve(__dirname, '../shared/mocks'),
      },
   }
});
