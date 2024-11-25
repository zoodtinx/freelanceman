import type { Meta, StoryObj } from '@storybook/react';

import SideBar from './SideBar';
import SideBarTab from '../SideBarTab';

const meta = {
   component: SideBar,
} satisfies Meta<typeof SideBar>;

export default meta;

const Template = (args) => (
   <main className=" bg-background  w-screen h-screen dark:bg-background-dark">
      <SideBar />
   </main>
);

export const Default = Template.bind({});
