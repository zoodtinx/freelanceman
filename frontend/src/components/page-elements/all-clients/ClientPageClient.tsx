import { SearchBox } from '@/components/shared/ui/SearchBox';
import ClientCard from './ClientCard';
import { Building2, Plus } from 'lucide-react';
import type { ClientFilterDto } from 'freelanceman-common/src/schemas';
import { useState } from 'react';
import { useClientsQuery } from '@/lib/api/client-api';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { defaultClientValue } from '@/components/shared/ui/helpers/constants/default-values';
import AddButton from '@/components/shared/ui/AddButton';
import { ClientListPayload } from 'freelanceman-common';
import { ClientGridLoader } from '@/components/shared/ui/placeholder-ui/ClientGridLoader';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import { UseQueryResult } from '@tanstack/react-query';
import {
   ApiErrorPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';
import { cn } from '@/lib/helper/utils';

const ClientColumn = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [searchOptions, setSearchOptions] = useState<ClientFilterDto>({});

   const clientsQueryResult = useClientsQuery(
      searchOptions
   ) as UseQueryResult<ClientListPayload>;

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
      <div className={cn("flex flex-col rounded-[20px] bg-foreground h-full flex-1 shadow-md relative overflow-hidden",
          "sm:shadow-sm sm:h-1/2"
      )}>
         <div
            className={cn(
               'flex flex-col w-full justify-between p-2 pb-0 gap-2',
               'sm:pt-2 sm:px-2 sm:pb-0 sm:gap-2'
            )}
         >
            <div className="flex justify-between pl-1">
               <div className="flex gap-1 items-center">
                  <div className="flex items-end gap-1 sm:items-center">
                     <Building2 className="w-[28px] h-auto mt-[2px] sm:w-[22px] sm:mt-0" />
                     <p className="text-xl leading-none mr-2 sm:text-lg">
                        Clients
                     </p>
                  </div>
               </div>
               <AddButton onClick={handleNewClient} />
            </div>
            {clientsQueryResult.isLoading ? (
               <Skeleton className="h-7 w-[300px] rounded-full" />
            ) : (
               <SearchBox
                  placeholder="Search client"
                  className="w-full lg:w-1/2"
                  onChange={handleSearch}
                  value={searchOptions.name || ''}
               />
            )}
         </div>
         <ClientGrid
            clientsQueryResult={clientsQueryResult}
            addFn={handleNewClient}
         />
      </div>
   );
};

const ClientGrid = ({
   clientsQueryResult,
   addFn,
}: {
   clientsQueryResult: UseQueryResult<ClientListPayload>;
   addFn: () => void;
}) => {
   const {
      data: clientsData,
      isLoading,
      isError,
      refetch,
   } = clientsQueryResult;
   if (isLoading) return <ClientGridLoader />;
   if (isError || !clientsData)
      return <ApiErrorPlaceHolder retryFn={refetch} />;
   if (!clientsData.items.length)
      return <ClientGridPlaceHolder addFn={addFn} />;

   const clientCards = clientsData?.items.map((client) => {
      return <ClientCard key={client.id} client={client} />;
   });

   return (
      <ScrollArea>
         <div
            className={cn(
               'grid grid-cols-[repeat(3,minmax(0,1fr))] xl:grid-cols-[repeat(5,minmax(0,1fr))] gap-1 w-full pt-[6px] px-2',
               'sm:flex sm:flex-col sm:gap-0 sm:pt-1 sm:pb-8'
            )}
         >
            {clientCards}
         </div>
      </ScrollArea>
   );
};

export default ClientColumn;

const placeholderElements = [...Array(30)].map((_, i) => (
   <div
      key={i}
      className="h-[170px] opacity-60 rounded-[20px] border border-secondary border-dashed"
   />
));

const ClientGridPlaceHolder = ({ addFn }: { addFn: () => void }) => {
   return (
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] xl:grid-cols-[repeat(4,minmax(0,1fr))] gap-2 w-full pt-2 relative h-full">
         <div className="z-10 absolute h-full w-full left-0 bottom-0 bg-gradient-to-t from-foreground to-transparent pointer-events-none" />
         <div
            onClick={addFn}
            className={`h-[170px] rounded-[20px] border border-dashed border-secondary items-center justify-center flex flex-col text-secondary
                        hover:border-primary hover:text-primary transition-colors duration-100 cursor-pointer`}
         >
            <Plus className="w-8 h-8" />
            <p>Add a new client</p>
         </div>
         {placeholderElements}
      </div>
   );
};
