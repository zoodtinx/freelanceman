import { Project } from '@types';
import React from 'react';

const ProjectLayout = ({ projectData }: { projectData: Project }) => {
   return (
      <div className="flex grow gap-2">
         <div className="flex flex-col grow gap-2">
            <div className="border grow rounded-lg">
               <p></p>
            </div>
            <div className="flex h-2/5 gap-2">
               <div className="grow border rounded-lg">
               <p className="flex items-center px-3 h-11 text-lg">Notes & Links</p>
               </div>
            </div>
         </div>
         <div className="flex flex-col w-2/6 gap-2 h-full">
            <div className="border grow rounded-lg">
               <p className="flex items-center px-3 h-11 text-lg">File</p>
            </div>
            <div className="border h-2/5 rounded-lg">
               <p className="flex items-center px-3 h-11 text-lg">Contacts</p>
            </div>
         </div>
      </div>
   );
};

export default ProjectLayout;
