import {
   TextAreaForm,
   TextInputForm,
   DynamicHeightTextInputForm,
   Label,
} from 'src/components/shared/ui/form-field-elements';
import { SubmitHandler } from 'react-hook-form';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { ColorSelectorForm } from '@/components/shared/ui/form-field-elements/ColorSelector';
import { EditClientDto } from 'freelanceman-common';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { FormDialogProps } from '@/lib/types/form-dialog.types';
import { useEditClient } from '@/lib/api/client-api';

export const ClientDialog = ({ formMethods }: FormDialogProps) => {
   // hooks
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );
   const editClient = useEditClient();

   const { handleSubmit } = formMethods;

   const closeDialog = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   const onSubmit: SubmitHandler<any> = (data) => {
      console.log('data', data);
      const editClientPayload: EditClientDto = {
         id: data.id,
         address: data.address || '',
         name: data.name,
         taxId: data.taxId,
         email: data.email,
         phoneNumber: data.phoneNumber,
         themeColor: data.themeColor,
      };
      editClient.mutate(editClientPayload);
      closeDialog();
   };

   const handleDeleteButtonClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setFormDialogState((prev) => ({ ...prev, isOpen: false }));
      setConfirmationDialogState({
         isOpen: true,
         actions: {
            primary: () => {},
         },
         entityName: formDialogState.data.name,
         additionalMessage:
            'This action will delete all projects under this client. Files, tasks, events and everything under those projects will also be deleted as well. This action cannot be undone.',
         type: 'delete',
         dialogRequested: {
            mode: 'edit',
            type: 'clientSettings',
         },
      });
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-3">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               fieldName="name"
               required={true}
               errorMessage="Please name your client"
               placeholder="Client Name"
            />
            <div className="flex flex-col grow relative">
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
            <div className="flex flex-col gap-3">
               <div className="flex gap-2">
                  <div className="w-1/2">
                     <Label>Tax ID</Label>
                     <TextInputForm
                        formMethods={formMethods}
                        fieldName="taxId"
                     />
                  </div>
                  <div className="w-1/2">
                     <Label>Phone Number</Label>
                     <TextInputForm
                        formMethods={formMethods}
                        fieldName="phoneNumber"
                     />
                  </div>
               </div>
               <div>
                  <Label>Email</Label>
                  <TextInputForm formMethods={formMethods} fieldName="email" />
               </div>
               <div className="">
                  <Label>Address</Label>
                  <TextAreaForm formMethods={formMethods} fieldName="address" />
               </div>
            </div>
         </div>
         <FormDialogFooter
            formMethods={formMethods}
            onDiscard={handleDeleteButtonClick}
            entity="Client"
            customText={{
               destructiveButton: {
                  editModeText: 'Delete Client',
               },
            }}
         />
      </form>
   );
};
