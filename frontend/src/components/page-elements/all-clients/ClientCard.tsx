import { BookUser, History } from 'lucide-react';
import type { ClientPayload } from 'freelanceman-common/src/schemas';
import { useNavigate } from 'react-router-dom';

const ClientCard = ({ client }: { client: ClientPayload }): JSX.Element => {
   const navigate = useNavigate();

   const projectWording = client.projects.length < 2 ? 'project' : 'projects';

   const handleSelectClient = () => {
      navigate(`./${client.id}`);
   };

   return (
      <div
         className="relative flex flex-col justify-between rounded-[20px] overflow-hidden h-[170px] p-4 pt-3 leading-tight transition-all text-constant-primary border-2 border-transparent hover:border-primary duration-75 cursor-default"
         onClick={handleSelectClient}
      >
         <div className="z-10 flex flex-col justify-between h-full p-1">
            <div className="flex gap-1 asp">
               <p className="grow text-lg font-medium">{client.name}</p>
            </div>
            <div className="flex flex-col gap-1">
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
         <div className="opacity-60 absolute inset-0 bg-gradient-to-b from-white to-transparent transition-opacity" />
      </div>
   );
};

export default ClientCard;
