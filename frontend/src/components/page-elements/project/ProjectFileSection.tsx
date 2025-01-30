import { useState } from 'react';
import { FileList } from '@/components/page-elements/files/FileList';
import AddButton from '@/components/shared/ui/AddButton';
import FileDialog from '@/components/shared/ui/FileDialog';
import React from 'react';
import { useAllFilesQuery } from '@/lib/api/file-api';
import { FileSearchOptions } from '@types';
import { FormDialogState } from '@/lib/types/dialog.types';
import { ProjectPageFileList } from '@/components/page-elements/project/ProjectPageFileList';
import { SearchBox } from '@/components/shared/ui/SearchBox';

const ProjectFileSection: React.FC = () => {
     const [fileDialogState, setFileDialogState] = useState<FormDialogState>({
         isOpen: false,
         id: '',
         mode: 'view',
         type: 'file',
         data: {},
      });
   
      const [fileFilter, setFileFilter] = useState<FileSearchOptions>({
         status: 'scheduled',
      });
   
      const [selectState, setSelectState] = useState({
         enableSelect: false,
         selectedValues: [] as string[],
      });
   
      const { data: filesData, isLoading } = useAllFilesQuery(fileFilter);
   
      const enableMultiSelect = () => {
         if (selectState.enableSelect) {
            return;
         }
         setSelectState({
            enableSelect: true,
            selectedValues: [],
         });
      };
   
      const selectAll = () => {
         if (!filesData) {
            return;
         }
         setSelectState((prev) => {
            const selected = filesData.map((file) => {
               return file.id;
            });
            return {
               ...prev,
               selectedValues: selected,
            };
         });
      };
   
      const handleFileFilter = (type, value: any) => {
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

   return (
      <>
         <div className="flex justify-between items-center">
            <p className="flex items-center px-2 h-11 text-lg">Files</p>
            <AddButton />
         </div>
         <div>
            <SearchBox className='rounded-full w-1/2 h-6 text-base '/>
         </div>
         <ProjectPageFileList
            filesData={filesData}
            isLoading={isLoading}
            selectState={selectState}
            setDialogState={setFileDialogState}
            setSelectState={setSelectState}
         />
         <FileDialog
            dialogState={fileDialogState}
            setDialogState={setFileDialogState}
         />
      </>
   );
};

export default ProjectFileSection;
