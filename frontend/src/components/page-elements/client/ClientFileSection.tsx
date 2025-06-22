import AddButton from '@/components/shared/ui/AddButton';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, { useRef, useState } from 'react';
import { FileFilterDto } from 'freelanceman-common/src/schemas';
import { useDeleteManyFile, useFilesQuery } from '@/lib/api/file-api';
import { FilterSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { fileTypeSelections } from 'src/components/shared/ui/helpers/constants/selections';
import MultiSelectButton from 'src/components/shared/ui/select/MultiSelectButton';
import { cn } from '@/lib/helper/utils';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { defaultFileValues } from '@/components/shared/ui/helpers/constants/default-values';
import { SharedFileList } from '@/components/shared/ui/lists/SharedFileList';
import { Loader2, Paperclip } from 'lucide-react';
import { toast } from 'sonner';

const ClientFileSection: React.FC<ClientSectionProps> = ({ clientData }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const clientId = clientData.id;
   const fileSectionRef = useRef<HTMLDivElement | null>(null);

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const [fileFilter, setFileFilter] = useState<FileFilterDto>({
      clientId: clientId,
   });

   const filesQueryResult = useFilesQuery(fileFilter);
   const deleteManyFiles = useDeleteManyFile({
      errorCallback() {
         toast.error('Error deleting files');
      },
      successCallback() {
         toast.success('Files deleted');
      },
      optimisticUpdate: {
         enable: true,
         key: ['files'],
         type: 'delete',
      },
   });

   const enableMultiSelect = () => {
      if (selectState.enableSelect) {
         return;
      }
      setSelectState({
         enableSelect: true,
         selectedValues: [],
      });
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFileFilter((prev) => {
         return {
            ...prev,
            name: e.target.value,
         };
      });
   };

   const selectAll = () => {
      if (!filesQueryResult.data) {
         return;
      }
      setSelectState((prev) => {
         const selected = filesQueryResult.data.map((file: any) => {
            return file.id;
         });
         return {
            ...prev,
            selectedValues: selected,
         };
      });
   };

   const handleFileFilter = (type: string, value: any) => {
      if (type === 'type') {
         setFileFilter((prev) => {
            return {
               ...prev,
               type: value,
            };
         });
      } else if (type === 'category') {
         setFileFilter((prev) => {
            return {
               ...prev,
               category: value,
            };
         });
      }
   };

   const handleAddFile = () => {
      setFormDialogState({
         isOpen: true,
         type: 'newFile',
         mode: 'create',
         openedOn: 'clientPage',
         data: { ...defaultFileValues },
         entity: 'file',
      });
   };

   const handleDeleteMultipleFiles = async () => {
      toast.loading('Deleting files');
      setSelectState((prev) => {
         return {
            ...prev,
            enableSelect: false,
         };
      });
      await deleteManyFiles.mutateAsync(selectState.selectedValues);
      toast.dismiss();
      toast.success('Files deleted');
   };

   return (
      <div
         className="flex flex-col w-full bg-foreground rounded-[20px] sm:w-full shrink-0 overflow-hidden h-1/2 shadow-md"
         ref={fileSectionRef}
      >
         <div className="flex justify-between items-center px-4 pr-2 h-9">
            <div className="flex gap-1 items-center">
               <Paperclip className="w-4 h-4" />
               <p className="text-md">Files</p>
            </div>
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex gap-1 p-2 items-center">
            <div className="relative">
               <MultiSelectButton
                  enableMultiSelect={enableMultiSelect}
                  selectState={selectState}
                  setSelectState={setSelectState}
                  selectAllFn={selectAll}
                  ref={fileSectionRef}
                  onDelete={handleDeleteMultipleFiles}
               />
            </div>
            <FilterSelect
               onValueChange={(value) => handleFileFilter('type', value)}
               selectContents={fileTypeSelections}
               value={fileFilter.type}
               placeholder="Type"
               className={cn({ hidden: selectState.enableSelect })}
            />
            <SearchBox
               onChange={handleSearch}
               className={cn('border rounded-full h-[27px] w-[250px]', {
                  hidden: selectState.enableSelect,
               })}
            />
            {filesQueryResult.isFetching && <Loader2 className='text-primary animate-spin'/>}
         </div>
         <SharedFileList
            variant="projectPage"
            page="clientPage"
            setFilter={setFileFilter}
            filter={fileFilter}
            setSelectState={setSelectState}
            selectState={selectState}
            placeHolder="Add a file"
            addFn={handleAddFile}
            className="p-2 pt-0"
         />
      </div>
   );
};

export default ClientFileSection;
