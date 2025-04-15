import React, { useState } from 'react';
import {
   TextAreaForm,
   TextInputForm,
   DynamicHeightTextInputForm,
} from 'src/components/shared/ui/form-field-elements';
import {
   FormDialogProps,
} from 'src/lib/types/form-dialog.types';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/shared/ui/primitives/Popover';
import { getColorName } from '@/components/shared/ui/helpers/Helpers';
import { useClientApi } from '@/lib/api/client-api';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { FormDialogFooter } from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { ApiLoadingState } from '@/lib/types/form-element.type';

export const NewClientDialog = ({
   formMethods,
   handleEscapeWithChange,
}: FormDialogProps) => {
   const { createClient } = useClientApi();
   const { formDialogState } = useFormDialogStore();

   const { handleSubmit } = formMethods;

   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'discard',
   });

   const onSubmit = (data: any) => {
      const createClientPayload: CreateClientDto = {
         name: data.name,
         taxId: data.taxId,
         email: data.email,
         phoneNumber: data.phoneNumber,
         address: data.address,
         detail: data.detail,
      };
      console.log('createClientPayload', createClientPayload);
      createClient.mutate(createClientPayload)
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-2">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               fieldName='name'
               className="pt-1"
               placeholder="Enter client's name"
               required={true}
               errorMessage="Please enter client name"
            />
            <div className="flex leading-tight gap-2">
               <div className="flex flex-col grow">
                  <Label>Email</Label>
                  <TextInputForm
                     fieldName="email"
                     className="bg-transparent"
                     formMethods={formMethods}
                  />
               </div>
               <div className="flex flex-col w-2/5">
                  <Label>Phone Number</Label>
                  <TextInputForm
                     fieldName="phoneNumber"
                     className="bg-transparent"
                     formMethods={formMethods}
                  />
               </div>
            </div>
            <div className="flex flex-col grow">
               <Label>Tax ID</Label>
               <TextInputForm
                  fieldName="taxId"
                  className="bg-transparent"
                  formMethods={formMethods}
               />
            </div>
            <div className="flex flex-col grow">
               <Label>Address</Label>
               <TextAreaForm
                  fieldName="address"
                  className="bg-transparent "
                  formMethods={formMethods}
                  placeholder="Don't worry, you can add it later."
               />
            </div>
            <div className="flex flex-col grow relative">
               <Label>Theme Color</Label>
               <div className="relative">
                  <SelectColorPopover />
               </div>
            </div>
         </div>
         <FormDialogFooter
            formDialogState={formDialogState}
            formMethods={formMethods}
            isApiLoading={isApiLoading}
            destructiveButtonAction={handleEscapeWithChange}
            setIsApiLoading={setIsApiLoading}
         />
      </form>
   );
};

const SelectColorPopover = () => {
   const [themeColor, setThemeColor] = useState('');
   const [isOpen, setIsOpen] = useState(false);

   const handleSelectColor = (selectedColor) => {
      setThemeColor(selectedColor);
      setIsOpen(false);
   };

   const ThemeColorLabel = () => {
      const colorName = getColorName(themeColor);
      return (
         <p
            className={`p-1 px-2 w-full rounded-full border border-transparent text-center select-none cursor-default bg-theme-${themeColor}`}
         >
            {colorName}
         </p>
      );
   };

   const ThemeColorInput = () => {
      const colorName = getColorName(themeColor);
      return (
         <p
            className={`p-1 px-2 w-full text-secondary border rounded-full text-center select-none cursor-default}`}
         >
            Select a color
         </p>
      );
   };

   return (
      <Popover open={isOpen}>
         <PopoverTrigger asChild>
            <button
               onClick={() => setIsOpen(!isOpen)}
               className="focus:outline-none w-full"
            >
               {themeColor ? <ThemeColorLabel /> : <ThemeColorInput />}
            </button>
         </PopoverTrigger>
         <PopoverContent className="bg-foreground border-tertiary grid grid-cols-7 gap-2 rounded-xl p-2 cursor-default select-none">
            <ThemeColorGroup
               setColor={(selectedColor) => handleSelectColor(selectedColor)}
            />
         </PopoverContent>
      </Popover>
   );
};

const ThemeColorGroup = ({ setColor }) => {
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

   return <>{colorSelections}</>;
};