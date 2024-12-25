import { Plus } from '@/components/shared/icons';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import ClientCard from './ClientCard';
import { mockAllClients as clients } from '@mocks';
import { Building2 } from 'lucide-react';

const ClientColumn = (): JSX.Element => {
   const handleNewClient = () => {
      console.log('New client clicked');
   };

   const clientGrid =
      clients.length !== 0
         ? clients.map((client) => {
              return <ClientCard client={client} />;
           })
         : 'no client';

   return (
      <>
         <div className="flex justify-between">
            <div className="flex items-center gap-1">
               <Building2 className="w-6 h-6" />
               <p className="text-xl pt-1 leading-none mr-2 cursor-default">
                  Clients
               </p>
               <p className="text-xl pt-1 leading-none mr-2 cursor-default">
                  Partners
               </p>
            </div>
            <button
               onClick={handleNewClient}
               className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center cursor-pointer"
            >
               <Plus className="aspect-square h-[20px]" />
            </button>
         </div>
         <div className="flex justify-between items-center">
            <SearchBox placeholder="Search client" />
            <button className="flex h-7 border border-primary items-center px-2 rounded-lg hover:bg-tertiary cursor-default transition-colors duration-75">
               with active projects
            </button>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-fit">
            {clientGrid}
         </div>
      </>
   );
};

export default ClientColumn;
