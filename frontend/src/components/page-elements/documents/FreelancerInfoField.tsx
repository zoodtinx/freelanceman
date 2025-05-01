import {
   TextInputForm,
   TextAreaForm,
   Label,
} from 'src/components/shared/ui/form-field-elements';
import {
   SalesDocumentPayload,
   UserPayload,
} from 'freelanceman-common/src/schemas';
import { UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';

const FreelancerInfoField = ({
   formMethods,
}: {
   formMethods: UseFormReturn<SalesDocumentPayload>;
}) => {
   const [userData, setUserData] = useState<UserPayload | undefined>();

   const { setValue } = formMethods;

   useEffect(() => {
      if (userData) {
         setValue('freelancerName', userData.name);
         setValue('freelancerEmail', userData.email);
         setValue('freelancerPhone', userData.phoneNumber  ?? '');
         setValue('freelancerTaxId', userData.taxId  ?? '');
         setValue('freelancerAddress', userData.address ?? '');
      }
   }, [userData, setValue]);

   return (
      <fieldset className="flex flex-1 flex-col grow rounded-xl border border-tertiary p-3 relative ">
         <div className="flex flex-col gap-2 peer order-2 h-full">
            <div className="flex gap-2">
               <div className="flex-1">
                  <Label className="pb-0">Name</Label>
                  <TextInputForm
                     fieldName="freelancerName"
                     formMethods={formMethods}
                     className="flex-1"
                     errorMessage='Please add a freelancer name'
                     required
                  />
               </div>
               <div className="flex-1">
                  <Label className="pb-0">Tax ID</Label>
                  <TextInputForm
                     fieldName="freelancerTaxId"
                     formMethods={formMethods}
                     className="flex-1"
                  />
               </div>
            </div>
            <div className="flex gap-2">
               <div className="flex-1">
                  <Label className="pb-0">Phone Number</Label>
                  <TextInputForm
                     fieldName="freelancerPhone"
                     formMethods={formMethods}
                     className="flex-1"
                  />
               </div>
               <div className="flex-1">
                  <Label className="pb-0">Email</Label>
                  <TextInputForm
                     fieldName="freelancerEmail"
                     formMethods={formMethods}
                     className="flex-1"
                  />
               </div>
            </div>
            <div className="flex flex-col grow">
               <Label className="pb-0">Address</Label>
               <TextAreaForm
                  fieldName="freelancerAddress"
                  formMethods={formMethods}
                  className="resize-none grow"
               />
            </div>
         </div>
         <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
            <h2>Freelancer Info</h2>
         </div>
      </fieldset>
   );
};

export default FreelancerInfoField;
