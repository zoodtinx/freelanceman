import type { Meta, StoryObj } from '@storybook/react';
import SideBarTab from './SideBarTab';

const meta = {
  component: SideBarTab,
} satisfies Meta<typeof SideBarTab>;

export default meta;


const Template = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className='bg-background'>
    <div style={{ width: '300px' }} >
      <SideBarTab {...args} />
    </div>
  </div>
);

export const ProjectMode = Template.bind({});
ProjectMode.args = {
  tab: ['projects', 'files', 'documents', 'clients', 'actions'],
  isActive: [true, false]
};
