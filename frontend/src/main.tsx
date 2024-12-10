import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import './index.css';
import { router } from './lib/router.tsx';
import './lib/i18next.ts';
import {
   QueryClient,
   QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
         forcedTheme="light"
      >
         <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false}/>
         </QueryClientProvider>
      </ThemeProvider>
   </StrictMode>
);
