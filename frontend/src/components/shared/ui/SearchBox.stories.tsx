import type { Meta, StoryObj } from '@storybook/react';
import { SearchBox } from '@/components/shared/ui/SearchBox';

const meta: Meta<typeof SearchBox> = {
   component: SearchBox,
};

export default meta;

const Template = () => {
   return (
      <main className="bg-background w-screen h-screen dark:bg-background-dark flex items-center justify-center">
            <SearchBox       
            />
      </main>
   );
};

export const Default = Template.bind({});
