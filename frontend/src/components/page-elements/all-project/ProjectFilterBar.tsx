import { SelectWithSearch } from '@/components/shared/ui/SelectWithSearch';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { useProjectsViewContext } from '@/lib/context/ProjectsViewContext';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/shared/ui/FilterSelect';
import React, { useEffect, useState } from 'react';
import { Cross } from '@/components/shared/icons';
import { Grid, List } from '@/components/shared/icons';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import { useAllClientsQuery } from '@/lib/api/client-api';
import { ProjectSearchOptions, ProjectStatus } from '@types';
import { Target, X } from 'lucide-react';

export default function ProjectFilterBar() {
   return (
      <div className="flex items-center justify-between pb-2 select-none">
         <div className="flex gap-2">
            <ProjectStatusFilterBubble />
            <PaymentStatusFilterBubble />
            <ClientFilterBubble />
            <ProjectSearchBox />
         </div>
         <ViewModeToggle />
      </div>
   );
}

const ProjectSearchBox = () => {
   const { setFilter, filter } = useProjectsViewContext();
   
   const setSearchTerm = (value: string) => {
      setFilter((prev: ProjectSearchOptions) => ({
         ...prev,
         name: value,
      }));
   };

   return (
      <SearchBox
         className="border-primary rounded-full h-[27px]"
         value={filter.name}
         onChange={(e) => {
            setSearchTerm(e.target.value);
         }}
      />
   );
}

const ViewModeToggle: React.FC = () => {
   const { viewMode, setViewMode } = useProjectsViewContext();
   const activeStyle = 'bg-primary text-foreground';

   return (
      <div className="flex items-center border border-primary rounded-full h-[27px]">
         <div
            className={`flex items-center grow h-full rounded-tl-full rounded-bl-full px-2 ${
               viewMode === 'grid' ? activeStyle : ''
            }`}
            onClick={() => setViewMode('grid')}
         >
            <Grid className="w-4 h-4" />
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

const ProjectStatusFilterBubble: React.FC = () => {
   const { setFilter, filter } = useProjectsViewContext();

   const projectStatus = [
      {value: 'active', label: 'Active'},
      {value: 'on-hold', label: 'On Hold'},
      {value: 'completed', label: 'Completed'},
   ]

   const setProjectStatus = (value: string) => {
      setFilter((prev: ProjectSearchOptions) => ({
        ...prev,
        projectStatus: value,
      }));
    };

   return (
      <FilterSelect
         selectContents={projectStatus}
         value={filter.projectStatus || ''}
         onValueChange={setProjectStatus}
         placeholder='Project Status'
         className='h-[27px]'
      />
   );
};

const PaymentStatusFilterBubble: React.FC = () => {
   const { setFilter, filter } = useProjectsViewContext();

   const paymentStatus = [
      { value: 'not-processed', label: 'Not Processed' },
      { value: 'processing', label: 'Processing' },
      { value: 'paid', label: 'Paid' },
   ];

   const setPaymentStatus = (value: string) => {
      setFilter((prev: ProjectSearchOptions) => ({
        ...prev,
        paymentStatus: value,
      }));
    };

   return (
      <FilterSelect
         selectContents={paymentStatus}
         value={filter.paymentStatus || ''}
         onValueChange={setPaymentStatus}
         placeholder="Payment Status"
         className='h-[27px]'
      />
   );
};

const ClientFilterBubble: React.FC = () => {
   const [mode, setMode] = useState('base');
   const { setFilter, filter } = useProjectsViewContext();

   const { data: clientList, isLoading } = useAllClientsQuery();

   useEffect(() => {
      if (filter.clientId) {
         setMode('selected')
      } else {
         setMode('base')
      }
   },[filter.clientId])

   if (isLoading) {
      return null;
   }

   const clientSelection = clientList?.map((client) => {
      return {
         value: client.id,
         label: client.name,
      };
   });

   const setClientFilter = (value: string) => {
      setFilter((prev: ProjectSearchOptions) => ({
         ...prev,
         clientId: value,
      }));
   };

   return (
      <div className="flex gap-[1px]">
         <SelectWithSearch
            onValueChange={setClientFilter}
            value={filter.clientId || ''}
            selectContents={clientSelection || []}
            className={`flex h-5 gap-1 items-center justify-center focus:outline-none whitespace-nowrap border border-primary p-3 rounded-tl-full rounded-bl-full ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-primary text-foreground ${
               mode === 'base' &&
               'rounded-tr-full rounded-br-full bg-transparent text-primary'
            }`}
            placeholder="Client"
         />
         {mode === 'selected' && (
            <div
               className="flex h-5 gap-1 text-foreground items-center justify-center bg-primary border border-primary p-3 px-1 rounded-tr-full rounded-br-full"
               onClick={() => {
                  setFilter((prev: ProjectSearchOptions) => ({
                     ...prev,
                     clientId: '',
                  }));
                  setMode('base');
               }}
            >
               <X className="w-4 h-4" />
            </div>
         )}
      </div>
   );
}
