import React, { useEffect } from 'react';
import ProjectList from './ProjectList';
import ProjectFilterBar from './ProjectFilterBar';
import { useProjectsViewContext } from '@/lib/context/ProjectsViewContext';
import ProjectGrid from './ProjectGrid';
import { useAllProjectsQuery } from '@/lib/api/projectApi';
import TaskDialog from '@/components/shared/ui/TaskDialog';
import ProjectSettingsDialog from './ProjectSettingsDialog';

const ProjectsLayout: React.FC = () => {
      const {
         viewMode,
         setProjects,
         taskDialogState,
         setTaskDialogState,
         projectSettingDialogState,
         setProjectSettingDialogState
      } = useProjectsViewContext();

   const { data: projects, isLoading } = useAllProjectsQuery();

   useEffect(() => {
      if (projects) {
         setProjects(projects);
      }
   }, [projects, setProjects]);

   if (isLoading) {
      return <>Loading</>;
   }


   return (
      <section className="w-full h-full flex flex-col gap-1 sm:flex-col">
         <ProjectFilterBar />
         <div className="flex flex-1 flex-col w-full sm:w-full overflow-y-auto">
            <div className="sm:hidden">
               {viewMode === 'grid' && <ProjectGrid />}
               {viewMode === 'list' && <ProjectList />}
            </div>
            <div className="hidden sm:block">
               <ProjectList />
            </div>
         </div>
         <TaskDialog dialogState={taskDialogState} setDialogState={setTaskDialogState}  /> 
         <ProjectSettingsDialog dialogState={projectSettingDialogState} setDialogState={setProjectSettingDialogState} />
      </section>
   );
};

export default ProjectsLayout;