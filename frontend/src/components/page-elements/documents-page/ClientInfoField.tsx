import {
   TextInputForm,
   TextAreaForm,
   Label,
} from 'src/components/shared/ui/form-field-elements';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/helper/utils';
import { SalesDocumentFindOneResponse } from 'freelanceman-common';

const ClientInfoField = ({
   formMethods,
}: {
   formMethods: UseFormReturn<SalesDocumentFindOneResponse>;
}) => {
   const {
      formState: { errors },
   } = formMethods;

   const error = errors.clientName;

   return (
      <fieldset
         className={cn(
            'flex flex-1 flex-col grow rounded-xl border border-tertiary p-3 relative gap-3',
            error && 'border-general-red'
         )}
      >
         <div className="flex flex-col h-full">
            <div className="flex flex-col gap-2 peer order-2 h-full">
               <div className="flex gap-2">
                  <div className="flex-1">
                     <Label className="pb-0">Name</Label>
                     <TextInputForm
                        fieldName="clientName"
                        formMethods={formMethods}
                        className="flex-1"
                        errorMessage="Please add a client name"
                        required
                     />
                  </div>
                  <div className="flex-1">
                     <Label className="pb-0">Tax ID</Label>
                     <TextInputForm
                        fieldName="clientTaxId"
                        formMethods={formMethods}
                        className="flex-1"
                     />
                  </div>
               </div>
               <div className="flex gap-2">
                  <div className="flex-1">
                     <Label className="pb-0">Phone Number</Label>
                     <TextInputForm
                        fieldName="clientPhone"
                        formMethods={formMethods}
                        className="flex-1"
                     />
                  </div>
                  <div className="flex-1">
                     <Label className="pb-0">Office</Label>
                     <TextInputForm
                        fieldName="clientOffice"
                        formMethods={formMethods}
                        className="flex-1"
                     />
                  </div>
               </div>
               <div className="flex flex-col grow">
                  <Label className="pb-0">Address</Label>
                  <TextAreaForm
                     fieldName="clientAddress"
                     formMethods={formMethods}
                     className="flex-1 resize-none"
                  />
               </div>
            </div>
            <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
               <h2>Client Info</h2>
            </div>
         </div>
      </fieldset>
   );
};

export default ClientInfoField;
