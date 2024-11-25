import clsx from 'clsx';
import { Project as ProjectIcon } from '../../shared/icons/index';
import type { Project } from '../../../../../shared/types/project.types';

interface SideBarTabProps extends React.HTMLAttributes<HTMLDivElement> {
   project: Project;
   isActive: boolean;
}

const PinnedProjectTab: React.FC<SideBarTabProps> = ({ project, onClick, isActive }) => {

   const containerStyle = {
      base: 'flex w-full h-[44px] items-center gap-2 border-[1.75px] rounded-[13px] p-2 px-[10px] font-medium text-[18px] cursor-pointer',
      breakpoints: '',
      inactive:
         'border-background text-secondary hover:text-primary transition-color duration-75',
      active: 'border-primary text-primary',
   };

   return (
      <div
         className={clsx(
            containerStyle.base,
            isActive ? containerStyle.active : containerStyle.inactive
         )}
         onClick={onClick}
      >
         <ProjectIcon className="shrink-0" />
         <p className="text-[14px] text-ellipsis line-clamp-2 overflow-hidden leading-tight">
            {project.name}
         </p>
      </div>
   );
}

export default PinnedProjectTab;