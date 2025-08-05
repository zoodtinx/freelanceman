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
import { welcomeDialogContent } from '@/components/shared/ui/dialogs/welcome-dialog/DialogContents';
import { X } from 'lucide-react';

export function GreetingDialog() {
   const { welcomeDialogState } = useWelcomeDialogStore();

   const nextButtonRef = useRef<HTMLButtonElement | null>(null);
   const contentRef = useRef<HTMLDivElement | null>(null);

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
               'flex flex-col items-center select-none',
               'lg:w-[487px] h-fit',
               'sm:w-[360px] sm:rounded-2xl'
            )}
         >
            <Carousel className="w-full" opts={{ duration: 13 }}>
               <CarouselContent ref={contentRef}>
                  {carouselItems}
               </CarouselContent>
               <CarouselNext ref={nextButtonRef} className="hidden" />
               <X className="text-primary absolute top-4 right-4 w-5 h-5 pointer-events-none" />
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
   order: number;
}

const CardContent: React.FC<CardContentProps> = ({
   headline,
   imageUrl,
   icon: Icon,
   subhead,
   isLastCard,
   order,
   page,
}) => {
   const { setWelcomeDialogState } = useWelcomeDialogStore();

   const handleClick = () => {
      if (!isLastCard) return;

      localStorage.setItem(page, 'visited');
      setWelcomeDialogState((prev) => ({ ...prev, isOpen: false }));
   };

   const isLastHomePageCard = page === 'home' && order === 4;

   const handleRepoClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      window.open(
         'https://github.com/zoodtinx/freelanceman',
         '_blank',
         'noopener,noreferrer'
      );
   };

   return (
      <div
         className="flex flex-col items-center w-full px-4 py-5 pt-8 sm:min-w-[360px] sm:h-fit sm:p-3 sm:pt-7"
         onClick={handleClick}
      >
         <div className="flex flex-col gap-3 items-center">
            <Icon className="h-[60px] w-auto stroke-[1.3px] text-primary sm:h-[50px]" />
            <div className="flex flex-col gap-2">
               <div className={cn('text-[24px] sm:text-[20px] leading-tight')}>
                  {headline}
               </div>
               <p
                  className={cn(
                     'w-[380px] h-[60px] text-center leading-snug opacity-50 text-primary text-[13px] flex flex-col items-center',
                     'sm:w-full sm:leading-tight sm:h-[67px]'
                  )}
               >
                  {subhead}
                  {isLastHomePageCard && (
                     <span
                        className="text-primary font-semibold underline cursor-pointer hover:opacity-100 w-fit"
                        onClick={handleRepoClick}
                     >
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
