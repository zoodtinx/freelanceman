import {
   TextAreaForm,
   TextInputForm
} from 'src/components/shared/ui/form-field-elements';
import {
   FormDialogProps
} from 'src/lib/types/form-dialog.types';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { CreateClientDto, EditClientDto } from 'freelanceman-common';
import { ColorSelectorForm } from '@/components/shared/ui/form-field-elements/ColorSelector';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { CrudApi } from '@/lib/api/api.type';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useNavigate } from 'react-router-dom';
import HeadlineTextInputForm from '@/components/shared/ui/form-field-elements/HeadlineTextInput';
import { useCreateClient, useDeleteClient, useEditClient } from '@/lib/api/client-api';
import { toast } from 'sonner';

export const NewClientDialog = ({
   crudApi,
   formMethods,
   handleLeftButtonClick,
}: FormDialogProps) => {
   //utility hooks
   const navigate = useNavigate();
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const closeDialog = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   const createClient = useCreateClient();
   const editClient = useEditClient();
   const deleteClient = useDeleteClient();

   // form utilities
   const { handleSubmit } = formMethods;

   // submit handler
   const onSubmit = async (data: any) => {
      if (formDialogState.mode === 'create') {
         const createClientPayload: CreateClientDto = {
            name: data.name,
            themeColor: data.themeColor,
            taxId: data.taxId,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            detail: data.detail,
         };
         closeDialog()
         toast.loading('Creating a client.')
         const client = await createClient.mutateAsync(createClientPayload);
         navigate(`/home/clients/${client.id}`);
      } else if (formDialogState.mode === 'edit') {
         const editClientPayload: EditClientDto = {
            id: data.id,
            name: data.name,
            themeColor: data.themeColor,
            taxId: data.taxId,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            detail: data.detail,
         };
         closeDialog()
         toast.loading('Updating a client.')
         await editClient.mutateAsync(editClientPayload)
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
            <div className="leading-tight">
               <HeadlineTextInputForm
                  formMethods={formMethods}
                  fieldName="name"
                  className="pt-1"
                  placeholder="Enter client's name"
                  required={true}
                  errorMessage="Please enter client name"
               />
            </div>
            <div className="flex flex-col grow relative gap-1">
               <Label>Theme Color</Label>
               <div className="relative">
                  <ColorSelectorForm
                     fieldName="themeColor"
                     formMethods={formMethods}
                     required={true}
                     errorMessage="Please select a color"
                  />
               </div>
            </div>
            <Separator className="mt-2 mb-1" />
            <div className="flex flex-col gap-2 bg-foreground p-2 rounded-xl">
               {/* <p className="text-md text-secondary">
                  Client Details
               </p> */}
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
                  />
               </div>
            </div>
         </div>
         <FormDialogFooter
            formMethods={formMethods}
            onDiscard={handleLeftButtonClick}
         />
      </form>
   );
};
