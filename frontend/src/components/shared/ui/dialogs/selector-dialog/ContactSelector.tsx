import {
   Tabs,
   TabsList,
   TabsTrigger,
} from 'src/components/shared/ui/primitives/Tabs';
import { DialogFooter } from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { cn } from '@/lib/helper/utils';
import {
   SelectedListProps,
   SelectionListProps,
   SelectObject,
} from 'src/lib/types/selector-dialog.types';
import { useState } from 'react';
import { ClientContactSearchOption } from '@types';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { debounce } from 'lodash';
import { useClientContactsQuery } from '@/lib/api/contact-api';
import SelectorListItem from '@/components/shared/ui/dialogs/selector-dialog/SelectorList';

const ContactSelector = () => {
   const [selected, setSelected] = useState<SelectObject[]>([]);
   const [mode, setMode] = useState<'select' | 'view'>('select');
   const [contactFilter, setContactFilter] = useState<ClientContactSearchOption>({});

   const handleFileFilter = (type: string, value: any) => {
      setContactFilter((prev) => ({ ...prev, [type]: value }));
   };

   const handleChangeMode = () => {
      if (mode === 'view') {
         setMode('select');
      } else {
         setMode('view');
      }
   };

   const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setContactFilter((prev) => ({ ...prev, displayName: e.target.value }));
   }, 400);

   const handleClearSelection = () => {
      setSelected([]);
      if (mode === 'view') {
         setMode('select');
      }
   };

   return (
      <>
         {mode === 'select' && (
            <div className={cn('flex flex-wrap gap-1 px-3 pt-3')}>
               <ContactCategoryFilter />
               <SearchBox
                  className="h-5 p-3 px-2 grow w-0 min-w-10"
                  onChange={handleSearch}
               />
            </div>
         )}
         <div className="px-3 py-3 flex flex-col">
            <div className="w-full border rounded-lg border-tertiary overflow-hidden h-[250px] overflow-y-auto relative">
               <div className="sticky top-0 flex bg-foreground p-2 pl-3 pr-2 justify-between">
                  <p className="font-medium">{selected.length} Selected</p>
                  <div className="flex gap-1">
                     <p
                        className={cn(
                           `text-sm border border-primary px-2 rounded-full cursor-default
                                    hover:bg-primary hover:text-foreground transition-colors duration-75`,
                           selected.length === 0 && 'hidden'
                        )}
                        onClick={handleChangeMode}
                     >
                        {mode === 'view' && 'select more'}
                        {mode === 'select' && 'view selected'}
                     </p>
                     <p
                        className={`text-sm border border-primary px-2 rounded-full cursor-default
                                    hover:bg-primary hover:text-foreground transition-colors duration-75`}
                        onClick={handleClearSelection}
                     >
                        clear
                     </p>
                  </div>
               </div>
               {mode === 'select' && (
                  <ContactSelectorList
                     selected={selected}
                     setfilter={setContactFilter}
                     setSelected={setSelected}
                     filter={contactFilter}
                  />
               )}
               {mode === 'view' && (
                  <SelectedContactList
                     selected={selected}
                     setSelected={setSelected}
                     setMode={setMode}
                  />
               )}
            </div>
         </div>
         <DialogFooter>
            <div className="flex justify-between p-4">
               <Button variant={'destructiveOutline'}>Delete</Button>
               <Button
                  variant={'submit'}
                  className="text-freelanceman-darkgrey"
               >
                  Add
               </Button>
            </div>
         </DialogFooter>
      </>
   );
};

const ContactCategoryFilter = () => {
   return (
      <Tabs className="w-1/2" defaultValue={'client'}>
         <TabsList className="bg-foreground w-full flex h-full rounded-full">
            <TabsTrigger
               value="client"
               className="w-1/2 text-base rounded-full"
            >
               Client
            </TabsTrigger>
            <TabsTrigger value="link" className="w-1/2 text-base rounded-full">
               Partner
            </TabsTrigger>
         </TabsList>
      </Tabs>
   );
};

const SelectedContactList: React.FC<SelectedListProps> = ({
   selected,
   setSelected,
   setMode,
}) => {
   return selected.map((selectedItem) => {
      const isSelected = selected.some(
         (item) =>
            item.id === selectedItem.id && item.value === selectedItem.value
      );

      const handleCheck = () => {
         setSelected((prev) => {
            const updated = prev.filter((item) => item.id !== selectedItem.id);
            if (updated.length === 0) {
               console.log('Hello');
               setMode('select');
            }
            return updated;
         });
      };
      return (
         <ContactSelectionItem
            key={selectedItem.id}
            data={selectedItem}
            isSelected={isSelected}
            onCheckedChange={handleCheck}
         />
      );
   });
};

const ContactSelectorList: React.FC<SelectionListProps> = ({
   selected,
   setSelected,
   filter,
}) => {
   const { data, isLoading } = useClientContactsQuery(filter);

   console.log('data', data);

   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (!data || data.length === 0) {
      return <p>No file</p>;
   }

   return data.map((contact) => {
      const detail = `${contact.role}, ${contact.company}`;
      const data = { id: contact.id, value: contact.name, detail: detail };
      const isSelected = selected.some(
         (item) => item.id === contact.id && item.value === contact.name
      );
      const handleCheck = () => {
         if (isSelected) {
            setSelected((prev) =>
               prev.filter((item) => item.id !== contact.id)
            );
         } else {
            setSelected((prev) => [
               ...prev,
               { id: contact.id, value: contact.name, detail: detail },
            ]);
         }
      };

      return (
         <SelectorListItem
            key={contact.id}
            data={data}
            isSelected={isSelected}
            onCheckedChange={handleCheck}
         />
      );
   });
};

export default ContactSelector;
