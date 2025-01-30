import { Link } from 'lucide-react';
import AddButton from '@/components/shared/ui/AddButton';
import React from 'react';

const ProjectLinkSection: React.FC = () => {
   return (
      <>
         <div className='flex justify-between items-center my-1 pl-3 pr-2'>
            <p className="flex items-center h-11 text-lg gap-1">
               <Link className="w-5 h-5" />
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
