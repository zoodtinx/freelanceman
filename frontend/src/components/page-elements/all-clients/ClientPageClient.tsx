import { SearchBox } from '@/components/shared/ui/SearchBox';
import ClientCard from './ClientCard';
import { Building2 } from 'lucide-react';
import type { ClientFilterDto } from 'freelanceman-common/src/schemas';
import { useState } from 'react';
import { useClientsQuery } from '@/lib/api/client-api';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { defaultClientValue } from '@/components/shared/ui/helpers/constants/default-values';
import AddButton from '@/components/shared/ui/AddButton';
import { ClientPayload } from 'freelanceman-common';
import { ClientGridLoader } from '@/components/shared/ui/placeholder-ui/ClientGridLoader';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';

const ClientColumn = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [searchOptions, setSearchOptions] = useState<ClientFilterDto>({});

   const { data: clients, isLoading } = useClientsQuery(searchOptions);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions((prev) => ({ ...prev, name: event.target.value }));
   };

   const handleNewClient = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'all-client-page',
         type: 'new-client',
         entity: 'client',
         data: { ...defaultClientValue },
      });
   };

   return (
      <div className="flex flex-col rounded-[20px] bg-foreground p-4 pt-2 h-full flex-1 shadow-md relative">
         <div className="flex justify-between py-2">
            <div className="flex items-center gap-1">
               <Building2 className="w-[28px] h-auto" />
               <p className="text-xl pt-1 leading-none mr-2">Clients</p>
            </div>
            <AddButton onClick={handleNewClient} />
         </div>
         {isLoading ? (
            <Skeleton className="h-7 w-[300px] rounded-full" />
         ) : (
            <SearchBox
               placeholder="Search client"
               className="w-[300px]"
               onChange={handleSearch}
               value={searchOptions.name || ''}
            />
         )}
         {isLoading ? <ClientGridLoader /> : <ClientGrid clients={clients} />}
      </div>
   );
};

const ClientGrid = ({ clients }: { clients: ClientPayload[] | undefined }) => {
   return (
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] xl:grid-cols-[repeat(4,minmax(0,1fr))] gap-2 w-full pt-2">
         {clients?.map((clients: ClientPayload) => (
            <ClientCard key={clients.id} client={clients} />
         ))}
      </div>
   );
};

export default ClientColumn;
