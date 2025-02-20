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
                  backgroundColor: `var(--freelanceman-theme-${project.themeColor})`,
               }}
            />
         ) : (
            <div className="w-full h-1/2 z-10 absolute bg-tertiary" />
         )}
      </Link>
   );
};