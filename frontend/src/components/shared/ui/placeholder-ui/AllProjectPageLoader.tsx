import React from 'react';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';

const AllProjectPageLoader: React.FC = () => {
  return (
    <div className='grow'>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3 w-full">
           <Skeleton className='h-[205px] rounded-[15px]' />
           <Skeleton className='h-[205px] rounded-[15px]' />
           <Skeleton className='h-[205px] rounded-[15px]' />
           <Skeleton className='h-[205px] rounded-[15px]' />
           <Skeleton className='h-[205px] rounded-[15px]' />
           <Skeleton className='h-[205px] rounded-[15px]' />
           <Skeleton className='h-[205px] rounded-[15px]' />
           <Skeleton className='h-[205px] rounded-[15px]' />
           <Skeleton className='h-[205px] rounded-[15px]' />
           <Skeleton className='h-[205px] rounded-[15px]' />
        </div>
    </div>
  );
};

export default AllProjectPageLoader;