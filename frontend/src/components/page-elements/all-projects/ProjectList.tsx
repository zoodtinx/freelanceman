import { Dots } from '@/components/shared/icons';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ProjectCardProps, ProjectListProps } from '@/components/page-elements/all-projects/props.type';
import { EllipsisVertical } from 'lucide-react';

const ProjectList: React.FC<ProjectListProps> = ({
   projects,
   isLoading,
   setTaskDialogState,
   setProjectSettingDialogState
}): JSX.Element => {


   if (isLoading) {
      return <p>Loading</p>
   }

   if (!projects || projects.length === 0) {
      return <p>Get started by creating a new project</p>;
    }

   const projectTabs = projects.map((project) => (
      <ProjectTab
         project={project}
         key={project.id}
         setProjectSettingDialogState={setProjectSettingDialogState}
         setTaskDialogState={setTaskDialogState}
      />
   ));

   return <div className="flex flex-col gap-2">{projectTabs}</div>;
};

export const ProjectTab: React.FC<ProjectCardProps> = ({
   project,
   setProjectSettingDialogState,
}) => {
   const navigate = useNavigate();

   const handleProjectNavigation = () => {
      navigate(`../${project.id}`);
   };

   const handleClientNavigation = () => {
      navigate(`../client/${project.clientId}`);
   };

   const openSettingDialog = (e: React.MouseEvent) => {
      e.stopPropagation();
      setProjectSettingDialogState({
         isOpen: true,
         id: project.id,
         data: {
            ...project,
         },
         mode: 'view',
         page: 'project-page',
         type: 'project-settings',
      });
   };

   const formattedDate = format(
      new Date(project.modifiedAt),
      'dd MMM'
   ).toUpperCase();

   return (
      <div
         className="flex rounded-[15px] h-[40px] relative border overflow-hidden transition-colors group"
         style={{ backgroundColor: project.themeColor, borderColor: project.themeColor }}
         onClick={handleProjectNavigation}
      >
         <div className="z-10 flex items-center pl-3 justify-between w-full text-[#333333]">
            <p className="font-medium max-w-[700px] text-md truncate cursor-default">
               {project.title}
            </p>

            <div className="flex grow items-center justify-end text-base text-primary">
               <p
                  className="w-fit text-right mr-8 cursor-pointer hover:opacity-60 transition-opacity"
                  onClick={handleClientNavigation}
               >
                  {project.client}
               </p>
               <p className="w-[140px]">Updated : <p className='inline font-semibold'>{formattedDate}</p></p>
               <EllipsisVertical
                  className="h-[19px] cursor-pointer pr-1"
                  onClick={openSettingDialog}
               />
            </div>
         </div>
         <div className='absolute opacity-25 group-hover:opacity-65 w-full h-full bg-gradient-to-r from-white via-transparent to-transparent transition-opacity'></div>
      </div>
   );
};

export default ProjectList;
