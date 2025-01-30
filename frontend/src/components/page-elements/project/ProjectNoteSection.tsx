import { StickyNote } from 'lucide-react';
import AddButton from '@/components/shared/ui/AddButton';
import React from 'react';
import { Textarea } from '@/components/shared/ui/primitives/Textarea';

const ProjectNoteSection: React.FC = () => {
   return (
      <>
         <p className="flex items-center h-11 text-lg gap-1 my-1 px-4">
            <StickyNote className="w-5 h-5" />
            Notes
         </p>
         <div className="w-full border-[0.5px] border-quaternary" />
         <textarea className="flex text-primary border-0 grow px-4 py-3 resize-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent" />
      </>
   );
};

export default ProjectNoteSection;
