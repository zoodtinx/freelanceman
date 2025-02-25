import { TextInputForm, TextAreaForm } from 'src/components/shared/ui/form-field-elements';
import { SalesDocument, User } from '@types';
import { UseFormReturn } from 'react-hook-form';
import { useUserQuery } from '@/lib/api/user-api';
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';

const FreelancerInfoField = ({ formMethods }:{ formMethods : UseFormReturn<SalesDocument>} ) => {
   const [userData, setUserData] = useState<User | undefined>()

   const {setValue} = formMethods

   useEffect(() => {
      if (userData) {
         console.log('userData.taxId', userData.taxId)
         setValue('freelancerName', userData.name)
         setValue('freelancerEmail', userData.email)
         setValue('freelancerPhone', userData.phone)
         setValue('freelancerTaxId', userData.taxId)
         setValue('freelancerAddress', userData.address)
      }
   }, [userData, setValue])
   
   return (
      <fieldset className="flex flex-col grow rounded-xl border border-tertiary p-3 relative gap-3">
         <div className="flex flex-col gap-2 peer order-2 h-full">
            <div className="flex gap-2">
               <TextInputForm
                  fieldName="freelancerName"
                  label="Name"
                  formMethods={formMethods}
                  className="flex-1"
               />
               <TextInputForm
                  fieldName="freelancerTaxId"
                  label="Tax ID"
                  formMethods={formMethods}
                  className="flex-1"
               />
            </div>
            <div className="flex gap-2">
               <TextInputForm
                  fieldName="freelancerPhone"
                  label="Phone Number"
                  formMethods={formMethods}
                  className="flex-1"
               />
               <TextInputForm
                  fieldName="freelancerEmail"
                  label="Email"
                  formMethods={formMethods}
                  className="flex-1"
               />
            </div>
            <TextInputForm
                  fieldName="freelancerAddress"
                  label="Address"
                  formMethods={formMethods}
                  className="flex-1"
               />
            <TextAreaForm
               fieldName="freelancerDetail"
               label="Additional Detail"
               formMethods={formMethods}
            />
         </div>
         <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
            <h2>Freelancer Info</h2>
            <AddUserDataButton setUserData={setUserData} />
         </div>
      </fieldset>
   );
};

const AddUserDataButton = ({ setUserData }) => {
   const [shouldFetch, setShouldFetch] = useState(false)
   
   const { data: userData, isLoading } = useUserQuery(shouldFetch);

   const handleClick = () => {
      setShouldFetch(true);
      if (userData) {
         setUserData(() => {
            return { ...userData };
         });
      }
   };

   return (
      <div onClick={handleClick} className="flex h-6 text-sm px-2 rounded-lg font-medium text-primary border border-primary items-center gap-1">
         Use your profile
         {isLoading && <LoaderCircle className='w-3 h-3 animate-spin' />}
      </div>
   );
};

export default FreelancerInfoField