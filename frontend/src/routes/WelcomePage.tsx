import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';
import { Button } from '@/components/shared/ui/primitives/Button';
import { getBlankDemo, getFullDemo } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Gamepad2, KeyRound } from 'lucide-react';
import FreelanceMan1LineLogo from '@/components/shared/icons/FreelanceMan1Line';
import { cn } from '@/lib/helper/utils';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';

const AuthPage: React.FC = () => {
   const navigate = useNavigate();
   const setAccessToken = useAuthStore((state) => state.setAccessToken);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);

   const handleGetFullDemo = async () => {
      setIsError(false);
      setIsLoading(true);
      const result = await getFullDemo();
      console.log('result', result);
      if (result && result.success) {
         setAccessToken(result.data.accessToken);
         navigate('/home/projects');
      } else if (!result || !result.success) {
         setIsError(true);
      }
      setIsLoading(false);
   };

   const handleGetBlankDemo = async () => {
      const result = await getBlankDemo();
      console.log('result', result);
      if (result && result.success) {
         setAccessToken(result.data.accessToken);
         navigate('/home/projects');
      } else if (!result || !result.success) {
         setIsError(true);
      }
   };

   // redirect to google auth login page
   const handleGoogleOAuthLogin = () => {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
   };

   if (isLoading) {
      return (
         <div
            style={{ height: 'calc(var(--vh) * 100)' }}
            className="w-screen min-h-screen flex flex-col justify-center items-center bg-background gap-5"
         >
            <SvgFreelancemanIcon className="animate-bounce h-24 w-auto" />
         </div>
      );
   }

   // background elements
   const PlaceholderBox = () => (
      <div className="border border-primary opacity-10 border-dashed rounded-[20px] max-w-[400px] h-[205px]"></div>
   );
   const placeholders = [...Array(80)].map(() => <PlaceholderBox />);

   return (
      <div
         style={{ height: 'calc(var(--vh) * 100)' }}
         className="flex bg-background w-full h-screen items-center flex-col relative overflow-hidden"
      >
         <div className="h-screen w-full overflow-y-auto z-10 flex flex-col items-center">
            <div className="flex flex-col items-center z-10 w-[1024px] h-screen justify-center shrink-0">
               <div className="flex gap-4 flex-col rounded-2xl justify-center items-center border-primary pb-7 sm:w-full sm:h-auto sm:pb-6 sm:gap-2">
                  <div className="flex flex-col justify-center items-center text-primary gap-5 sm:gap-3">
                     <SvgFreelancemanIcon className="w-[170px] sm:w-[90px]" />
                     <FreelanceMan1LineLogo className="w-[430px] sm:w-[270px]" />
                  </div>
               </div>
               <div className='border-b w-[250px] mb-5' />
               <div className="flex flex-col items-center leading-tight text-[30px]">
                  <p>A Productivity Platform</p>
                  <p>for Freelancers</p>
               </div>
               <div>

               </div>
            </div>
            <div className="flex flex-col items-center z-10 w-[1024px] h-screen justify-center shrink-0">
               <div className="flex gap-4 flex-col rounded-2xl justify-center items-center border-primary pb-7 sm:w-full sm:h-auto sm:pb-6 sm:gap-2">
                  <div className="flex flex-col justify-center items-center text-primary gap-5 sm:gap-3">
                     <SvgFreelancemanIcon className="w-[170px] sm:w-[90px]" />
                     <FreelanceMan1LineLogo className="w-[430px] sm:w-[270px]" />
                  </div>
               </div>
               <div className="flex flex-col items-center leading-tight text-[30px]">
                  <p>A Productivity Platform</p>
                  <p>for Freelancers</p>
               </div>
            </div>
         </div>
         {/* <div className='flex flex-col'>
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
                        onClick={handleGoogleOAuthLogin}
                        className="w-full"
                        variant="outline"
                     >
                        Sign In with Google
                     </Button>
                  </div>
               </div>
               {isError && (
                  <div
                     className={cn(
                        'p-4 text-general-red',
                        'animate-shake visible'
                     )}
                  >
                     Unexpected error, please try again
                  </div>
               )}
            </div> */}
         <div className="w-screen h-screen absolute overflow-hidden flex justify-center items-center">
            <div
               className={cn(
                  'grid',
                  'absolute',
                  'gap-4',
                  'w-[calc(100vw+100px)]',
                  'grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
                  'sm:grid-cols-[repeat(2,minmax(0,1fr))]',
                  'md:grid-cols-[repeat(4,minmax(0,1fr))]'
               )}
            >
               {placeholders}
            </div>
         </div>
      </div>
   );
};

export default AuthPage;
