import { Plus } from 'lucide-react';
import React from 'react';

const NoProjectPlaceholder: React.FC<{ addFn: () => void }> = ({ addFn }) => {
   const PlaceholderBox = () => (
      <div className="border border-primary opacity-20 border-dashed rounded-[17px] max-w-[400px] h-[205px]"></div>
   );

   const placeholders = [...Array(28)].map(() => <PlaceholderBox />);

   return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] md:grid-cols-[repeat(4,minmax(0,1fr))] gap-3 w-full pb-4 pl-1 pt-1 pr-1">
         <div className="z-10 absolute h-full w-full left-0 bottom-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
         <div
            onClick={addFn}
            className={`border border-dashed border-primary text-primary rounded-container max-w-[400px] h-[205px]
                        flex flex-col justify-center items-center opacity-35 hover:opacity-100
                        transition-opacity duration-100 cursor-pointer`}
         >
            <Plus className="w-8 h-8" />
            <p>Start a new project</p>
         </div>
         {placeholders}
      </div>
   );
};

export default NoProjectPlaceholder;
