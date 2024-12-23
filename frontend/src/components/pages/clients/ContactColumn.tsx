import { Plus } from '@/components/shared/icons';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { Contact } from '@types';
// import ContactDialog from '@/components/shared/ui/ContactDialog';

const handleNewContact = () => {
   console.log('New client clicked');
};

const ContactColumn = (): JSX.Element => {
   const contact = {
      name: 'Sonia Sotomayer',
      company: 'Sansiri',
      role: 'Marketing Director',
   };

   return (
      <div className="flex flex-col w-[350px] rounded-[30px] bg-foreground p-4 pt-5 sm:w-full h-full gap-[6px] shrink-0">
         <div className="flex justify-between">
            <p className="text-xl pt-1 leading-none mr-2">Contacts</p>
            <button
               onClick={handleNewContact}
               className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center cursor-pointer"
            >
               <Plus className="aspect-square h-[20px]" />
            </button>
         </div>
         <SearchBox placeholder="Search contact" className="w-full" />
         <div>
            <ContactCard contact={contact} />
         </div>
      </div>
   );
};

const ContactCard = ({ contact }: { contact: Contact }) => { 
  return (
      <div className="flex w-full h-fit rounded-full bg-tertiary p-2 items-center gap-2 border-[1.5px] border-transparent transition-colors duration-75 hover:border-primary cursor-default">
         <div className="w-14 h-14 bg-white rounded-full" />
         <div className="flex flex-col leading-tight h-fit">
            <p className="font-semibold text-md">{contact.name}</p>
            <p className="font-semibold text-base">{contact.company}</p>
            <p className="text-base">{contact.role}</p>
         </div>
      </div>
   );
};

export default ContactColumn;