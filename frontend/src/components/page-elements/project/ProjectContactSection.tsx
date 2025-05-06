import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Plus } from '@/components/shared/icons';
import { useEffect, useState } from 'react';
import { User, BookUser } from 'lucide-react';
import { useClientContactsQuery } from 'src/lib/api/client-contact-api';
import useDialogStore from '@/lib/zustand/dialog-store';
import { defaultContact } from 'src/components/shared/ui/helpers/constants/default-values';
import AddButton from '@/components/shared/ui/AddButton';
import { ClientContactFilterDto, ProjectPayload } from 'freelanceman-common';
import useSelectionDialogStore from '@/lib/zustand/selection-dialog-store';

export const ProjectContactSection = ({
   project,
}: {
   project: ProjectPayload;
}): JSX.Element => {
   const setFormDialogState = useDialogStore(
      (state) => state.setFormDialogState
   );

   console.log('project', project.clientContacts)

   const setSelectorDialogState = useSelectionDialogStore(
      (state) => state.setSelectorDialogState
   )

   const [searchOptions, setSearchOptions] = useState<ClientContactFilterDto>({
      projectId: project.id
   });

   const { data: contacts, isLoading } = useClientContactsQuery(searchOptions);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions((prev) => ({ ...prev, name: event.target.value }));
   };

   const handleAddContact = () => {
      console.log('clicked')
      setSelectorDialogState({
         isOpen: true,
         type: 'contact',
         selected: [],
         projectId: project.id,
         setSelected: () => {}
      })
   }

   return (
      <>
         <div className="flex justify-between px-2 items-center">
            <p className="flex items-center px-2 h-9 text-md gap-1">
               <BookUser className="w-4 h-4" />
               Contacts
            </p>
            <AddButton className='w-7 h-7' onClick={handleAddContact} />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         {isLoading ? (
            <p>Loading...</p>
         ) : (
            <div className="flex flex-col gap-1 h-0 grow overflow-y-auto p-3">
               {contacts?.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
               ))}
            </div>
         )}
      </>
   );
};

export const ContactCard = ({ contact }: { contact: Contact }) => {
   const setFormDialogState = useDialogStore(
      (state) => state.setFormDialogState
   );
   const handleClick = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'view',
         openedOn: 'project-page',
         type: 'client-contact',
         data: contact,
      });
   };

   let avatar;
   if (!contact.avatar) {
      avatar = <User className="w-8 h-8" />;
   } else {
      avatar = (
         <img
            src={contact.avatar}
            alt="Contact Avatar"
            className="w-full h-full object-cover"
         />
      );
   }

   return (
      <div
         onClick={handleClick}
         className="flex w-full h-fit rounded-full bg-quaternary p-2 items-center gap-2 border-[1.5px] border-transparent transition-colors duration-75 hover:border-primary cursor-default"
      >
         <div className="flex w-9 h-9 bg-tertiary rounded-full items-center justify-center text-secondary overflow-hidden">
            {avatar}
         </div>
         <div className="flex flex-col leading-tight h-fit">
            <p className="font-semibold text-md">{contact.name}</p>
            <p className="text-base text-secondary">{contact.role}</p>
         </div>
      </div>
   );
};

export const NewContactButton = ({
   setDialogState,
}: {
   setDialogState: (dialogState: object) => void;
}) => {
   const dialogState = {
      isOpen: true,
      id: '',
      mode: 'create',
      data: defaultContact,
   };
   const handleClick = (type: string) => {
      if (type === 'client') {
         setDialogState({
            ...dialogState,
            type: 'clientContact',
         });
      } else if (type === 'partner') {
         setDialogState({
            ...dialogState,
            type: 'partnerContact',
         });
      }
   };

   return (
      <Popover>
         <PopoverTrigger>
            <div className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center cursor-pointer">
               <Plus className="aspect-square h-[20px]" />
            </div>
         </PopoverTrigger>
         <PopoverContent className="w-fit cursor-default">
            <p onClick={() => handleClick('client')}>Client contact</p>
            <p onClick={() => handleClick('partner')}>Partner contact</p>
         </PopoverContent>
      </Popover>
   );
};

export default ProjectContactSection;
