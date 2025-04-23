import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import React from 'react';

const FileListLoader: React.FC = () => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
      <Skeleton className='px-2 h-10 w-full' />
    </div>
  );
};

export default FileListLoader;