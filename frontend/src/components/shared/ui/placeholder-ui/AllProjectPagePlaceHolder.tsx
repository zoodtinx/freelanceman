import { Plus } from 'lucide-react';
import React from 'react';

const NoProjectPlaceholder: React.FC<{ addFn: () => void }> = ({addFn}) => {
   const PlaceholderBox = () => (
      <div className="border border-primary opacity-15 border-dashed rounded-[20px] max-w-[400px] h-[205px]"></div>
   );

   return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3 w-full grow overflow-hidden">
         <div
            onClick={addFn}
            className={`border border-dashed border-primary text-primary rounded-[20px] max-w-[400px] h-[205px]
                        flex flex-col justify-center items-center opacity-35 hover:opacity-100
                        transition-opacity duration-100 cursor-pointer`}
         >
            <Plus className="w-8 h-8" />
            <p>New Project</p>
         </div>
         <PlaceholderBox />
         <PlaceholderBox />
         <PlaceholderBox />
         <PlaceholderBox />
         <PlaceholderBox />
         <PlaceholderBox />
         <PlaceholderBox />
         <PlaceholderBox />
         <PlaceholderBox />
      </div>
   );
};

export default NoProjectPlaceholder;
