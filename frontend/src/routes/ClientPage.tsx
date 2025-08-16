import ClientContactSection from '@/components/page-elements/client-page/ClientContactSection';
import ClientProjectSection from '@/components/page-elements/client-page/ClientProjectSection';
import ClientFileSection from '@/components/page-elements/client-page/ClientFileSection';
import { useParams } from 'react-router-dom';
import { useClientQuery, useEditClient } from '@/lib/api/client-api';
import { ClientSectionProps } from 'src/components/page-elements/client-page/props.type';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import { Book, Edit, StickyNote } from 'lucide-react';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { Label } from '@/components/shared/ui/form-field-elements';
import { NoDataPlaceHolder } from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { cn } from '@/lib/helper/utils';

export default function ClientPage() {
   const { clientId } = useParams();

   const { data: clientData, isLoading } = useClientQuery(clientId || '');

   return (
      <section
         className={cn(
            'w-full h-full flex gap-2',
            'sm:flex-col sm:overflow-y-auto sm:h-fit'
         )}
      >
         {isLoading || !clientData ? (
            <div className="flex flex-col grow gap-2 h-full">
               <Skeleton className="h-1/2 rounded-2xl" />
               <Skeleton className="h-1/2 rounded-2xl" />
            </div>
         ) : (
            <div className="flex flex-col grow gap-2 h-full sm:h-auto">
               <ClientProjectSection
                  clientData={clientData}
                  isLoading={isLoading}
               />
               <ClientFileSection
                  clientData={clientData}
                  isLoading={isLoading}
               />
            </div>
         )}
         <div className="flex flex-col w-[350px] gap-2 h-full sm:w-full sm:h-auto">
            {isLoading || !clientData ? (
               <Skeleton className="rounded-2xl w-fill h-1/2 sm:h-auto" />
            ) : (
               <ClientContactSection
                  clientData={clientData}
                  isLoading={isLoading}
               />
            )}
            {isLoading || !clientData ? (
               <div className="flex flex-col grow gap-2 h-1/2">
                  <Skeleton className="h-1/2 rounded-2xl" />
                  <Skeleton className="h-1/2 rounded-2xl" />
               </div>
            ) : (
               <div className="flex flex-col gap-2 h-1/2 sm:h-auto">
                  <ClientInfoSection
                     clientData={clientData}
                     isLoading={isLoading}
                  />
                  <ClientNoteSection
                     clientData={clientData}
                     isLoading={isLoading}
                  />
               </div>
            )}
         </div>
      </section>
   );
}

const ClientNoteSection: React.FC<ClientSectionProps> = ({ clientData }) => {
   const [note, setNote] = useState(clientData.note);

   const editProject = useEditClient();

   const debouncedUpdateNote = useMemo(
      () =>
         debounce((newNote: string) => {
            editProject.mutate({
               id: clientData.id,
               note: newNote,
            });
            console.log('Note updated:', newNote);
         }, 1000),
      [editProject, clientData.id]
   );

   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newNote = e.target.value;
      setNote(newNote);
      debouncedUpdateNote(newNote);
   };

   return (
      <div
         className={cn(
            'flex flex-col flex-1 h-1/2 bg-foreground rounded-[20px] shrink-0 shadow-md',
            'sm:h-[300px] sm:flex-auto sm:border sm:border-secondary sm:dark:border-tertiary'
         )}
      >
         <div className="flex items-center justify-between h-9 gap-1 px-4">
            <div className="flex items-center gap-1">
               <StickyNote className="w-4 h-4" />
               <p className="text-md">Notes</p>
            </div>
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <textarea
            className="flex text-primary font-normal border-0 grow px-4 py-3 resize-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent placeholder:text-secondary"
            placeholder="Add note for quick reminder or more."
            value={note as any}
            onChange={handleChange}
         />
      </div>
   );
};

const ClientInfoSection: React.FC<ClientSectionProps> = ({ clientData }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const handleClientSettings = () => {
      console.log('clicked');
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'clientPage',
         data: clientData,
         type: 'clientSettings',
         entity: 'client',
      });
   };

   const hasNoInfo =
      !clientData.address &&
      !clientData.phoneNumber &&
      !clientData.taxId &&
      !clientData.email;

   return (
      <div className="flex flex-col h-fit bg-foreground rounded-[20px] shrink-0 shadow-md sm:border sm:border-secondary sm:dark:border-tertiary">
         <div className="flex items-center justify-between h-9 gap-1 px-4">
            <div className="flex items-center gap-1">
               <Book className="w-4 h-4" />
               <p className="text-md">Information</p>
            </div>
            <Edit
               className="w-4 h-4 text-secondary hover:text-primary cursor-pointer transition-colors"
               onClick={handleClientSettings}
            />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         {hasNoInfo ? (
            <NoDataPlaceHolder className="h-32" addFn={handleClientSettings}>
               Add client info
            </NoDataPlaceHolder>
         ) : (
            <div className="flex flex-col pt-3 pb-5 px-5 gap-2">
               <div className="flex">
                  {clientData.phoneNumber && (
                     <div className="w-1/2 leading-tight">
                        <Label>Phone Number</Label>
                        <p>{clientData.phoneNumber}</p>
                     </div>
                  )}
                  {clientData.taxId && (
                     <div className="w-1/2 leading-tight">
                        <Label>Tax ID</Label>
                        <p>{clientData.taxId}</p>
                     </div>
                  )}
               </div>
               {clientData.email && (
                  <div className="leading-tight">
                     <Label>Email</Label>
                     <p>{clientData.email}</p>
                  </div>
               )}
               {clientData.address && (
                  <div className="leading-tight">
                     <Label>Address</Label>
                     <p>{clientData.address}</p>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};
