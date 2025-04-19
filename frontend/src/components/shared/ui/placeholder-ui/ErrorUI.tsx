import { Button } from '@/components/shared/ui/primitives/Button';
import React from 'react';

export const UnexpectedError: React.FC<{ onClick: () => void }> = ({
   onClick,
}) => {
   return (
      <div className="flex flex-col grow justify-center items-center gap-2 pb-[65px]">
         <p className='text-md'>Unexpected error, please try again</p>
         <Button onClick={onClick}>Retry</Button>
      </div>
   );
};
