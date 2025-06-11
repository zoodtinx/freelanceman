import React from 'react';
import { useNavigate } from 'react-router-dom';
import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';
import { Button } from '@/components/shared/ui/primitives/Button';
import { getBlankDemo, getFullDemo } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Gamepad2, KeyRound, Lightbulb, SquarePlay } from 'lucide-react';

const AuthPage: React.FC = () => {
   const navigate = useNavigate();
   const setAccessToken = useAuthStore((state) => state.setAccessToken);

   const handleGoogleSignup = () => {
      console.log('Google Sign-up triggered');
   };

   const handleGetFullDemo = async () => {
      const result = await getFullDemo();
      console.log('result', result);
      if (result.success) {
         setAccessToken(result.data.accessToken);
         navigate('/home/projects');
      } else {
         alert('Boo');
      }
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

   const handleNavigate = (page: 'register' | 'login') => {
      navigate(`../${page}`);
   };

   return (
      <div className="flex bg-background w-full h-screen items-center justify-center p-8 flex-col">
         <div className="flex gap-3 flex-col rounded-2xl justify-center items-center border-primary pb-7 sm:w-full sm:h-auto sm:pb-6 sm:gap-3">
            <div className="flex flex-col justify-center items-center w-1/2 text-primary gap-2">
               <SvgFreelancemanIcon className="w-[120px] sm:w-[90px] shrink-0" />
            </div>
            <div className="flex flex-col items-center gap-4">
               <div className="flex flex-col items-center">
                  <p className="text-[30px] sm:text-[28px]">
                     This is{' '}
                     <span className="font-semibold">FreelanceMan.</span>
                  </p>
                  <p className="text-md sm:text-base">Where freelancing meets flow.</p>
               </div>
            </div>
         </div>
         <div className="flex flex-col w-[300px] bg-foreground p-4 pt-3 rounded-xl mb-6">
            <div className="flex flex-col w-full items-start gap-1 pb-4">
               <div className='flex w-full gap-1 justify-start'>
                  <Gamepad2 className='w-4 h-auto' />
                  <p className="text-base font-medium">Try Demo</p>
               </div>
               <Separator className='bg-tertiary' />
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
               <div className='flex w-full gap-1 justify-start'>
                  <KeyRound className='w-4 h-auto' />
                  <p className="text-base font-medium">Get Access</p>
               </div>
               <Separator className='bg-tertiary' />
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
   );
};

export default AuthPage;
