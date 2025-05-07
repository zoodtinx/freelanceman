import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useClientSelectionsQuery } from '@/lib/api/client-api';
import { cn } from '@/lib/helper/utils';
import { ClientFilterDto } from 'freelanceman-common';
import { SelectWithSearch } from '@/components/shared/ui/form-field-elements';
import { usePartnerCompaniesSelectionQuery } from '@/lib/api/partner-api';

export interface CompanyFilterBubble {
   value: string | undefined;
   setFilter: (value: string) => void;
   entity: 'client' | 'partner';
}

export const CompanyFilterBubble: React.FC<CompanyFilterBubble> = ({
   entity,
   value,
   setFilter,
}) => {
   const [mode, setMode] = useState('base');

   const [companyFilter, setCompanyFilter] = useState<ClientFilterDto>({});
   const { data: clientSelections, isLoading: clientIsLoading } =
      useClientSelectionsQuery(companyFilter, entity === 'client');
   const { data: partnerSelections, isLoading: partnerIsLoading } =
      usePartnerCompaniesSelectionQuery(companyFilter, entity === 'partner');

   useEffect(() => {
      if (value) {
         setMode('selected');
      } else {
         setMode('base');
      }
   }, [value]);

   const handleSelect = (value: string) => {
      setFilter(value);
   };

   const handleSearch = (value: string) => {
      setCompanyFilter({
         name: value,
      });
   };

   const handleDiscardFilter = () => {
      setMode('base');
      setFilter('');
   };

   return (
      <div className="flex gap-[1px]">
         <SelectWithSearch
            handleSearch={handleSearch}
            handleSelect={handleSelect}
            type="client"
            placeholder={entity === 'client' ? 'Client' : 'Company'}
            value={value}
            selections={
               entity === 'client' ? clientSelections : partnerSelections
            }
            isLoading={entity === 'client' ? clientIsLoading : partnerIsLoading}
            className={cn(
               'flex px-2 gap-1 items-center justify-center focus:outline-none whitespace-nowrap border',
               'border-primary rounded-tl-full rounded-bl-full placeholder:text-muted-foreground',
               '[&>span]:line-clamp-1 bg-primary text-foreground',
               mode === 'base' &&
                  'rounded-tr-full rounded-br-full bg-transparent text-secondary border-secondary'
            )}
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
