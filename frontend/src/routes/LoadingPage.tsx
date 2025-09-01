import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';
import { cn } from '@/lib/helper/utils';

interface LoadingPageProps {
   mode?: "full" | "section"
}

export const LoadingPage = ({mode = 'full' }: LoadingPageProps) => {
   return (
      <div
         style={{ height: 'calc(var(--vh) * 100)' }}
         className={cn("w-screen min-h-screen flex flex-col justify-center items-center bg-background gap-5",
            mode === 'section' && "grow w-auto h-auto"
         )}
      >
         <SvgFreelancemanIcon className="animate-bounce h-24 w-auto" />
      </div>
   );
};
