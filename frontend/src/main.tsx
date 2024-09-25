import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import store from './lib/redux/store.ts';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import './index.css';
import { router } from './lib/router.tsx';
import './lib/i18next.ts';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
      >
         <ReduxStoreProvider store={store}>
            <RouterProvider router={router} />
         </ReduxStoreProvider>
      </ThemeProvider>
   </StrictMode>
);
