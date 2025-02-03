import { Link } from 'lucide-react';
import AddButton from '@/components/shared/ui/AddButton';
import React from 'react';

const ProjectLinkSection: React.FC = () => {
   return (
      <>
         <div className='flex justify-between items-center pl-3 pr-2'>
            <p className="flex items-center h-9 text-md gap-1">
               <Link className="w-4 h-4" />
               Links
            </p>
            <AddButton />
         </div>
         <div className="w-full border-[0.5px] border-quaternary" />
         <div className="flex grow"></div>
      </>
   );
};

export default ProjectLinkSection;