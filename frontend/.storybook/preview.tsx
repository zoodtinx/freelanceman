import { themes } from '@storybook/theming';
import type { Preview } from '@storybook/react';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from '../src/lib/router';
import { ThemeProvider } from 'next-themes';
import store from '../src/lib/redux/store';
import i18next from './i18nMock';
import { I18nextProvider } from 'react-i18next';
import '../src/index.css';
import {
   reactRouterParameters,
   withRouter,
} from 'storybook-addon-remix-react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const preview: Preview = {
   decorators: [
      (Story) => (
         <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
            <I18nextProvider i18n={i18next}>
               <QueryClientProvider client={queryClient}>
                  <Story />
               </QueryClientProvider>
            </I18nextProvider>
         </ThemeProvider>
      ),
      withRouter,
   ],
   parameters: {
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
         },
      },
   },
};

export default preview;
