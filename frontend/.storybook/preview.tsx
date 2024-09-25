import { themes } from '@storybook/theming';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from '../src/lib/router';
import store from '../src/lib/redux/store';
import i18next from './i18nMock';
import { I18nextProvider } from 'react-i18next';
import '../src/index.css';
import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router';


const preview: Preview = {
   decorators: [
      (Story) => (
         <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
            <ReduxStoreProvider store={store}>
               <I18nextProvider i18n={i18next}>
                     <Story />
               </I18nextProvider>
            </ReduxStoreProvider>
         </ThemeProvider>
      ),
      withRouter
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
