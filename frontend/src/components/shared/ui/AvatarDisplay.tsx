import { useEffect, useState } from 'react';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/helper/utils';

export const AvatarDisplay = ({ url, className }: { url: string, className?: string }) => {
   const [isReady, setIsReady] = useState(false);

   useEffect(() => {
      if (!url) return;

      const img = new Image();
      img.onload = () => setIsReady(true);
      img.onerror = () => {console.log('error'); setIsReady(false);}
      img.src = url;
   }, [url]);

   return (
      <div className={cn("relative flex h-full aspect-square bg-foreground border border-secondary rounded-full overflow-hidden", className)}>
         <div className="absolute inset-0 flex justify-center items-center text-secondary box-border">
            <UserRound className="text-secondary" />
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
