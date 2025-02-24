import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextareaForm from '@/components/shared/ui/form-field-elements/TextareaForm';
import TaskNameInput from 'src/components/shared/ui/form-field-elements/TaskNameInput';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { CircleCheck, ClipboardX, Pencil, Trash2 } from 'lucide-react';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import useDialogStore from '@/lib/zustand/dialog-store';
import { ClientSearchOption, CreateProjectDto } from '@types';
import { debounce } from 'lodash';
import { TextInputForm } from '@/components/shared/ui/form-field-elements/TextInputForm';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/shared/ui/primitives/Popover';
import { getColorName } from '@/components/shared/ui/helpers/Helpers';

const NewClientDialog = () => {
   const { formDialogState, setFormDialogState, setSelectorDialogState } = useDialogStore();
   const newProjectData = formDialogState.data as CreateProjectDto
   const [searchTerm, setSearchTerm] = useState<ClientSearchOption>({})

   const formMethods = useForm<CreateProjectDto>({
      defaultValues: newProjectData,
   });

   const { handleSubmit, reset } = formMethods;

   const handleDialogClose = () => {
      console.log('close');
   };

   const onSubmit: SubmitHandler<CreateProjectDto> = (data) => {
      console.log('submitted')
   };

   const handleEditMode = () => {
      console.log('edit');
   };

   const handleCancelEdit = () => {
      console.log('cancel');
   };

   const searchClient = debounce((value: string) => {
      console.log('value', value);
      setSearchTerm({ name: value });
   }, 300);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-2">
            <TaskNameInput
               formMethods={formMethods}
               dialogState={formDialogState}
               className="pt-1"
            />
            <div className="flex leading-tight gap-2">
               <div className="flex flex-col grow">
                  <p className="text-secondary pb-1 text-sm">Email</p>
                  <TextInputForm
                     fieldName="email"
                     className="bg-transparent"
                     formMethods={formMethods}
                  />
               </div>
               <div className="flex flex-col w-2/5">
                  <p className="text-secondary pb-1 text-sm">Phone Number</p>
                  <TextInputForm
                     fieldName="phoneNumber"
                     className="bg-transparent"
                     formMethods={formMethods}
                  />
               </div>
            </div>
            <div className="flex flex-col grow">
               <p className="text-secondary pb-1 text-sm">Tax ID</p>
               <TextInputForm
                  fieldName="email"
                  className="bg-transparent"
                  formMethods={formMethods}
               />
            </div>
            <div className="flex flex-col grow">
               <p className="text-secondary pb-1 text-sm">Address</p>
               <TextareaForm
                  fieldName="email"
                  className="bg-transparent "
                  formMethods={formMethods}
                  dialogState={formDialogState}
                  placeholder="Don't worry, you can add it later."
               />
            </div>
            <div className="flex flex-col grow relative">
               <p className="text-secondary pb-1 text-sm">Theme Color</p>
               <div className='relative'>
                  <SelectColorPopover />
               </div>
            </div>
         </div>
         <DialogFooter>
            <div className="flex justify-between p-4">
               <Button>Left</Button>
               <Button>Right</Button>
            </div>
         </DialogFooter>
      </form>
   );
};

const SelectColorPopover = () => {
   const [themeColor, setThemeColor] = useState('')
   const [isOpen, setIsOpen] =  useState(false)

   console.log('themeColor', themeColor)
   

   const handleSelectColor = (selectedColor) => {
      setThemeColor(selectedColor)
      setIsOpen(false)
   }

   const ThemeColorLabel = () => {
      const colorName = getColorName(themeColor)
      return (
         <p className={`p-1 px-2 w-full rounded-full border border-transparent text-center select-none cursor-default bg-theme-${themeColor}`}>
            {colorName}
         </p>
      )
   }

   const ThemeColorInput = () => {
      const colorName = getColorName(themeColor)
      return (
         <p className={`p-1 px-2 w-full text-secondary border rounded-full text-center select-none cursor-default}`}>
            Select a color
         </p>
      )
   }

   return (
      <Popover open={isOpen} >
         <PopoverTrigger asChild>
         <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none w-full">
               {themeColor ? <ThemeColorLabel /> : <ThemeColorInput />}
            </button>
         </PopoverTrigger>
         <PopoverContent className="bg-foreground border-tertiary grid grid-cols-7 gap-2 rounded-xl p-2 cursor-default select-none">
            <ThemeColorGroup setColor={((selectedColor) => handleSelectColor(selectedColor))} />
         </PopoverContent>
      </Popover>
   );
}

const ThemeColorGroup = ({setColor}) => {
   const colors = [
      'red',
      'orange',
      'peach',
      'yellow',
      'beige',
      'coral',
      'maroon',
      'bronze',
      'olive',
      'green',
      'mint',
      'turquoise',
      'teal',
      'blue',
      'purple',
      'lavender',
      'lilac',
      'magenta',
      'pink',
      'taupe',
      'zinc',
    ];
   
   const colorSelections = colors.map((color) => {
      return (
         <div
            key={color}
            onClick={() => setColor(color)}
            className={`w-6 h-6 rounded-full bg-theme-${color}
            border border-transparent hover:border-primary transition-colors duration-75`}
         />
      );
   });

   return (
      <>
      {colorSelections}
      </>   
   )
}

const LeftButton: React.FC<{
   dialogState: FormDialogState;
   handleCancelEdit: () => void;
   handleDialogClose: () => void;
}> = ({ dialogState, handleCancelEdit, handleDialogClose }) => {
   switch (dialogState.mode) {
      case 'view':
         return (
            <Button variant={'destructive'} className="flex gap-1">
               Delete
               <Trash2 className="w-4 h-4" />
            </Button>
         );
      case 'edit':
         return (
            <Button
               variant={'destructiveOutline'}
               onClick={handleCancelEdit}
               className="flex gap-1"
            >
               Discard
               <ClipboardX className="w-4 h-4" />
            </Button>
         );
      case 'create':
         return (
            <Button
               variant={'destructiveOutline'}
               onClick={handleDialogClose}
               className="flex gap-1"
            >
               Discard
               <ClipboardX className="w-4 h-4" />
            </Button>
         );
      default:
         return null;
   }
};

const RightButton: React.FC<{
   dialogState: FormDialogState;
   handleEditMode: () => void;
}> = ({ dialogState, handleEditMode }) => {
   switch (dialogState.mode) {
      case 'view':
         return (
            <Button
               type="submit"
               variant={'default'}
               onClick={() => handleEditMode()}
               className="flex gap-1"
            >
               Edit
               <Pencil className="w-4 h-4" />
            </Button>
         );
      case 'edit':
         return (
            <Button type="submit" variant={'submit'} className="flex gap-1">
               Save
               <CircleCheck className="w-4 h-4" />
            </Button>
         );
      case 'create':
         return (
            <Button type="submit" variant={'submit'} className="flex gap-1">
               Create new contact
               <CircleCheck className="w-4 h-4" />
            </Button>
         );
      default:
         return null;
   }
};

export default NewClientDialog;
