import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';
import { Button } from '@/components/shared/ui/primitives/Button';
import { getBlankDemo, getFullDemo } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import {
   Download,
   Folder,
   Gamepad2,
   KeyRound,
   Notebook,
   Users,
   Wallet,
} from 'lucide-react';
import FreelanceMan1LineLogo from '@/components/shared/icons/FreelanceMan1Line';
import { cn } from '@/lib/helper/utils';
import {
   ScrollArea,
   ScrollBar,
} from '@/components/shared/ui/primitives/ScrollArea';
import { Enter } from '@/components/page-elements/welcome-page/icons/Enter';
import { Stack } from '@/components/page-elements/welcome-page/icons/Stack';

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
      <>
         <div className="w-full h-screen absolute z-20">
            <div className="w-full h-full">
               {/* <ScrollBar /> */}
               <div className="w-full h-full flex flex-col items-center pt-[61px] overflow-y-auto overflow-x-hidden">
                  <div className="w-[1200px]">
                     <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                           <SvgFreelancemanIcon className="h-auto w-[70px]" />
                           <FreelanceMan1LineLogo className="h-auto w-[215px]" />
                        </div>
                        <button
                           onClick={(e) => e.currentTarget.focus()}
                           className={
                              'flex items-center text-md bg-primary h-[32px] text-foreground px-2 rounded-[10px] ' +
                              'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px]'
                           }
                        >
                           <Enter />
                           <p className="px-2">Launch Demo</p>
                        </button>
                     </div>
                     <div className="flex gap-[120px] h-fit pt-[50px] pb-[100px]">
                        <div className="flex flex-col gap-[20px] pt-[75px]">
                           <div className="flex gap-[13px]">
                              <Users className="size-[30px] text-secondary" />
                              <Folder className="size-[30px] text-secondary" />
                              <Wallet className="size-[30px] text-secondary" />
                              <Notebook className="size-[30px] text-secondary" />
                              <Download className="size-[30px] text-secondary" />
                           </div>
                           <div className="text-[53px] leading-[63px]">
                              <p className="font-light">A Workspace</p>
                              <p className="font-semibold">Built For</p>
                              <p className="font-semibold">Solo Freelancers</p>
                           </div>
                           <p className="w-[500px] text-md text-primary/60">
                              Working on multiple projects with multiple clients
                              is not easy. Files, notes, and documents can
                              quickly get out of control. FreelanceMan is here
                              to help.
                           </p>
                        </div>
                        <img
                           className="rounded-[30px] shadow-lg h-[726px] w-[1231px]"
                           src="https://ik.imagekit.io/freelanceman/flm-landingpage/flm-hero.webp?updatedAt=1755241824596"
                        />
                     </div>
                     {/* <div className="w-[100px] h-[2000px] bg-black" /> */}
                     <div className="w-full">
                        <div className="h-fit flex gap-[38px]">
                           <div className="flex-1 bg-foreground rounded-[30px] flex flex-col">
                              <div className=" p-4">
                                 <img src="https://ik.imagekit.io/freelanceman/flm-landingpage/flm-feat-1.webp?updatedAt=1755249035741" />
                              </div>
                              <div className="flex flex-col px-8 pb-8 pt-4 justify-center gap-[10px]">
                                 <Stack />
                                 <div className="flex">
                                    <p className="leading-9 text-[30px] w-[240px]">
                                       Multi Projects <br /> & Clients
                                    </p>
                                    <p className="w-1/2 text-md grow">
                                       Central hub to view and manage all your
                                       clients and projects in one place for
                                       easy access and tracking.
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="flex-1 bg-foreground rounded-[30px] flex flex-col"></div>
                        </div>
                        <div className="h-[540px] flex gap-[38px] pt-[30px]">
                        <div className="flex-1 bg-foreground rounded-[30px] flex flex-col"></div>
                        <div className="flex-1 bg-foreground rounded-[30px] flex flex-col"></div>
                        </div>
                        <div className="flex justify-between items-center px-6 rounded-tr-[20px] rounded-tl-[20px] w-full h-[33px] bg-primary mt-[60px] text-foreground">
                           <p>See More Of My Portfolio Projects</p>
                           <p>© 2025 Peerapol Glaajing, All Rights Reserved.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="w-screen h-screen bg-gradient-to-b from-foreground via-background to-background absolute overflow-hidden flex justify-center items-center">
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
      </>
   );
};

export default AuthPage;
