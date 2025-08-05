import { useEffect, useState } from 'react';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/helper/utils';

export const AvatarDisplay = ({
   url,
   className,
   page = 'other',
}: {
   url: string;
   className?: string;
   page?: string;
}) => {
   const [isReady, setIsReady] = useState(false);

   // don't show image while loading image content
   useEffect(() => {
      if (!url) return;

      const img = new Image();
      img.onload = () => setIsReady(true);
      img.onerror = () => {
         console.log('error');
         setIsReady(false);
      };
      img.src = url;
   }, [url]);

   return (
      <div
         className={cn(
            'relative flex h-full aspect-square bg-foreground border border-secondary rounded-full overflow-hidden',
            className,
            isReady && 'border-0'
         )}
      >
         <div className="absolute inset-0 flex justify-center items-center text-secondary box-border">
            <UserRound
               className={cn(
                  'text-secondary',
                  page === 'all-client-page' && 'w-9 h-9'
               )}
            />
         </div>

         {isReady && (
            <img
               src={url}
               alt="Contact Avatar"
               className="absolute inset-0 w-full h-full object-cover"
            />
         )}
      </div>
   );
};
