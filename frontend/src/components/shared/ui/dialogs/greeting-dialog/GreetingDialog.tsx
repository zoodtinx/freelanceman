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
import {
   CircleChevronRight,
   FireExtinguisher,
   SatelliteDish,
   CircleX,
   FileSpreadsheet,
} from 'lucide-react';
import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';
import React, { ReactNode, useRef } from 'react';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';

export function GreetingDialog() {
   const { welcomeDialogState } =
      useWelcomeDialogStore();

   const nextButtonRef = useRef<HTMLButtonElement | null>(null);

   const handleClick = () => {
      if (nextButtonRef.current) nextButtonRef.current.click();
   };

   const carouselItems = contents.map((content, index, array) => {
      const isLastCard = index === array.length - 1;
      return (
         <CarouselItem>
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
               'flex flex-col items-center px-5 pt-8 select-none',
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
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   const handleClick = () => {
      if (isLastCard) setWelcomeDialogState((prev) => {return {...prev, isOpen : false}})
   }

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
         <div className="w-full py-4 flex justify-center">
            {isLastCard ? (
               <CircleX className="text-secondary group-hover:text-primary transition-colors" />
            ) : (
               <CircleChevronRight className="text-secondary group-hover:text-primary transition-colors" />
            )}
         </div>
      </div>
   );
};

const contents = [
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center">Greetings, welcome to</p>
            <p className="text-center">
               <span className="font-semibold">FreelanceMan</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'Built for solo freelancers to manage tasks, clients, and documents. Work smarter, skip the clutter.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
   {
      icon: FileSpreadsheet,
      headline: (
         <React.Fragment>
            <p className="text-center">All a freelancer need</p>
            <p className="text-center">
               <span className="font-semibold">right here</span>.
            </p>
         </React.Fragment>
      ),
      subhead:
         'Built for solo freelancers to manage tasks, clients, and documents. Work smarter, skip the clutter.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
   {
      icon: FireExtinguisher,
      headline: (
         <React.Fragment>
            <p className="text-center">Work On Every Devices</p>
            <p className="text-center">
               with <span className="font-semibold">Responsive Design</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'Stay productive on any device with a design that adapts to your workflow, wherever you are.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508633/file/original-d4697c30f104727ac37fe3ba5b314eb9.png?resize=2048x1536&vertical=center',
   },
   {
      icon: SatelliteDish,
      headline: (
         <React.Fragment>
            <p className="text-center">Full Stack Transparency,</p>
            <p className="text-center font-semibold">See Every Line of Code</p>
         </React.Fragment>
      ),
      subhead: 'Built with React, NestJS, Prisma & more View on GitHub',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508908/file/original-6621a7ae9181c659b3e7c0df1299b7c3.png?resize=2048x1280&vertical=center',
   },
];
