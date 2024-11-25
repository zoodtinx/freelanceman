import { useProjectsViewContext } from '@/lib/helper/ProjectsViewContext';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
   SelectScrollDownButton,
} from '@/components/shared/ui/FilterSelect';
import { useEffect, useState } from 'react';
import { Cross } from '@/components/shared/icons';
import { Grid, List } from '@/components/shared/icons';

export default function ProjectFilterBar() {
   return (
      <div className="flex items-center justify-between pb-2">
         <div className="flex gap-2">
            <ProjectStatusFilterBubble />
            <PaymentStatusFilterBubble />
            <ClientFilterBubble />
         </div>
         <ViewModeToggle />
      </div>
   );
}

const ViewModeToggle: React.FC = () => {
   const { viewMode, setViewMode } = useProjectsViewContext();
   const activeStyle = 'bg-primary text-foreground';

   return (
      <div className="flex items-center h-full border border-primary rounded-full">
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
   const { setFilter, currentFilter } = useProjectsViewContext();
   const [mode, setMode] = useState<'base' | 'selected'>('selected');

   const selectValue = () => {
      return currentFilter.projectStatus === 'all'
         ? ''
         : currentFilter.projectStatus;
   };

   useEffect(() => {
      if (currentFilter.projectStatus === 'all') {
         setMode('base');
      } else {
         setMode('selected');
      }
   }, [currentFilter.projectStatus]);

   return (
      <div className="flex gap-[0.75px]">
         <Select
            value={selectValue()}
            onValueChange={(value) => {
               setFilter('projectStatus', value);
               setMode('selected');
               if (value === 'all') {
                  setMode('base');
                  setMode('base');
               }
            }}
         >
            <SelectTrigger className="w-auto" mode={mode}>
               <SelectValue placeholder="Project Status" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="onhold">On hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>
         {mode === 'selected' && (
            <div
               className="flex h-5 gap-1 text-foreground items-center justify-center bg-primary border border-primary p-3 px-1 rounded-tr-full rounded-br-full"
               onClick={() => {
                  setFilter('projectStatus', 'all');
                  setMode('base');
               }}
            >
               <Cross className="w-4 h-4" />
            </div>
         )}
      </div>
   );
};

const PaymentStatusFilterBubble: React.FC = () => {
   const { setFilter, currentFilter } = useProjectsViewContext();
   const [mode, setMode] = useState<'base' | 'selected'>('selected');

   const selectValue = () => {
      if (currentFilter.paymentStatus === 'all') {
         return undefined;
      } else {
         return currentFilter.paymentStatus;
      }
   };

   useEffect(() => {
      if (currentFilter.paymentStatus === 'all') {
         setMode('base');
      } else {
         setMode('selected');
      }
   }, [currentFilter.paymentStatus]);

   return (
      <div className="flex gap-[1.25px]">
         <Select
            value={selectValue()}
            onValueChange={(value) => {
               setFilter('paymentStatus', value);
               setMode('selected');
               if (value === 'all') {
                  setMode('base');
                  setMode('base');
               }
            }}
         >
            <SelectTrigger className="w-auto" mode={mode}>
               <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectItem value="not processed">Not processed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>
         {mode === 'selected' && (
            <div
               className="flex h-5 gap-1 text-foreground items-center justify-center bg-primary border border-primary p-3 px-1 rounded-tr-full rounded-br-full"
               onClick={() => {
                  setFilter('projectStatus', 'all');
                  setMode('base');
               }}
            >
               <Cross className="w-4 h-4" />
            </div>
         )}
      </div>
   );
};

const ClientFilterBubble: React.FC = () => {
   const { setFilter, currentFilter, clientList } = useProjectsViewContext();
   const [mode, setMode] = useState<'base' | 'selected'>('selected');

   const selectValue = () => {
      if (currentFilter.client === 'all') {
         return '';
      } else {
         return currentFilter.client;
      }
   };

   useEffect(() => {
      if (currentFilter.client === 'all') {
         setMode('base');
      } else {
         setMode('selected');
      }
   }, [currentFilter.client]);

   return (
      <div className="flex gap-[1.25px]">
         <Select
            value={selectValue()}
            onValueChange={(value) => {
               setFilter('client', value);
               setMode('selected');
            }}
         >
            <SelectTrigger className="w-auto" mode={mode}>
               <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  {clientList.map((client) => (
                     <SelectItem key={client} value={client}>
                        {client}
                     </SelectItem>
                  ))}
               </SelectGroup>
            </SelectContent>
         </Select>
         {mode === 'selected' && (
            <div
               className="flex h-5 gap-1 text-foreground items-center justify-center bg-primary border border-primary p-3 px-1 rounded-tr-full rounded-br-full"
               onClick={() => {
                  setFilter('client', 'all');
                  setMode('base');
               }}
            >
               <Cross className="w-4 h-4" />
            </div>
         )}
      </div>
   );
};

