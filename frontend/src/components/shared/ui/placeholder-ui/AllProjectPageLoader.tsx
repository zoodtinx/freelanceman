import React from 'react';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';

const AllProjectPageLoader: React.FC = () => {
  return (
    <div className='grow'>
      <div className='flex justify-between'>
        <div className='flex pb-2 gap-[6px]'>
            <Skeleton className='h-[27px] w-[130px] rounded-full' />
            <Skeleton className='h-[27px] w-[130px] rounded-full' />
            <Skeleton className='h-[27px] w-[90px] rounded-full' />
        </div>
        <Skeleton className='h-[27px] w-[68px] rounded-full' />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3 w-full">
           <Skeleton className='h-[205px] rounded-[20px]' />
           <Skeleton className='h-[205px] rounded-[20px]' />
           <Skeleton className='h-[205px] rounded-[20px]' />
           <Skeleton className='h-[205px] rounded-[20px]' />
           <Skeleton className='h-[205px] rounded-[20px]' />
           <Skeleton className='h-[205px] rounded-[20px]' />
           <Skeleton className='h-[205px] rounded-[20px]' />
           <Skeleton className='h-[205px] rounded-[20px]' />
           <Skeleton className='h-[205px] rounded-[20px]' />
           <Skeleton className='h-[205px] rounded-[20px]' />
        </div>
    </div>
  );
};

export default AllProjectPageLoader;