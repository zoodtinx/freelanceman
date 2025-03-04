import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import type { Client, EditClientDto } from '@types';
import { DialogFooter } from '../../primitives/Dialog';
import {
   TextAreaForm,
   TextInputForm,
   DynamicHeightTextInputForm,
} from 'src/components/shared/ui/form-field-elements';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { useClientApi } from '@/lib/api/client-api';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';

export const ClientDialog = ({
   formMethods,
}: {
   formMethods: UseFormReturn;
}) => {
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );
   const { editClient } = useClientApi()

   const { handleSubmit } = formMethods;
   const clientName = formDialogState.data.name

   const onSubmit: SubmitHandler<EditClientDto> = (data) => {
      const editClientPayload: EditClientDto = {
         address: data.address,
         name: data.name,
         taxId: data.taxId,
         email: data.email,
         phoneNumber: data.phoneNumber,
         detail: data.detail,
         themeColor: data.themeColor,
      };
      const validatedPayload = Object.fromEntries(
         Object.entries(editClientPayload).filter(
            ([_, value]) => value !== undefined
         )
      ) as EditClientDto;
      editClient.mutate({
         clientId: formDialogState.data.id,
         clientPayload: validatedPayload,
      });
   };

   const handleDeleteButtonClick = () => {
      setFormDialogState((prev) => ({ ...prev, isOpen: false }));
      setConfirmationDialogState({
         isOpen: true,
         actions: {
            primary: () => {}
         },
         message: clientName,
         type: 'delete',
         dialogRequested: {
            mode: 'edit',
            type: 'client-settings'
         }
      })
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
            <div className="flex flex-col gap-3">
               <div className="flex gap-2">
                  <div className="w-1/2">
                     <p className="text-secondary ">Tax ID</p>
                     <TextInputForm
                        formMethods={formMethods}
                        fieldName="taxId"
                     />
                  </div>
                  <div className="w-1/2">
                     <p className="text-secondary ">Phone Number</p>
                     <TextInputForm
                        formMethods={formMethods}
                        fieldName="phoneNumber"
                     />
                  </div>
               </div>
               <div>
                  <p className="text-secondary">Email</p>
                  <TextInputForm formMethods={formMethods} fieldName="email" />
               </div>
               <div className="">
                  <p className="text-secondary ">Address</p>
                  <TextAreaForm formMethods={formMethods} fieldName="address" />
               </div>
            </div>
         </div>
         <DialogFooter>
            <div className="flex justify-between p-4">
               <DiscardButton
                  formMethods={formMethods}
                  formDialogState={formDialogState}
                  action={handleDeleteButtonClick}
                  deleteText="Delete Client"
               />
               <SubmitButton
                  formDialogState={formDialogState}
                  formMethods={formMethods}
               />
            </div>
         </DialogFooter>
      </form>
   );
};
