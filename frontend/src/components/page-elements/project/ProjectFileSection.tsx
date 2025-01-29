import AddButton from '@/components/shared/ui/AddButton';
import React from 'react';

const ProjectFileSection: React.FC = () => {
   return (
      <>
         <div className="flex justify-between items-center">
            <p className="flex items-center px-2 h-11 text-lg">Files</p>
            <AddButton />
         </div>
      </>
   );
};

export default ProjectFileSection;
