import { Plus } from 'lucide-react';
import React from 'react';

const ActionPageEventListPlaceholder = ({ addFn }: { addFn: () => void }) => {
   const eventData = [...Array(9)].map((_, index) => {
      return {
         date: index,
         event: [...Array(Math.floor(Math.random() * 4) + 1)],
      }
   })

   const placeholders = eventData.map((eventGroup) => {
      return <EventGroup eventGroupData={eventGroup} />;
   });

   return (
      <div
         onClick={addFn}
         className="flex flex-col w-full h-full grow overflow-hidden pb-2 relative"
      >
         <div className="z-10 absolute h-full w-full bottom-0 bg-gradient-to-t from-foreground via-foreground to-transparent pointer-events-none" />
         <div
            className={`flex border-y border-secondary border-dashed h-14 w-full relative group cursor-pointer text-secondary
                        hover:border-primary hover:text-primary transition-colors duration-100`}
         >
            <div className="absolute inset-0 flex justify-center items-center gap-1">
               <Plus className="w-6 h-6" />
               <p>Add a new event</p>
            </div>
            <div className="w-14 h-14 border-r border-secondary border-dashed group-hover:border-primary transition-colors duration-100"></div>
            <div className="grow"></div>
         </div>
         {placeholders}
      </div>
   );
};

export default ActionPageEventListPlaceholder;

const EventGroup = ({ eventGroupData }: any) => {
   const events = eventGroupData.event.map((_: any, index: number) => {
      return (
         <React.Fragment key={index}>
            <div className="h-14" />
            {index !== eventGroupData.event.length - 1 && (
               <div className="border-[0.5px] border-secondary border-dotted" />
            )}
         </React.Fragment>
      );
   });

   return (
      <div className="opacity-70 flex w-full cursor-default border-b border-b-secondary border-dashed">
         <div className="flex flex-col w-14 min-h-14 items-center text-center leading-tight justify-center aspect-square h-full bg-foreground border-r border-r-secondary border-dashed relative"></div>
         <div className="flex flex-col w-full">{events}</div>
      </div>
   );
};
