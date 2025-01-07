import type { Meta, StoryObj } from '@storybook/react';
import { StandardSelect, FilterSelect } from './PrebuiltSelect';
import { useRef, useState } from 'react';
import type { Task } from '@types';
import { Filter } from 'lucide-react';

const meta: Meta<typeof StandardSelect> = {
   component: StandardSelect,
};

export default meta;

const Template = () => {
   const dialogRef = useRef<HTMLDivElement>(null);
   const [value, setValue] = useState('')

   const handleClick = () => {
      dialogRef.current?.click();
   };

   const data: Task = {
      client: 'Sansiri',
      dueDate: '2022-03-20T05:33:59.616611',
      details: 'Give yourself free time. You should define its type using either an interface or a type alias and provide it as a type parameter to your component\'s props.',
      name: 'Revise - The Society press visit itinerary, Round 2',
      project: 'The Society Launch',
      status: 'planned',
      link: 'https://lucide.dev/icons/pencil',
   };

   const selectContents = [
      { value: 'thailand', label: 'Thailand' },
      { value: 'laos', label: 'Laos' },
   ];

   const onValueChange = (value: string) => {
      setValue(value)
   };

   return (
      <main className="bg-background w-screen h-screen dark:bg-background-dark flex items-center justify-center">
         <div ref={dialogRef}>
            <FilterSelect
               selectContents={selectContents}
               onValueChange={onValueChange}
               value={value}           
            />
         </div>
      </main>
   );
};

export const Default = Template.bind({});
