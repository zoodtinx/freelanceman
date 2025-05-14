import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
   ProjectCardProps,
   ProjectListProps,
} from '@/components/page-elements/all-projects/props.type';
import { EllipsisVertical, Plus } from 'lucide-react';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { NoDataPlaceHolder } from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { defaultNewProjectValue } from '@/components/shared/ui/helpers/constants/default-values';

const ProjectList: React.FC<ProjectListProps> = ({ queryResult }) => {
   const { data: projects, isLoading, isError, error } = queryResult;
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   if (isLoading) {
      return <p>Loading</p>;
   }

   if (isError) {
      if ((error as any).message === 'Internal Server Error') {
         <p>Something went wrong on our end. Please try again later.</p>;
      }
      if ((error as any).message === 'Network Error') {
         return (
            <p>Unable to connect. Please check your internet connection.</p>
         );
      }
   }

   const handleNewProject = () => {
      setFormDialogState({
         isOpen: true,
         type: 'new-project',
         mode: 'create',
         data: { ...defaultNewProjectValue },
         openedOn: 'global-add-button',
         entity: 'project',
      });
   };

   const amount = Array(15).fill(0)
   const placeholder = amount.map(() => {
      return <div
               className={`border border-primary opacity-15 border-dashed rounded-[15px] h-[40px]`}
            />
   })

   if (projects || projects?.items?.length === 0) {
      return (
         <div className="flex flex-col w-full gap-1">
            <div
               onClick={handleNewProject}
               className={`flex border border-dashed border-primary text-primary rounded-[15px] h-[40px] opacity-35
                              hover:opacity-100 transition-opacity duration-100 cursor-pointer justify-center items-center`}
            >
               <Plus className="w-6 h-6" />
            </div>
            {placeholder}
         </div>
      );
   }

   const projectTabs = projects?.items?.map((project) => (
      <ProjectTab project={project} key={project.id} />
   ));

   return <div className="flex flex-col gap-1">{projectTabs}</div>;
};

export const ProjectTab: React.FC<ProjectCardProps> = ({ project }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const navigate = useNavigate();

   const handleProjectNavigation = () => {
      navigate(`../${project.id}`);
   };

   const handleClientNavigation = () => {
      navigate(`../client/${project.clientId}`);
   };

   const openSettingDialog = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'all-project-page',
         type: 'project-settings',
         data: project,
         entity: 'project',
      });
   };

   const formattedDate = format(
      new Date(project.updatedAt),
      'dd MMM'
   ).toUpperCase();

   return (
      <div
         className="flex rounded-[15px] h-[40px] relative border overflow-hidden transition-colors group"
         style={{
            backgroundColor: `var(--freelanceman-theme-${project.client.themeColor})`,
            borderColor: `var(--freelanceman-theme-${project.client.themeColor})`,
         }}
         onClick={handleProjectNavigation}
      >
         <div className="z-10 flex items-center pl-3 justify-between w-full text-[#333333]">
            <p className="font-medium max-w-[700px] text-md truncate cursor-default">
               {project.title}
            </p>

            <div className="flex grow items-center justify-end text-base text-constant-primary">
               <p
                  className="w-fit text-right mr-8 cursor-pointer hover:opacity-60 transition-opacity"
                  onClick={handleClientNavigation}
               >
                  {project.client.name}
               </p>
               <p className="w-[140px]">
                  Updated :{' '}
                  <span className="inline font-semibold">{formattedDate}</span>
               </p>
               <EllipsisVertical
                  className="h-[19px] cursor-pointer pr-1"
                  onClick={openSettingDialog}
               />
            </div>
         </div>
         <div className="absolute opacity-25 group-hover:opacity-65 w-full h-full bg-gradient-to-r from-white via-transparent to-transparent transition-opacity" />
      </div>
   );
};

export default ProjectList;
