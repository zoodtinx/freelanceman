import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { BookUser, EllipsisVertical, History } from 'lucide-react';
import { ReactNode } from 'react';
import type { Client } from '@types';
import { useNavigate } from 'react-router-dom';

const ClientCard = ({ client }: { client: Client }): JSX.Element => { 
   if (!client) {
      return <></>
   }
   const projectWording = client?.projectCount < 2 ? 'project' : 'projects';

   const navigate = useNavigate();

   const handleSelectClient = () => {
      navigate(`./${client.id}`);
   };

   return (
      <div
         className="relative flex flex-col justify-between rounded-[20px] overflow-hidden h-[170px] min-w-[150px] p-4 pt-3 leading-tight transition-all text-[#333333] border-2 border-transparent hover:border-primary duration-75 cursor-default"
         onClick={handleSelectClient}
      >
         <div className="z-10 flex flex-col justify-between h-full p-1">
            <div className="flex gap-1 asp">
               <p className="grow text-lg font-medium">{client.name}</p>
               {client.activeProjectCount > 0 && (
                  <ActiveProjectPopover>
                     {client.activeProjectCount}
                  </ActiveProjectPopover>
               )}
            </div>
            <div className="flex flex-col gap-1">
               <div className="flex gap-1">
                  <BookUser className="w-5 h-auto" />
                  <p>{client.contactCount || '0'} contacts</p>
               </div>
               <div className="flex gap-1">
                  <History className="w-5 h-auto" />
                  <p>
                     {client.projectCount || '0'} {projectWording}
                  </p>
               </div>
            </div>
         </div>
         <div
            className="absolute inset-0 transition-opacity bg-slate-100"
            style={{ backgroundColor: client.themeColor }}
         />
         <div className="opacity-60 absolute inset-0 bg-gradient-to-b from-white to-transparent transition-opacity" />
      </div>
   );
};

const ActiveProjectPopover: React.FC<{ children: ReactNode }> = ({
   children,
}) => {
   const handleClick = (event: React.MouseEvent) => {
      event.stopPropagation();
   };

   return (
      <Popover>
         <PopoverTrigger
            onClick={handleClick}
            className="border-2 border-transparent aspect-square hover:border-primary-foreground transition-colors duration-75 flex text-lg text-red-500 bg-white rounded-full w-7 h-7 items-center justify-center"
         >
            {children}
         </PopoverTrigger>
         <PopoverContent className="w-[80px] cursor-default">
            <p>Hello</p>
         </PopoverContent>
      </Popover>
   );
};
export default ClientCard;
