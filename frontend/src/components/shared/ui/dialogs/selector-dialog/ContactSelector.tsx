import { DialogFooter } from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import {
   SelectedListProps,
   SelectionListProps,
   SelectObject,
} from 'src/lib/types/selector-dialog.types';
import { useEffect, useState } from 'react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { debounce } from 'lodash';
import { useClientContactsQuery } from 'src/lib/api/client-contact-api';
import SelectorListItem from '@/components/shared/ui/dialogs/selector-dialog/SelectorList';
import { ClientContactFilterDto, ClientContactFindManyResponse, PartnerContactFindManyResponse } from 'freelanceman-common';
import useSelectionDialogStore from '@/lib/zustand/selection-dialog-store';
import { usePartnerContactsQuery } from '@/lib/api/partner-contact-api';
import { CheckSquare2, Loader2, Plus } from 'lucide-react';
import { useEditProject } from '@/lib/api/project-api';
import { toast } from 'sonner';
import { CompanyFilterBubble } from '@/components/shared/ui/select/CompanyFilterBubble';
import { UseQueryResult } from '@tanstack/react-query';

const ContactSelector = () => {
   const { selectorDialogState, setSelectorDialogState } =
      useSelectionDialogStore();

   const [tab, setTab] = useState<'client' | 'partner'>('client');
   const [mode, setMode] = useState<'select' | 'view'>('select');
   const [selected, setSelected] = useState<SelectObject[]>([]);
   const [contactFilter, setContactFilter] = useState<ClientContactFilterDto>({});
   
   useEffect(() => {
      setMode(selectorDialogState.mode)
      setTab(selectorDialogState.tab)
      setSelected(selectorDialogState.selected)
   },[selectorDialogState])

   const clientQueryResult = useClientContactsQuery(
      contactFilter,
      selectorDialogState.tab === 'client'
   ) as UseQueryResult<ClientContactFindManyResponse>
   const partnerQueryResult = usePartnerContactsQuery(
      contactFilter,
      selectorDialogState.tab === 'partner'
   ) as UseQueryResult<PartnerContactFindManyResponse>

   const editProject = useEditProject({
         errorCallback() {
             toast.error('Undable to add contacts')
         },
         successCallback() {
             toast.success('Updated contacts')
         },
         optimisticUpdate: {
            enable: true,
            key: [],
            type: 'edit'
         }
      })

   const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setContactFilter((prev) => ({ ...prev, name: e.target.value }));
   }, 400);

   const handleClearSelection = () => {
      setSelected([]);
      if (mode === 'view') setMode('select');
   };

   const handleChangeMode = () => {
      setMode((prev) => (prev === 'view' ? 'select' : 'view'));
   };

   const handleSave = () => {
      const contacts = selected.map((item) => item.id)
      const contactType = tab
      
      editProject.mutate({
         id: selectorDialogState.projectId,
         contacts: {
            contactType,
            contacts
         }
      })
      setSelectorDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
   };

   const currentData =
      tab === 'client' ? clientQueryResult : partnerQueryResult;

   const handleSelectCompany = (value: string) => {
      setContactFilter((prev) => {
         return {
            ...prev,
            companyId: value
         }
      })
   }

   return (
      <>
         {mode === 'select' && (
            <div className="flex flex-wrap gap-1 px-3 pt-3">
               {selectorDialogState.tab === 'client' && <CompanyFilterBubble
                  entity={tab === 'client' ? 'client' : 'partner'}
                  setFilter={handleSelectCompany}
                  value={contactFilter.companyId}
               />}
               <SearchBox
                  className="h-5 p-3 px-2 grow w-0 min-w-10"
                  onChange={handleSearch}
               />
            </div>
         )}
         <div className="px-3 py-3 flex flex-col">
            <div className="flex flex-col w-full border rounded-lg border-secondary h-[350px] overflow-y-auto relative">
               <div className="sticky top-0 flex bg-foreground p-2 justify-between">
                  <p className="font-medium">{selected.length} Selected</p>
                  <div className="flex gap-1">
                     {selected.length > 0 && (
                        <button
                           onClick={handleChangeMode}
                           className="text-sm border border-primary px-2 pr-2 rounded-full text-primary font-medium"
                        >
                           {mode === 'view' ? (
                              <p className="flex items-center gap-1">
                                 <Plus className="w-4 h-4" /> Select More
                              </p>
                           ) : (
                              <p className="flex items-center gap-1">
                                 <CheckSquare2 className="w-4 h-4" /> View
                                 Selected
                              </p>
                           )}
                        </button>
                     )}
                     <button
                        onClick={handleClearSelection}
                        className="text-sm border border-primary px-2 rounded-full text-primary font-medium"
                     >
                        Clear
                     </button>
                  </div>
               </div>
               {mode === 'select' ? (
                  <ContactSelectorList
                     queryResult={currentData}
                     selected={selected}
                     setSelected={setSelected}
                  />
               ) : (
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
               <Button
                  variant="destructiveOutline"
                  onClick={() =>
                     setSelectorDialogState((prev) => {
                        return {
                           ...prev,
                           isOpen: false,
                        };
                     })
                  }
               >
                  Discard
               </Button>
               <Button
                  variant="submit"
                  onClick={handleSave}
                  className="text-freelanceman-darkgrey"
               >
                  Save
               </Button>
            </div>
         </DialogFooter>
      </>
   );
};

const SelectedContactList: React.FC<SelectedListProps> = ({
   selected,
   setSelected,
   setMode,
}) => {
   if (selected.length === 0) return <p className="p-2">No selected contact</p>;

   return selected.map((item) => {
      const handleUnselect = () => {
         setSelected((prev) => {
            const updated = prev.filter((x) => x.id !== item.id);
            if (updated.length === 0) setMode('select');
            return updated;
         });
      };

      return (
         <SelectorListItem
            key={item.id}
            data={item}
            isSelected={true}
            onCheckedChange={handleUnselect}
         />
      );
   });
};

const ContactSelectorList: React.FC<SelectionListProps> = ({
   selected,
   setSelected,
   queryResult,
}) => {
   const { data, isLoading } = queryResult;
   console.log('data', data)
   const contactData = data as ClientContactFindManyResponse

   if (isLoading) {
      return (
         <div className="flex justify-center items-center grow">
            <Loader2 className="animate-spin" />
         </div>
      );
   }

   if (!contactData || contactData?.items.length === 0)
      return <p className="p-2">No contact</p>;

   return contactData.items.map((contact) => {
      const detail = `${contact.role}, ${contact.company?.name ?? contact.company}`;
      const contactData = {
         id: contact.id,
         value: contact.name,
         detail,
         label: contact.name,
      };
      const isSelected = selected.some((item) => item.id === contact.id);

      const handleCheck = (e: React.MouseEvent) => {
         e.stopPropagation();
         setSelected((prev) =>
            isSelected
               ? prev.filter((item: SelectObject) => item.id !== contact.id)
               : [...prev, contactData]
         );
      };

      return (
         <SelectorListItem
            key={contact.id}
            data={contactData}
            isSelected={isSelected}
            onCheckedChange={handleCheck}
         />
      );
   });
};

export default ContactSelector;
