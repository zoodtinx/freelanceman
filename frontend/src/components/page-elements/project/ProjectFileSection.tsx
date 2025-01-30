import { useState } from 'react';
import { FileList } from '@/components/page-elements/files/FileList';
import FileDialog from '@/components/shared/ui/FileDialog';
import AddButton from '@/components/shared/ui/AddButton';
import React from 'react';
import { useAllFilesQuery } from '@/lib/api/file-api';
import { FileSearchOptions } from '@types';
import { FormDialogState } from '@/lib/types/dialog.types';
import { ProjectPageFileList } from '@/components/page-elements/project/ProjectPageFileList';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { cn } from '@/lib/helper/utils';
import { Paperclip, Package2, BookUser } from 'lucide-react';

const ProjectFileSection: React.FC = () => {
   const [tab, setTab] = useState<'drafts' | 'assets'>('drafts');
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

   const handleTabChange = (tab: 'drafts' | 'assets') => {
      setTab(tab);
      let category;
      if (tab === 'assets') {
         return 'project-asset';
      } else if (tab === 'drafts') {
         return 'working-file';
      }
      setFileFilter((prev) => {
         return {
            ...prev,
            category: category,
         };
      });
   };

   return (
      <>
         <div className="flex justify-between items-center pb-1">
            <div className="flex items-center px-2  gap-3 h-11 text-lg cursor-default">
               <p
                  className={cn(
                     'flex items-center gap-1 text-secondary order-2 transition-colors duration-150',
                     {
                        'text-primary': tab === 'drafts',
                     }
                  )}
                  onClick={() => handleTabChange('drafts')}
               >
                  <Paperclip className='w-5 h-5' />
                  Draft
               </p>
               <p
                  className={cn(
                     'flex items-center gap-1 text-secondary order-2 transition-colors duration-150',
                     {
                        'text-primary': tab === 'assets',
                     }
                  )}
                  onClick={() => handleTabChange('assets')}
               >
                  <Package2 className='w-5 h-5' />
                  Assets
               </p>
            </div>
            <AddButton />
         </div>
         <div>
            <SearchBox className="rounded-full w-1/2 h-6 text-base " />
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
