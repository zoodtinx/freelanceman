import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';
import { Button } from '@/components/shared/ui/primitives/Button';
import { getBlankDemo, getFullDemo } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Gamepad2, KeyRound } from 'lucide-react';
import FreelanceMan1LineLogo from '@/components/shared/icons/FreelanceMan1Line';

const AuthPage: React.FC = () => {
   const navigate = useNavigate();
   const setAccessToken = useAuthStore((state) => state.setAccessToken);
   const [isLoading, setIsLoading] = useState(false);

   const handleGetFullDemo = async () => {
      setIsLoading(true);
      const result = await getFullDemo();
      console.log('result', result);
      if (result.success) {
         setAccessToken(result.data.accessToken);
         navigate('/home/projects');
      } else {
         alert('Boo');
      }
      setIsLoading(false);
   };

   const handleGetBlankDemo = async () => {
      const result = await getBlankDemo();
      console.log('result', result);
      if (result.success) {
         setAccessToken(result.data.accessToken);
         navigate('/home/projects');
      } else {
         alert('Boo');
      }
   };

   if (isLoading) {
      return (
         <div className="w-screen h-screen flex flex-col justify-center items-center bg-background gap-5">
            <SvgFreelancemanIcon className="animate-bounce h-24 w-auto" />
            <div className="text-md text-center flex flex-col gap-1">
               <QuirkyLoader />
               <div className="leading-snug">
                  <p className="text-base">
                     Preparing demo, this may take a moment.
                  </p>
               </div>
            </div>
         </div>
      );
   }

   const PlaceholderBox = () => (
      <div className="border border-primary opacity-10 border-dashed rounded-[20px] max-w-[400px] h-[205px]"></div>
   );

   const placeholders = [...Array(80)].map(() => <PlaceholderBox />);

   return (
      <div className="flex bg-background w-full h-screen items-center justify-center flex-col relative overflow-hidden p-4">
         <div className="flex flex-col items-center z-10">
            <div className="flex gap-4 flex-col rounded-2xl justify-center items-center border-primary pb-7 sm:w-full sm:h-auto sm:pb-6 sm:gap-2">
               <div className="flex flex-col justify-center items-center text-primary gap-5 sm:gap-3">
                  <SvgFreelancemanIcon className="w-[170px] sm:w-[90px]" />
                  <FreelanceMan1LineLogo className="w-[430px] sm:w-[270px]" />
               </div>
               <div className="flex flex-col items-center text-[17px] sm:text-base leading-normal">
                  <p>A work platform for messy freelancers.</p>
               </div>
            </div>
            <div className="flex flex-col w-[300px] bg-foreground p-4 pt-3 rounded-xl mb-6">
               <div className="flex flex-col w-full items-start gap-1 pb-4">
                  <div className="flex w-full gap-1 justify-start">
                     <Gamepad2 className="w-4 h-auto" />
                     <p className="text-base font-medium">Try Demo</p>
                  </div>
                  <Separator className="bg-tertiary" />
               </div>
               <div className="flex flex-col gap-1">
                  <Button onClick={handleGetFullDemo} className="w-full">
                     With Sample Projects
                  </Button>
                  <Button
                     onClick={handleGetBlankDemo}
                     className="w-full"
                     variant="outline"
                  >
                     Clean Slate
                  </Button>
               </div>
            </div>
            <div className="flex flex-col w-[300px] bg-foreground p-4 pt-3 rounded-xl sm:mb-4">
               <div className="flex flex-col w-full items-start gap-1 pb-4">
                  <div className="flex w-full gap-1 justify-start">
                     <KeyRound className="w-4 h-auto" />
                     <p className="text-base font-medium">Get Access</p>
                  </div>
                  <Separator className="bg-tertiary" />
               </div>
               <div className="flex flex-col gap-[6px]">
                  <Button
                     onClick={handleGetBlankDemo}
                     className="w-full"
                     variant="outline"
                  >
                     Sign In with Google
                  </Button>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-[repeat(4,minmax(0,1fr))] absolute gap-4 w-[calc(100vw+100px)] 5-[calc(100vw+100px)] sm:grid-cols-[repeat(2,minmax(0,1fr))]">
            {placeholders}
         </div>
      </div>
   );
};

const QuirkyLoader = () => {
   const [index, setIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setIndex((i) => (i + 1) % phrases.length);
      }, 2500);
      return () => clearInterval(interval);
   }, []);

   return <div className="text-xl text-center">{phrases[index]}</div>;
};

const phrases = [
   'Installing work vibes',
   'Mixing creative potions',
   'Downloading inspiration',
   'Brewing focus juice',
   'Charging productivity cells',
   'Crafting code spells',
   'Aligning brainwaves',
   'Syncing genius mode',
   'Warming up hustle engines',
   'Calibrating motivation levels',
   'Uploading bright ideas',
   'Stirring creative juices',
   'Powering up problem solvers',
   'Loading laser focus',
   'Energizing passion cores',
   'Amplifying work rhythm',
   'Igniting innovation spark',
   'Boosting mental horsepower',

   'Installing productivity modules',
   'Downloading creative energy',
   'Syncing motivation levels',
   'Buffering brilliant ideas',
   'Loading workspace vibes',
   'Compiling inspiration data',
   'Initializing focus mode',
   'Uploading determination',
   'Processing breakthrough moments',
   'Calibrating goals',
   'Executing ambition.exe',
   'Importing hustle libraries',
   'Debugging procrastination',
   'Compressing overwhelm',

   'Mixing creative potions',
   'Brewing fresh ideas',
   'Stirring up innovation',
   'Blending productivity magic',
   'Crafting the perfect workflow',
   'Sketching possibilities',
   'Weaving dreams into reality',
   'Molding masterpieces',
   'Composing victory symphonies',
   'Architecting achievements',
   'Cooking up breakthroughs',

   'Fueling ambition engines',
   'Charging confidence batteries',
   'Powering up potential',
   'Igniting passion protocols',
   'Activating hustle mode',
   'Launching dream sequences',
   'Deploying determination',
   'Building momentum',
   'Assembling achievement unlocked',
   'Unleashing inner champion',
   'Manifesting excellence',
   'Generating winning streaks',
   'Summoning productivity spirits',

   'Setting up the grind',
   'Preparing the hustle zone',
   'Organizing brilliant chaos',
   'Fine-tuning productivity settings',
   'Adjusting inspiration levels',
   'Warming up creative circuits',
   'Polishing professional prowess',
   'Sharpening focus tools',
   'Optimizing work flow state',
   'Calibrating goal compass',
   'Tuning achievement frequency',
   'Preparing victory formation',
   'Establishing excellence baseline',

   'Channeling productive energy',
   'Harnessing creative lightning',
   'Collecting motivation crystals',
   'Gathering inspiration fragments',
   'Storing determination units',
   'Harvesting focus particles',
   'Capturing brilliant moments',
   'Extracting pure ambition',
   'Concentrating hustle essence',

   'Plotting achievement routes',
   'Navigating to greatness',
   'Charting productivity course',
   'Tracking progress metrics',
   'Calculating victory probability',
   'Measuring inspiration levels',
   'Evaluating hustle intensity',
   'Assessing creativity quotient',
   'Monitoring excellence indicators',

   'Transforming dreams to plans',
   'Converting ideas to action',
   'Upgrading mindset software',
   'Evolving productivity skills',
   'Leveling up work game',
   'Enhancing creative abilities',
   'Boosting performance metrics',
   'Refining excellence standards',
   'Perfecting hustle techniques',
];

export default AuthPage;
