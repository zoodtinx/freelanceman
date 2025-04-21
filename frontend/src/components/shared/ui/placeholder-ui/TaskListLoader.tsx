import React from 'react';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';

const TaskListLoader: React.FC = () => {
   return (
      <div className="flex flex-col w-full h-full gap-3">
         <TaskLoader />
         <TaskLoader />
         <TaskLoader />
         <TaskLoader />
         <TaskLoader />
         <TaskLoader />
         <TaskLoader />
         <TaskLoader />
         <TaskLoader />
         <TaskLoader />
         <TaskLoader />
         <TaskLoader />
      </div>
   );
};

const TaskLoader = () => {
   return (
      <div className="grid grid-cols-[24px_auto] cursor-default hover:bg-background transition-colors duration-75 py-1 pl-2 rounded-lg group relative">
         <div className="w-[24px] flex items-start">
            <Skeleton className="h-[18px] w-[18px] rounded-full" />
         </div>
         <div>
            <Skeleton
               className={`h-[14px] rounded-full`}
               style={{
                  width: `${Math.floor(
                     Math.random() * (250 - 170 + 1) + 180
                  )}px`,
               }}
            />
         </div>
         <div></div>
         <div className="flex text-sm text-secondary">
            <div>
               <Skeleton className="h-[12px] w-[100px]  rounded-full" />
            </div>
         </div>
      </div>
   );
};

export default TaskListLoader;
