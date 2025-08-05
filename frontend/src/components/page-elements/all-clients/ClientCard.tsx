import { BookUser, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/helper/utils';
import { ClientFindManyItem } from 'freelanceman-common';

const ClientCard = ({ client }: { client: ClientFindManyItem }): JSX.Element => {
   const navigate = useNavigate();

   // plurals check
   const projectWording = client.projects.length < 2 ? 'project' : 'projects';

   const handleSelectClient = () => {
      navigate(`./${client.id}`);
   };

   return (
      <div
         className={cn(
            'relative flex flex-col justify-between rounded-[20px] overflow-hidden h-[170px] p-4 pt-3 leading-tight transition-all text-constant-primary border-2 border-transparent hover:border-primary duration-75 cursor-default',
            'sm:h-fit sm:p-1 sm:rounded-xl'
         )}
         onClick={handleSelectClient}
      >
         <div className="z-10 flex flex-col justify-between h-full p-1">
            <div className="flex gap-1">
               <p className="grow text-lg font-medium sm:text-md">{client.name}</p>
            </div>
            <div className="flex flex-col gap-1 sm:hidden">
               <div className="flex gap-1">
                  <BookUser className="w-5 h-auto" />
                  <p>{client.contacts.length || '0'} contacts</p>
               </div>
               <div className="flex gap-1">
                  <History className="w-5 h-auto" />
                  <p>
                     {client.projects.length || '0'} {projectWording}
                  </p>
               </div>
            </div>
         </div>
         <div
            className="absolute inset-0 transition-opacity bg-slate-100"
            style={{
               backgroundColor: `var(--freelanceman-theme-${client.themeColor})`,
            }}
         />
         <div className="opacity-60 absolute inset-0 bg-gradient-to-b from-white to-transparent transition-opacity sm:bg-gradient-to-l" />
      </div>
   );
};

export default ClientCard;
