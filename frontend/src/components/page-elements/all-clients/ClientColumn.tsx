import { Plus } from '@/components/shared/icons';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import ClientCard from './ClientCard';
import { Building2 } from 'lucide-react';
import { ClientSearchOption } from '@types';
import { useState } from 'react';
import { useAllClientsQuery } from '@/lib/api/client-api';
import { Switch } from 'src/components/shared/ui/primitives/Switch';
import useDialogStore from '@/lib/zustand/dialog-store';
import { defaultContactValues } from 'src/components/shared/ui/helpers/constants/default-values';

const ClientColumn = (): JSX.Element => {
   const setFormDialogState = useDialogStore((state) => state.setFormDialogState);

   const [searchOptions, setSearchOptions] = useState<ClientSearchOption>({});

   const isWithActiveProject = searchOptions.hasActiveProject

   const { data: clients, isLoading } = useAllClientsQuery(searchOptions);

   const handleNewClient = () => {
      console.log('New client clicked');
   };

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions((prev) => ({ ...prev, name: event.target.value }));
   };

   const ActiveProjectButton = () => {
      const toggleActiveProjects = () => {
         setSearchOptions((prev) => ({
            ...prev,
            hasActiveProjects: !prev.hasActiveProjects, // Toggle between true and undefined
         }));
      };

      return (
         <div className="flex gap-2">
            with active projects
            <Switch
               checked={searchOptions.hasActiveProjects}
               onCheckedChange={toggleActiveProjects}
            />
         </div>
      );
   };
   

   return (
      <div className="flex flex-col rounded-[20px] bg-foreground p-4 pt-2 h-full gap-[6px] flex-1 shadow-md">
         <div className="flex justify-between">
            <div className="flex items-center gap-1">
               <Building2 className="w-[28px] h-auto" />
               <p className="text-xl pt-1 leading-none mr-2">Clients</p>
            </div>
            <button
               onClick={handleNewClient}
               className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center cursor-pointer"
            >
               <Plus className="aspect-square h-[20px]" />
            </button>
         </div>
         <div className="flex justify-between items-center">
            <SearchBox
               placeholder="Search client"
               className=""
               onChange={handleSearch}
               value={searchOptions.name || ''}
            />
            <ActiveProjectButton />
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-fit">
         {isLoading ? (
            <p>Loading...</p>
         ) : (
            <>
               {clients?.map((clients) => (
                  <ClientCard
                     key={clients.id}
                     client={clients}
                  />
               ))}
            </>
         )}
         </div>
      </div>
   );
};

export default ClientColumn;
