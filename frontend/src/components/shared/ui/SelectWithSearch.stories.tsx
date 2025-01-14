import type { Meta, StoryObj } from '@storybook/react';
import { SelectWithSearch } from 'src/components/shared/ui/SelectWithApiSearch';

const meta: Meta<typeof SelectWithSearch> = {
   component: SelectWithSearch,
};

export default meta;

const mockSelectProps = {
   selectContents: [
     { value: "option1", text: "Option 1", color: "#FF5733" },
     { value: "option2", text: "Option 2" },
     { value: "option3", text: "Option 3", color: "#4287f5" },
   ],
   onValueChange: (value: string) => {
     console.log("Selected value:", value);
   },
   value: "option1",
   placeholder: "Select an option...",
   isWithIcon: true,
 };

const Template = () => {
   return (
      <main className="bg-foreground w-screen h-screen dark:bg-background-dark flex items-center justify-center">
         <SelectWithSearch {...mockSelectProps}  />
      </main>
   );
};

export const Default = Template.bind({});
