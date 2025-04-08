import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, { useEffect, useState } from 'react';
import { LayoutGrid, List, X } from 'lucide-react';
import { FilterSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { useAllClientsQuery } from '@/lib/api/client-api';
import { cn } from '@/lib/helper/utils';
import { ClientSearchOption, ProjectSearchOption } from '@types';
import {
   ProjectFilterProps,
   ProjectFilterBubble,
   ViewModeToggleBubble,
} from '@/components/page-elements/all-projects/props.type';
import { SelectWithSearch } from '@/components/shared/ui/form-field-elements';

export const ProjectFilterBar: React.FC<ProjectFilterProps> = ({
   projectFilter,
   setProjectFilter,
   viewMode,
   setViewMode,
}) => {
   return (
      <div className="flex items-center justify-between pb-2 select-none bg-gradient-to-b from-background to-transparent">
         <div className="flex gap-2">
            <ProjectStatusFilterBubble
               projectFilter={projectFilter}
               setProjectFilter={setProjectFilter}
            />
            <PaymentStatusFilterBubble
               projectFilter={projectFilter}
               setProjectFilter={setProjectFilter}
            />
            <ClientFilterBubble
               projectFilter={projectFilter}
               setProjectFilter={setProjectFilter}
            />
            <ProjectSearchBox
               projectFilter={projectFilter}
               setProjectFilter={setProjectFilter}
            />
         </div>
         <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
   );
};

const ProjectSearchBox: React.FC<ProjectFilterBubble> = ({
   projectFilter,
   setProjectFilter,
}) => {
   const setSearchTerm = (value: string) => {
      setProjectFilter((prev: ProjectSearchOption) => ({
         ...prev,
         title: value,
      }));
   };

   return (
      <SearchBox
         className="rounded-full h-[27px]"
         value={projectFilter.title ?? ''}
         onChange={(e) => {
            setSearchTerm(e.target.value);
         }}
      />
   );
};

const ViewModeToggle: React.FC<ViewModeToggleBubble> = ({
   viewMode,
   setViewMode,
}) => {
   const activeStyle = 'bg-primary text-foreground';

   return (
      <div className="flex items-center border border-primary rounded-full h-[27px]">
         <div
            className={`flex items-center grow h-full rounded-tl-full rounded-bl-full px-2 ${
               viewMode === 'grid' ? activeStyle : ''
            }`}
            onClick={() => setViewMode('grid')}
         >
            <LayoutGrid className="w-4 h-4" />
         </div>
         <div
            className={`flex items-center grow h-full rounded-tr-full rounded-br-full px-2 ${
               viewMode === 'list' ? activeStyle : ''
            }`}
            onClick={() => setViewMode('list')}
         >
            <List className="w-4 h-4" />
         </div>
      </div>
   );
};

const ProjectStatusFilterBubble: React.FC<ProjectFilterBubble> = ({
   projectFilter,
   setProjectFilter,
}) => {
   const projectStatus = [
      { value: 'active', label: 'Active' },
      { value: 'on-hold', label: 'On Hold' },
      { value: 'completed', label: 'Completed' },
   ];

   const setProjectStatus = (value: string) => {
      setProjectFilter((prev) => ({
         ...prev,
         projectStatus: value,
      }));
   };

   return (
      <FilterSelect
         selectContents={projectStatus}
         value={projectFilter.projectStatus || ''}
         onValueChange={setProjectStatus}
         placeholder="Project Status"
         className="h-[27px]"
      />
   );
};

const PaymentStatusFilterBubble: React.FC<ProjectFilterBubble> = ({
   projectFilter,
   setProjectFilter,
}) => {
   const paymentStatus = [
      { value: 'not-processed', label: 'Not Processed' },
      { value: 'processing', label: 'Processing' },
      { value: 'paid', label: 'Paid' },
   ];

   const setPaymentStatus = (value: string) => {
      setProjectFilter((prev) => ({
         ...prev,
         paymentStatus: value,
      }));
   };

   return (
      <FilterSelect
         selectContents={paymentStatus}
         value={projectFilter.paymentStatus || ''}
         onValueChange={setPaymentStatus}
         placeholder="Payment Status"
         className="h-[27px]"
      />
   );
};

export const ClientFilterBubble: React.FC<ProjectFilterBubble> = ({
   projectFilter,
   setProjectFilter,
}) => {
   const [mode, setMode] = useState('base');

   const [clientFilter, setClientFilter] = useState<ClientSearchOption>({});
   const { data: clientList, isLoading } = useAllClientsQuery(clientFilter);

   useEffect(() => {
      if (projectFilter.clientId) {
         setMode('selected');
      } else {
         setMode('base');
      }
   }, [projectFilter.clientId]);

   const clientSelection = clientList?.map((client) => {
      return {
         value: client.id,
         label: client.name,
      };
   });

   const handleSelect = (value: string) => {
      setProjectFilter((prev) => ({
         ...prev,
         clientId: value,
      }));
   };

   const handleSearch = (value: string) => {
      setClientFilter({
         name: value,
      });
   };

   const handleDiscardFilter = () => {
      setMode('base');
      setProjectFilter((prev) => {
         return {
            ...prev,
            clientId: '',
         };
      });
   };

   return (
      <div className="flex gap-[1px]">
         <SelectWithSearch
            handleSearch={handleSearch}
            handleSelect={handleSelect}
            isLoading={isLoading}
            value={projectFilter.clientId || ''}
            selections={clientSelection || []}
            className={cn(
               'flex px-2 gap-1 items-center justify-center focus:outline-none whitespace-nowrap border',
               'border-primary rounded-tl-full rounded-bl-full placeholder:text-muted-foreground',
               '[&>span]:line-clamp-1 bg-primary text-foreground',
               mode === 'base' &&
                  'rounded-tr-full rounded-br-full bg-transparent text-secondary border-secondary'
            )}
            placeholder="Client"
         />
         {mode === 'selected' && (
            <div
               className="flex gap-1 text-foreground items-center justify-center bg-primary border border-primary px-1 rounded-tr-full rounded-br-full"
               onClick={handleDiscardFilter}
            >
               <X className="w-4 h-4" />
            </div>
         )}
      </div>
   );
};
