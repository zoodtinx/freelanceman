import type { Meta, StoryObj } from '@storybook/react';
import Home from './HomePage';
import {
   reactRouterParameters,
   reactRouterOutlet,
} from 'storybook-addon-remix-react-router';
import Actions from './ActionPage';

const meta = {
   component: Home,
   parameters: {
      reactRouter: reactRouterParameters({
         routing: reactRouterOutlet(<Actions />),
      }),
   },
} satisfies Meta<typeof Home>;

export default meta;

const Template = (args) => <Home />;

export const Default = Template.bind({});
