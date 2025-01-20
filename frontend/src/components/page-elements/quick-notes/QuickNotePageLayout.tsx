import { StickyNote, Plus } from 'lucide-react';
import React from 'react';

const QuickNotesPageLayout: React.FC = () => {
   return (
      <div className="flex flex-col w-full grow bg-foreground rounded-[30px] p-4 pt-6 sm:w-full h-full shrink-0">
         <div className="flex justify-between">
            <div className="flex items-center gap-1 h-[40px]">
               <StickyNote className="h-6 w-6 mt-1" />
               <p className="text-xl pt-1 leading-none mr-2">Quick notes</p>
            </div>
            <Plus />
         </div>
      </div>
   );
};

export default QuickNotesPageLayout;
