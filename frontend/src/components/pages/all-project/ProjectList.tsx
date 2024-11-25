import type { Project } from '@types';
import { Dots } from '@/components/shared/icons';
import { useTranslation } from 'react-i18next';
import { useProjectsViewContext } from '@/lib/helper/ProjectsViewContext';

// add edge case in case of empty projects list

export default function ProjectList() {
   const { projects } = useProjectsViewContext();

   
   const projectTabs = projects.map((project) => {
      return <ProjectTab project={project} key={project.id} />;
   });

   return <div className="flex flex-col gap-2">{projectTabs}</div>;
}

function ProjectTab({ project }: { project: Project }) {
   const { t } = useTranslation();

   return (
      <div
         className="flex rounded-[15px] h-[40px] relative"
         style={{ backgroundColor: project.color }}
      >
         <div className="z-10 flex items-center pl-3 pr-2 justify-between w-full text-[#333333]">
            <p className='font-medium max-w-[700px] text-md truncate'>{project.name}</p>

            <div className="flex grow items-center justify-end opacity-40 text-base">
                  <p className='w-fit text-right mr-8'>{project.client}</p>
                  <p className='w-[170px]'>
                     {t('startedAt')} : {new Date(project.dateModified).toLocaleDateString()}
                  </p>
               <Dots className="h-[20px] w-[18px]" />
            </div>

         </div>
         <div className="opacity-60 absolute rounded-[15px] inset-0 bg-gradient-to-l from-white to-transparent transition-opacity" />
      </div>
   );
}
