import React, { useEffect } from 'react';
import ProjectList from './ProjectList';
import ProjectFilterBar from './ProjectFilterBar';
import { useProjectsViewContext } from '@/lib/context/ProjectsViewContext';
import ProjectGrid from './ProjectGrid';
import { useAllProjectsQuery } from '@/lib/api/project-api';
import TaskDialog from '@/components/shared/ui/TaskDialog';
import ProjectSettingsDialog from './ProjectSettingsDialog';

const ProjectsLayout: React.FC = () => {
   const {
      viewMode,
      setProjects,
      taskDialogState,
      setTaskDialogState,
      projectSettingDialogState,
      setProjectSettingDialogState,
      filter,
   } = useProjectsViewContext();

   const { data: projects, isLoading } = useAllProjectsQuery(filter);

   useEffect(() => {
      setProjects(projects ?? []);
   }, [projects, setProjects]);

   return (
      <div className="overflow-hidden flex flex-col flex-grow min-h-0">
         <ProjectFilterBar />
         {isLoading ? (
            <>Loading</>
         ) : (
            <div className="flex flex-1 flex-col w-full sm:w-full overflow-y-auto min-h-0">
               <div className="sm:hidden">
                  {viewMode === 'grid' && <ProjectGrid />}
                  {viewMode === 'list' && <ProjectList />}
               </div>
               <div className="hidden sm:block">
                  <ProjectList />
               </div>
            </div>
         )}
         <TaskDialog
            dialogState={taskDialogState}
            setDialogState={setTaskDialogState}
         />
         <ProjectSettingsDialog
            dialogState={projectSettingDialogState}
            setDialogState={setProjectSettingDialogState}
         />
      </div>
   );
};

export default ProjectsLayout;
