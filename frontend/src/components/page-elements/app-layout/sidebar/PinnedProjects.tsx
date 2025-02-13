import { cn } from '@/lib/helper/utils';
import { useTranslation } from 'react-i18next';
import { Pin } from '@/components/shared/icons';
import { useState } from 'react';
import { PencilRuler } from 'lucide-react';
import { useAllProjectsQuery } from '@/lib/api/project-api';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Project } from '@types';

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
         <PinnedProjectTabs />
      </div>
   );
}


const PinnedProjectTabs: React.FC = () => {
   const { data: projects, isLoading } = useAllProjectsQuery({ pinned: true });
   if (isLoading) {
      return <p>Loading...</p>
   }

   const pinnedProjects = projects.map((project) => {
      return (
          <PinnedProjectCard project={project} key={project.id} />
      )
   })

   return (
      <div className="flex flex-col px-[6px] gap-2">
         {pinnedProjects}
      </div>
   );
}

// const PinnedProjectCard = ({ project }: { project: Project }) => {
//    const { projectId } = useParams();
//    const isActive = projectId === project.id

//    return (
//       <Link
//          to={`/home/projects/${project.id}`}
//          className={cn(
//             'relative flex h-[50px] rounded-xl leading-tight text-sm cursor-default border overflow-hidden',
//             'hover:border-primary hover:text-primary transition-colors duration-100 dark:border-tertiary dark:hover:border-secondary',
//             isActive
//                ? 'bg-transparent text-freelanceman-darkgrey border-transparent hover:border-transparent dark:hover:text-freelanceman-darkgrey'
//                : 'text-secondary'
//          )}
//       >
//          <p className="p-[6px] px-2 line-clamp-2 font-medium z-10">
//             {project.title}
//          </p>
//          {isActive && (
//             <div
//                className="w-full h-full z-0 absolute"
//                style={{
//                   backgroundColor: project.themeColor,
//                }}
//             />
//          )}
//       </Link>
//    );
// };

const PinnedProjectCard = ({ project }: { project: Project }) => {
   const { projectId } = useParams();
   const isActive = projectId === project.id

   return (
      <Link
         to={`/home/projects/${project.id}`}
         className={cn(
            'relative flex h-[64px] rounded-xl overflow-hidden border border-secondary cursor-default',
            isActive && ''
         )}
      >
         <div
            className={cn(
               'w-full rounded-xl z-20 mt-2 bg-background text-secondary hover:text-primary transition-colors duration-75',
               isActive && 'bg-foreground text-primary'
            )}
         >
            <p className="p-[6px] px-2 line-clamp-2 font-medium">
               {project.title}
            </p>
         </div>
         {isActive ? (
            <div
               className="w-full h-1/2 z-10 absolute"
               style={{
                  backgroundColor: project.themeColor,
               }}
            />
         ) : (
            <div className="w-full h-1/2 z-10 absolute bg-tertiary" />
         )}
      </Link>
   );
};