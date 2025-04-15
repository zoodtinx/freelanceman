import type { Meta, StoryObj } from '@storybook/react';
import { CleanTextInput } from './CleanTextInput';
import { useRef } from 'react';

const meta = {
   component: CleanTextInput,
} satisfies Meta<typeof CleanTextInput>;

export default meta;

const Template = () => {
   const dialogRef = useRef<HTMLDivElement>(null);
   const handleClick = () => {
      dialogRef.current?.click()
   }

   const data: Task = {
      client: 'Sansiri',
      dueDate: '2022-03-20T05:33:59.616611',
      details: `'Give youself a free time. you should define its type using either an interface or a type alias and provide it as a type parameter to your component's props. Here's an example'`,
      name: 'Revise - The Society press visit interary, Round 2',
      project: 'The Society Launch',
      status: 'planned',
      link: 'https://lucide.dev/icons/pencil'
   }

   const mockDialogState = {
      id: '1234',
      isOpen: true
   }

   return (
      <main className="bg-background w-screen h-screen dark:bg-background-dark">
         <CleanTextInput />
      </main>
   );
};

export const Default = Template.bind({});
