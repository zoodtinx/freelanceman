import { useState, useRef, useEffect } from 'react';
import * as React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import {
   Select,
   SelectContent,
   SelectTrigger,
} from '@/components/shared/ui/primitives/Selection';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/helper/utils';
import { useAllClientsQuery, useClientSelectionQuery } from '@/lib/api/client-api';
import AsyncSelectionList from 'src/components/shared/ui/select/AsyncSelectionList';
import { SelectComponentProps } from '@/components/shared/ui/select/select.type';
import { ClientSearchOption } from '@types';

const ClientSelect: React.FC<SelectComponentProps> = ({
   selected,
   setSelected,
   className
}) => {
   const [searchTerm, setSearchTerm] = useState<ClientSearchOption>({})
   const [selectedLabel, setSelectedLabel] = useState('')

   const {data: clientsData, isLoading} = useClientSelectionQuery(searchTerm)

   
   const handleValueChange = (value: any) => {
      console.log('value in onValueChange', value)
   }

   const handleInputChange = (e) => {
      setSearchTerm({name: e.target.value})
   }
   
   return (
      <Select
         value={selected?.value}
         onValueChange={(value) => handleValueChange(value)}
      >
         <SelectTrigger
            className={cn(
               className,
               'flex justify-between items-center cursor-pointer'
            )}
         >
            <p className="truncate">
               {selectedLabel ? selectedLabel : 'Select a client'}
            </p>
            <ChevronDown className="ml-1 h-4 w-4" />
         </SelectTrigger>
         <SelectContent className="border-0 bg-foreground rounded-xl p-1 overflow-hidden text-sm font-normal w-[300px]">
            <div className="w-full max-h-[250px] pr-2 bg-foreground rounded-md border-0 flex flex-col">
               <SearchBox
                  onChange={handleInputChange}
                  className="w-full mb-2 bg-background"
                  placeholder="Search..."
               />
               <AsyncSelectionList
                  selectContents={clientsData}
                  isLoading={isLoading}
                  selectedValue={selected}
               />
            </div>
         </SelectContent>
      </Select>
   );
};

export default ClientSelect