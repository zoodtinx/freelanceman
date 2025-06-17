import { useEffect, useState } from 'react';
import AddButton from '@/components/shared/ui/AddButton';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { cn } from '@/lib/helper/utils';
import { Paperclip, Package2 } from 'lucide-react';
import { defaultFileValues } from 'src/components/shared/ui/helpers/constants/default-values';
import { FileFilterDto, ProjectPayload } from 'freelanceman-common';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { SharedFileList } from '@/components/shared/ui/lists/SharedFileList';

const ProjectFileSection = ({ project }: { project: ProjectPayload }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [tab, setTab] = useState('work');

   const [fileFilter, setFileFilter] = useState<FileFilterDto>({
      projectId: project.id,
      category: 'work',
   });

   console.log('fileFilter.category!', fileFilter.category!)

    const handleNewFile = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'projectPage',
         type: 'newFile',
         data: {
            ...defaultFileValues,
            projectId: project.id,
            category: fileFilter.category!,
         },
         entity: 'file',
      });
   };

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   useEffect(() => {
      if (project?.id) {
         setFileFilter((prev) => ({
            ...prev,
            projectId: project.id,
         }));
      }
   }, [project?.id]);

   const handleTabChange = (tab: 'work' | 'asset') => {
      setTab(tab);
      setFileFilter((prev) => {
         return {
            ...prev,
            category: tab,
         };
      });
   };

   const handleSearch = (value: string) => {
      setFileFilter((prev) => {
         return {
            ...prev,
            name: value,
         };
      });
   };

   const placeholder =
      tab === 'work' ? 'Add Working File' : 'Add Project Asset';

   return (
      <>
         <div className="flex items-center px-4 pr-2 justify-between">
            <div className="flex items-center h-9 gap-3 text-md cursor-default">
               <button
                  className={cn(
                     'flex items-center gap-1 text-secondary transition-colors duration-150 h-full border-b-[0.5px] border-tertiary hover:text-primary',
                     {
                        'text-primary': tab === 'work',
                     }
                  )}
                  onClick={() => handleTabChange('work')}
               >
                  <Paperclip className="w-4 h-4" />
                  Draft
               </button>
               <button
                  className={cn(
                     'flex items-center gap-1 text-secondary transition-colors duration-150 h-full border-b-[0.5px] border-tertiary hover:text-primary',
                     {
                        'text-primary': tab === 'asset',
                     }
                  )}
                  onClick={() => handleTabChange('asset')}
               >
                  <Package2 className="w-4 h-4" />
                  Assets
               </button>
            </div>
            <AddButton className="w-7 h-7" onClick={handleNewFile} />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow p-2 pt-3">
            <SearchBox
               onChange={(e) => handleSearch(e.target.value)}
               className="rounded-full h-6 text-base mx-1"
            />
            <SharedFileList
               page="project-page"
               variant='projectPage'
               setFilter={setFileFilter}
               filter={fileFilter}
               setSelectState={setSelectState}
               selectState={selectState}
               placeHolder={placeholder}
               addFn={handleNewFile}
            />
         </div>
      </>
   );
};

export default ProjectFileSection;
