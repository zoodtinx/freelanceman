import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import React from 'react';

const IncomePageLoader: React.FC = () => {
  return (
    <div className='pb-2 px-1 flex flex-col gap-2'>
      {[...Array(15)].map((_, i) => (
      <Skeleton key={i} className='w-full h-[100px] rounded-2xl shrink-0' />
      ))}
    </div>
  );
};

export default IncomePageLoader;