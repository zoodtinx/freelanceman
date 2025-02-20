import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
   ProjectCardProps,
   ProjectListProps,
} from '@/components/page-elements/all-projects/props.type';
import { EllipsisVertical } from 'lucide-react';

const ProjectList: React.FC<ProjectListProps> = ({
   projects,
   isLoading,
}): JSX.Element => {
   if (isLoading) {
      return <p>Loading</p>;
   }

   if (!projects || projects.length === 0) {
      return <p>Get started by creating a new project</p>;
   }

   const projectTabs = projects.map((project) => (
      <ProjectTab project={project} key={project.id} />
   ));

   return <div className="flex flex-col gap-1">{projectTabs}</div>;
};

export const ProjectTab: React.FC<ProjectCardProps> = ({ project }) => {
   const navigate = useNavigate();

   const handleProjectNavigation = () => {
      navigate(`../${project.id}`);
   };

   const handleClientNavigation = () => {
      navigate(`../client/${project.clientId}`);
   };

   const openSettingDialog = (e: React.MouseEvent) => {
      e.stopPropagation();
      // the rest of setting dialog
   };

   const formattedDate = format(
      new Date(project.modifiedAt),
      'dd MMM'
   ).toUpperCase();

   return (
      <div
         className="flex rounded-[15px] h-[40px] relative border overflow-hidden transition-colors group"
         style={{
            backgroundColor: `var(--freelanceman-theme-${project.themeColor})`,
            borderColor: `var(--freelanceman-theme-${project.themeColor})`,
         }}
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
               <p className="w-[140px]">
                  Updated :{' '}
                  <p className="inline font-semibold">{formattedDate}</p>
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
