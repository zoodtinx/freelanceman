import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import i18next from './i18nMock';
import { I18nextProvider } from 'react-i18next';
import '../src/index.css';
import {
   withRouter,
} from 'storybook-addon-remix-react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const preview: Preview = {
   decorators: [
      (Story) => (
         <ThemeProvider enableSystem attribute="class" defaultTheme="lights">
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
