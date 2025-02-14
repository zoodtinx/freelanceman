import {
   DialogFooter,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { cn } from '@/lib/helper/utils';
import {
   SelectedListProps,
   SelectionListProps,
   SelectObject,
} from 'src/lib/types/selector-dialog.types';
import { useState } from 'react';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import { FileSearchOption } from '@types';
import {
   fileCategorySelections,
   fileTypeSelections,
} from 'src/components/shared/ui/helpers/constants/selections';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { useAllFilesQuery } from '@/lib/api/file-api';
import { debounce } from 'lodash';
import SelectorListItem from '@/components/shared/ui/dialogs/selector-dialog/SelectorList';
import { formatCategory } from '@/components/shared/ui/helpers/Helpers';

const FileSelector = () => {
   const [selected, setSelected] = useState<SelectObject[]>([]);
   const [mode, setMode] = useState<'select' | 'view'>('select');
   const [fileFilter, setFileFilter] = useState<FileSearchOption>({});

   const handleFileFilter = (type: string, value: any) => {
      setFileFilter((prev) => ({ ...prev, [type]: value }));
   };

   const handleChangeMode = () => {
      if (mode === 'view') {
         setMode('select');
      } else {
         setMode('view');
      }
   };

   const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setFileFilter((prev) => ({ ...prev, displayName: e.target.value }));
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
               <FilterSelect
                  onValueChange={(value) => handleFileFilter('type', value)}
                  selectContents={fileTypeSelections}
                  value={fileFilter.type}
                  placeholder="Type"
               />
               <FilterSelect
                  onValueChange={(value) => handleFileFilter('category', value)}
                  selectContents={fileCategorySelections}
                  value={fileFilter.category}
                  placeholder="Category"
               />
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
                  <FileSelectorList
                     selected={selected}
                     setFileFilter={setFileFilter}
                     setSelected={setSelected}
                     fileFilter={fileFilter}
                  />
               )}
               {mode === 'view' && (
                  <SelectedFileList
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

const SelectedFileList: React.FC<SelectedListProps> = ({
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
         <SelectorListItem
            key={selectedItem.id}
            data={selectedItem}
            isSelected={isSelected}
            onCheckedChange={handleCheck}
         />
      );
   });
};

const FileSelectorList: React.FC<SelectionListProps> = ({
   selected,
   setSelected,
   fileFilter,
}) => {
   const { data, isLoading } = useAllFilesQuery(fileFilter);

   console.log('selected', selected);

   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (!data || data.length === 0) {
      return <p>No file</p>;
   }

   return data.map((file) => {
      const fileType = file.type.charAt(0).toUpperCase() + file.type.slice(1);
      const cateogory = formatCategory(file.category)
      const detail = `${fileType} - ${cateogory}`
      const data = { id: file.id, value: file.displayName, detail:detail };
      const isSelected = selected.some(
         (item) => item.id === file.id && item.value === file.displayName
      );
      const handleCheck = () => {
         if (isSelected) {
            setSelected((prev) => prev.filter((item) => item.id !== file.id));
         } else {
            setSelected((prev) => [
               ...prev,
               { id: file.id, value: file.displayName, detail: detail },
            ]);
         }
      };

      return (
         <SelectorListItem
            key={file.id}
            data={data}
            isSelected={isSelected}
            onCheckedChange={handleCheck}
         />
      );
   });
};



export default FileSelector