import React from 'react';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';

const EventListLoader: React.FC = () => {
   return (
      <div className="flex flex-col w-full h-full gap-2">
         <EventLoaderWithDate />
         <EventLoader />
         <EventLoader />
         <EventLoaderWithDate />
         <EventLoader />
         <EventLoader />
         <EventLoader />
         <EventLoader />
         <EventLoaderWithDate />
         <EventLoader />
      </div>
   );
};

const EventLoader = () => {
   return (
      <div className="flex h-14 w-full gap-2">
         <div className="h-14 w-14" />
         <Skeleton className="h-14 grow" />
      </div>
   );
};

const EventLoaderWithDate = () => {
   return (
      <div className="flex h-14 w-full gap-2">
         <Skeleton className="h-14 w-14" />
         <Skeleton className="h-14 grow" />
      </div>
   );
};

export default EventListLoader;
