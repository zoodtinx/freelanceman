import { useTranslation } from 'react-i18next';
import { Pin } from '@/components/shared/icons';
import clsx from 'clsx';
import { Project as ProjectIcon } from '@/components/shared/icons';
import type { Project } from '@types';

const project = {
   name: 'Sansiri Dog Freindly House Launch Campaign Sansiri Dog Freindly House Launch Campaign',
};

export default function PinnedProjects() {
   const { t } = useTranslation();

   return (
      <div className="flex flex-col md:hidden">
         <div className="flex items-center px-3 pb-2 gap-1 w-full text-secondary">
            <Pin width={16} height={16} />
            <p className="text-sub">{t('pinnedProjects')}</p>
         </div>
         <PinnedProjectTab project={project} />
      </div>
   );
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