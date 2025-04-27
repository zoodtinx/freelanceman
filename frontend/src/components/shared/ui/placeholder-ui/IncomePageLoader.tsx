import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import React from 'react';

const IncomePageLoader: React.FC = () => {
  return (
    <>
      <Skeleton className='w-full h-[100px] rounded-2xl shrink-0' />
      <Skeleton className='w-full h-[100px] rounded-2xl shrink-0' />
      <Skeleton className='w-full h-[100px] rounded-2xl shrink-0' />
      <Skeleton className='w-full h-[100px] rounded-2xl shrink-0' />
      <Skeleton className='w-full h-[100px] rounded-2xl shrink-0' />
      <Skeleton className='w-full h-[100px] rounded-2xl shrink-0' />
      <Skeleton className='w-full h-[100px] rounded-2xl shrink-0' />
      </>
  );
};

export default IncomePageLoader;