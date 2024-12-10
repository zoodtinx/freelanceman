import type { Meta, StoryObj } from '@storybook/react';
import TaskDialogue from './EventDialog.js';
import NewActionDialog from './NewEventDialog.js';
import { useRef } from 'react';
import type { Task } from '@types';
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/shared/ui/dialog"; // Adjust import based on your file structure
import { Button } from "@/components/shared/ui/button";

const meta = {
   component: TaskDialogue,
} satisfies Meta<typeof TaskDialogue>;

export default meta;


const SimpleForm = () => {
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm();
 
   const onSubmit = (data) => {
     console.log("Form Data:", data);
   };
 
   return (
     <Dialog>
       <DialogTrigger asChild>
         <Button variant="outline">Open Form</Button>
       </DialogTrigger>
       <DialogContent>
         <DialogHeader>
           <DialogTitle>Simple Form</DialogTitle>
         </DialogHeader>
         <form onSubmit={handleSubmit(onSubmit)}>
           {/* Name Field */}
           <div>
             <label htmlFor="name">Name</label>
             <input
               id="name"
               {...register("name", { required: "Name is required" })}
             />
             {errors.name && (
               <p style={{ color: "red" }}>{errors.name.message}</p>
             )}
           </div>
 
           {/* Email Field */}
           <div>
             <label htmlFor="email">Email</label>
             <input
               id="email"
               {...register("email", {
                 required: "Email is required",
                 pattern: {
                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                   message: "Invalid email address",
                 },
               })}
             />
             {errors.email && (
               <p style={{ color: "red" }}>{errors.email.message}</p>
             )}
           </div>
 
           {/* Submit Button */}
           <DialogFooter>
             <Button type="submit">Submit</Button>
           </DialogFooter>
         </form>
       </DialogContent>
     </Dialog>
   );
 };


const Template = () => {
   const dialogRef = useRef<HTMLDivElement>(null);
   const handleClick = () => {
      dialogRef.current?.click();
   };

   const data: Task = {
      client: 'Sansiri',
      dueDate: '2022-03-20T05:33:59.616611',
      details: `'Give youself a free time. you should define its type using either an interface or a type alias and provide it as a type parameter to your component's props. Here's an example'`,
      name: 'Revise - The Society press visit interary, Round 2',
      project: 'The Society Launch',
      status: 'planned',
      link: 'https://lucide.dev/icons/pencil',
   };

   const mockDialogState = {
      id: '1234',
      isOpen: true,
   };

   return (
      <main className="bg-background w-screen h-screen dark:bg-background-dark">
         {/* <Button onClick={handleClick}>Hello</Button>
         <NewActionDialog dialogueState={mockDialogState} /> */}
         <SimpleForm />
      </main>
   );
};

export const Default = Template.bind({});
