import { useState } from 'react';
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

const ProjectFileSection: React.FC = ({ project }) => {
   const [tab, setTab] = useState('project-file');
   const [fileDialogState, setFileDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'file',
      data: {},
      page: 'project-page',
   });

   const [fileFilter, setFileFilter] = useState({
      projectId: project.id,
      category: 'project-file'
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: filesData, isLoading } = useAllFilesQuery(fileFilter);

   const handleTabChange = (tab: 'project-file' | 'project-asset') => {
      setTab(tab);
      console.log('category', tab)
      setFileFilter((prev) => {
         return {
            ...prev,
            category: tab,
         };
      });
   };

   return (
      <>
         <div className="flex items-center">
            <div className="flex items-center h-9 text-md cursor-default">
               <p
                  className={cn(
                     'flex items-center gap-1 px-4 pr-3 text-secondary transition-colors duration-150 h-full border-b-[0.5px] border-tertiary',
                     {
                        'text-primary border-r-[0.5px] border-b-0 border-tertiary':
                           tab === 'project-file',
                     }
                  )}
                  onClick={() => handleTabChange('project-file')}
               >
                  <Paperclip className="w-4 h-4" />
                  Draft
               </p>
               <p
                  className={cn(
                     'flex items-center gap-1 text-secondary transition-colors duration-150 px-3 h-full border-b-[0.5px] border-tertiary',
                     {
                        'text-primary border-r-[0.5px] border-b-0 border-tertiary':
                           tab === 'project-asset',
                     }
                  )}
                  onClick={() => handleTabChange('project-asset')}
               >
                  <Package2 className="w-4 h-4" />
                  Assets
               </p>
            </div>
            <div className="flex items-center border-b-[0.5px] h-9 border-tertiary grow justify-end">
               <AddButton />
            </div>
         </div>
         <div className="flex flex-col grow p-2 pt-3">
            <SearchBox className="rounded-full w-1/2 h-6 text-base ml-2" />
            <ProjectPageFileList
               filesData={filesData}
               isLoading={isLoading}
               selectState={selectState}
               setDialogState={setFileDialogState}
               setSelectState={setSelectState}
            />
         </div>
         <FileDialog
            dialogState={fileDialogState}
            setDialogState={setFileDialogState}
         />
      </>
   );
};

export default ProjectFileSection;
