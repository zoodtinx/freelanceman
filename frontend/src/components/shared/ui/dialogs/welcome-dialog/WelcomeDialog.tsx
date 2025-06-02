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
import { useSetVisited, useUserQuery } from '@/lib/api/user-api';
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
               'rounded-3xl bg-foreground outline-none max-w-[490px] group cursor-pointer',
               'flex flex-col items-center px-5 py-5 pt-8 select-none',
               'lg:w-[487px] h-fit'
            )}
         >
            <Carousel className="w-full">
               <CarouselContent>{carouselItems}</CarouselContent>
               <CarouselNext ref={nextButtonRef} className="hidden" />
            </Carousel>
         </DialogContent>
      </Dialog>
   );
}

export interface CardContentProps {
   icon: any;
   headline: ReactNode;
   subhead: string;
   imageUrl: string;
   isLastCard: boolean;
}

const CardContent: React.FC<CardContentProps> = ({
   headline,
   imageUrl,
   icon: Icon,
   subhead,
   isLastCard,
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

   return (
      <div className="w-full" onClick={handleClick}>
         <div className="flex flex-col gap-3 items-center">
            <Icon className="h-[49px] w-auto stroke-[1.3px] text-secondary" />
            <div className="flex flex-col gap-1">
               <div className={cn('text-[24px] leading-tight')}>{headline}</div>
               <p
                  className={cn(
                     'w-[380px] h-[60px] text-center leading-snug text-secondary text-[13px]'
                  )}
               >
                  {subhead}
               </p>
            </div>
         </div>
         <div className="w-full h-[270px] rounded-xl overflow-hidden flex justify-center items-center">
            <img src={imageUrl} className="object-cover w-full h-full" alt="" />
         </div>
         {/* <div className="w-full py-4 flex justify-center">
            {isLastCard ? (
               <CircleX className="text-secondary group-hover:text-primary transition-colors" />
            ) : (
               <CircleChevronRight className="text-secondary group-hover:text-primary transition-colors" />
            )}
         </div> */}
      </div>
   );
};
