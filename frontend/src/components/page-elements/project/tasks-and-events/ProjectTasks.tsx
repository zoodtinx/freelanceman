import React from 'react';
import ProjectTaskTable from './ProjectTaskTable';
import ProjectEventTable from './ProjectEventTable';

const ProjectTasks: React.FC = () => {
  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <ProjectTaskTable />
      <ProjectEventTable />
    </div>
  );
};

export default ProjectTasks;