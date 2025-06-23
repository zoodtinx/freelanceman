import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
} from '@/components/shared/ui/primitives/Carousel';
import {
   Dialog,
   DialogContent,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { cn } from '@/lib/helper/utils';
import React, { ReactNode, useRef } from 'react';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import { useSetVisited } from '@/lib/api/user-api';
import { welcomeDialogContent } from '@/components/shared/ui/dialogs/welcome-dialog/DialogContents';

export function GreetingDialog() {
   const { welcomeDialogState } =
      useWelcomeDialogStore();

   const nextButtonRef = useRef<HTMLButtonElement | null>(null);

   const handleClick = () => {
      if (nextButtonRef.current) nextButtonRef.current.click();
   };

   const contents = welcomeDialogContent[welcomeDialogState.page];

   const carouselItems = contents.map((content, index, array) => {
      const isLastCard = index === array.length - 1;
      return (
         <CarouselItem key={index}>
            <CardContent {...content} isLastCard={isLastCard} />
         </CarouselItem>
      );
   });

   return (
      <Dialog open={welcomeDialogState.isOpen}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent
            enableClose={false}
            overlay={true}
            onClick={handleClick}
            className={cn(
               'rounded-3xl bg-foreground dark:bg-background outline-none max-w-[490px] group cursor-pointer',
               'flex flex-col items-center px-4 py-5 pt-8 select-none',
               'lg:w-[487px] h-fit',
               'sm:rounded-2xl sm:w-[360px] sm:h-fit sm:p-3 sm:pt-7'
            )}
         >
            <Carousel className='w-full' opts={{duration: 13}}>
               <CarouselContent>{carouselItems}</CarouselContent>
               <CarouselNext ref={nextButtonRef} className="hidden" />
            </Carousel>
         </DialogContent>
      </Dialog>
   );
}

interface CardContentProps {
   icon: any;
   headline: ReactNode;
   subhead: string;
   imageUrl: string;
   isLastCard: boolean;
   page: string;
   order: number
}

const CardContent: React.FC<CardContentProps> = ({
   headline,
   imageUrl,
   icon: Icon,
   subhead,
   isLastCard,
   order,
   page
}) => {
   const { welcomeDialogState, setWelcomeDialogState } =
      useWelcomeDialogStore();
   const setVisited = useSetVisited();

   const handleClick = () => {
      if (isLastCard) {
         setVisited.mutate(welcomeDialogState.page);
         setWelcomeDialogState((prev) => {
            return { ...prev, isOpen: false };
         });
      }
   };

   const isLastHomePageCard = page === 'home' && order === 4

   const handleRepoClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      window.open('https://www.pinterest.com/search/pins/?q=welcome%20page&rs=typed', '_blank', 'noopener,noreferrer');
   }

   return (
      <div className="flex flex-col items-center w-full" onClick={handleClick}>
         <div className="flex flex-col gap-3 items-center">
            <Icon className="h-[60px] w-auto stroke-[1.3px] text-primary sm:h-[50px]" />
            <div className="flex flex-col gap-2">
               <div className={cn('text-[24px] sm:text-[20px] leading-tight')}>
                  {headline}
               </div>
               <p
                  className={cn(
                     'w-[380px] h-[60px] text-center leading-snug opacity-50 text-primary text-[13px] flex flex-col',
                     'sm:w-full sm:leading-tight'
                  )}
               >
                  {subhead}
                  {isLastHomePageCard && (
                     <span className="text-primary font-semibold underline cursor-pointer hover:opacity-100" onClick={handleRepoClick}>
                        Github Repo
                     </span>
                  )}
               </p>
            </div>
         </div>
         <div className="w-[450px] h-[270px] sm:h-[201px] sm:w-[336px] rounded-xl overflow-hidden flex justify-center items-center">
            <img src={imageUrl} className="object-cover w-full h-full" alt="" />
         </div>
      </div>
   );
};
