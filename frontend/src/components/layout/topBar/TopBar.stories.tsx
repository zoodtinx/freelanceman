import type { Meta, StoryObj } from '@storybook/react';

import TopBar from './TopBar';

const meta = {
   component: TopBar,
} satisfies Meta<typeof TopBar>;

export default meta;

const Template = (args) => (
   <div className="bg-background  w-screen h-screen dark:bg-background-dark">
      <TopBar />
   </div>
);

export const Default = Template.bind({});
