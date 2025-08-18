import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';
import { getBlankDemo, getFullDemo } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   ArrowUpLeft,
   ChevronDown,
   Download,
   Folder, Notebook,
   Users,
   Wallet
} from 'lucide-react';
import FreelanceMan1LineLogo from '@/components/shared/icons/FreelanceMan1Line';
import { cn } from '@/lib/helper/utils';
import { Enter } from '@/components/page-elements/welcome-page/icons/Enter';
import { Stack } from '@/components/page-elements/welcome-page/icons/Stack';
import { Layout } from '@/components/page-elements/welcome-page/icons/Layout';
import { Folder as WelcomePageFolder } from '@/components/page-elements/welcome-page/icons/Folder';
import { Wallet as WelcomePageWallet } from '@/components/page-elements/welcome-page/icons/Wallet';
import { GithubLogo } from '@/components/page-elements/welcome-page/icons/Github';
import { Google } from '@/components/page-elements/welcome-page/icons/Google';

const AuthPage: React.FC = () => {
   const navigate = useNavigate();
   const demoCardRef = useRef<HTMLDivElement | null>(null);
   const featureCardsRef = useRef<HTMLDivElement | null>(null);
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

   const handleLaunchDemo = () => {
      if (demoCardRef.current) {
         demoCardRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
         });
      }
   };
   
   const handleExploreFeature = () => {
      if (featureCardsRef.current) {
         featureCardsRef.current.scrollIntoView({
            behavior: 'smooth',
         });
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
                        {/* <button
                           onClick={(e) => e.currentTarget.focus()}
                           className={
                              'flex items-center text-md bg-primary h-[32px] text-foreground px-2 rounded-[10px] ' +
                              'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px]'
                           }
                        >
                           <Enter />
                           <p className="px-2">Launch Demo</p>
                        </button> */}
                     </div>
                     <div className="flex gap-[120px] h-fit pt-[50px] pb-[150px]">
                        <div className="flex flex-col justify-between pt-[55px]">
                           <div className="flex flex-col gap-[20px]">
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
                                 <p className="font-semibold">
                                    Solo Freelancers
                                 </p>
                              </div>
                              <p className="w-[500px] text-md text-primary/60">
                                 Working on multiple projects with multiple
                                 clients is not easy. Files, notes, and
                                 documents can quickly get out of control.
                                 FreelanceMan is here to help.
                              </p>
                              <button
                                 onClick={(e) => {e.currentTarget.focus(); handleLaunchDemo()}}
                                 className={
                                    'flex items-center text-md bg-primary h-[32px] text-foreground px-2 rounded-[10px] w-fit ' +
                                    'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px]'
                                 }
                              >
                                 <Enter />
                                 <p className="px-2">Launch Demo</p>
                              </button>
                           </div>
                           <button
                              onClick={handleExploreFeature}
                              className={
                                 'flex gap-1 text-md items-center w-fit pr-2 rounded-md ' +
                                 'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px] ring-offset-background'
                              }
                           >
                              <ChevronDown className="size-5" />
                              <p>Explore Features</p>
                           </button>
                        </div>
                        <img
                           className="rounded-[30px] shadow-lg h-[726px] w-[1231px]"
                           src="https://ik.imagekit.io/freelanceman/flm-landingpage/flm-hero.webp?updatedAt=1755241824596"
                        />
                     </div>

                     <div ref={featureCardsRef} className="w-full">
                        <div className="h-fit flex gap-[45px]">
                           <div className="flex-1 bg-foreground rounded-[23px] flex flex-col shadow-lg">
                              <div className=" p-4">
                                 <img
                                    className="rounded-[14px]"
                                    src="https://ik.imagekit.io/freelanceman/flm-landingpage/flm-layout.webp?updatedAt=1755491400438"
                                 />
                              </div>
                              <div className="flex flex-col px-8 pb-6 pt-4 justify-center gap-[10px]">
                                 <Stack />
                                 <div className="flex">
                                    <p className="leading-8 text-[27px] w-[240px] pt-1">
                                       Multi Projects <br /> & Clients
                                    </p>
                                    <p className="w-1/2 text-md grow opacity-40">
                                       Central hub to view and manage all your
                                       clients and projects in one place for
                                       easy access and tracking.
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="flex-1 bg-foreground rounded-[23px] flex flex-col shadow-lg">
                              <div className=" p-4">
                                 <img
                                    className="rounded-[14px]"
                                    src="https://ik.imagekit.io/freelanceman/flm-landingpage/flm-projectpage.webp?updatedAt=1755491164194"
                                 />
                              </div>
                              <div className="flex flex-col px-8 pb-6 pt-4 justify-center gap-[10px]">
                                 <Layout />
                                 <div className="flex">
                                    <p className="leading-8 text-[27px] w-[240px] pt-1">
                                       One Place That Keep It All
                                    </p>
                                    <p className="w-1/2 text-md grow opacity-40">
                                       Central hub to view and manage all your
                                       clients and projects in one place for
                                       easy access and tracking.
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="h-fit flex gap-[45px] pt-[45px]">
                           <div className="flex-1 bg-foreground rounded-[23px] flex flex-col shadow-lg">
                              <div className=" p-4">
                                 <img
                                    className="rounded-[14px]"
                                    src="https://ik.imagekit.io/freelanceman/flm-landingpage/flm-files.webp?updatedAt=1755491164047"
                                 />
                              </div>
                              <div className="flex flex-col px-8 pb-6 pt-4 justify-center gap-[10px]">
                                 <WelcomePageFolder />
                                 <div className="flex">
                                    <p className="leading-8 text-[27px] w-[240px] pt-1">
                                       Your Files <br /> Your Way
                                    </p>
                                    <p className="w-1/2 text-md grow opacity-40">
                                       Central hub to view and manage all your
                                       clients and projects in one place for
                                       easy access and tracking.
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="flex-1 bg-foreground rounded-[23px] flex flex-col shadow-lg">
                              <div className=" p-4">
                                 <img
                                    className="rounded-[14px]"
                                    src="https://ik.imagekit.io/freelanceman/flm-landingpage/flm-pdf.webp?updatedAt=1755491164204"
                                 />
                              </div>
                              <div className="flex flex-col px-8 pb-6 pt-4 justify-center gap-[10px]">
                                 <WelcomePageWallet />
                                 <div className="flex">
                                    <p className="leading-8 text-[27px] w-[240px] pt-1">
                                       Work Hard <br /> Paid Faster
                                    </p>
                                    <p className="w-1/2 text-md grow opacity-40">
                                       Central hub to view and manage all your
                                       clients and projects in one place for
                                       easy access and tracking.
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="py-[150px]">
                           <div className="flex justify-between items-center pb-3">
                              <p className="text-[35px] font-light">Tech Stack</p>
                              <button
                                 className={
                                    'flex items-center text-md bg-primary h-[32px] text-foreground px-3 gap-2 rounded-[10px] ' +
                                    'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px]'
                                 }
                                 onClick={(e) => e.currentTarget.focus()}
                              >
                                 <GithubLogo className="size-[20px]" />
                                 <span className="text-[18px]">
                                    See The Code
                                 </span>
                              </button>
                           </div>
                           <div className="flex gap-[23px]">
                              <div className="flex-1 border border-primary/50 rounded-xl h-auto overflow-hidden">
                                 <p className="px-3 py-1 text-md text-primary/50 bg-primary/5">
                                    Client
                                 </p>
                                 <div className="border-b border-primary/50" />
                                 <div className="flex flex-col gap-3 px-5 pt-3 py-4">
                                    <div className="leading-tight">
                                       <p className="text-[30px] font-medium">React.js</p>
                                       <p className="text-primary/50">
                                          (Vite, client side only)
                                       </p>
                                    </div>
                                    <div className="border-b border-b-primary/50" />
                                    <div>
                                       <p className="font-semibold">
                                          Libraries:{' '}
                                       </p>
                                       <p>
                                          Shadcn (Radix UI), React Query,
                                          Zustand, Tailwind, Sonner, React Day
                                          Picker
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex-1 border border-primary/50 rounded-xl h-auto overflow-hidden">
                                 <p className="px-3 py-1 text-md text-primary/50 bg-primary/5">
                                    Server
                                 </p>
                                 <div className="border-b border-primary/50" />
                                 <div className="flex flex-col gap-3 px-5 pt-3 py-4">
                                    <div className="leading-tight">
                                       <p className="text-[30px] font-medium">Nest.js</p>
                                       <p className="text-primary/50">
                                          (REST API)
                                       </p>
                                    </div>
                                    <div className="border-b border-b-primary/50" />
                                    <div>
                                       <p className="font-semibold">
                                          Libraries:{' '}
                                       </p>
                                       <p>
                                          Zod, Puppeteer, Passport, Luxon, Jest,
                                          Prisma
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex-1 border border-primary/50 rounded-xl h-auto overflow-hidden">
                                 <p className="px-3 py-1 text-md text-primary/50 bg-primary/5">
                                    Client
                                 </p>
                                 <div className="border-b border-primary/50" />
                                 <div className="flex flex-col gap-3 px-5 pt-3 py-4">
                                    <div className="leading-tight">
                                       <p className="text-[30px] font-medium">AWS</p>
                                       <p className="text-primary/50">
                                          (Amazon Web Service)
                                       </p>
                                    </div>
                                    <div className="border-b border-b-primary/50" />
                                    <div>
                                       <p className="font-semibold">
                                          Services:{' '}
                                       </p>
                                       <p>
                                          EC2 for server, S3 for file storage,
                                          RDS (PostgreSQL) for database
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="border-b border-primary/50" />
                        <div className="flex flex-col items-center py-[80px]">
                           <div
                              ref={demoCardRef}
                              className="w-[400px] h-[560px] bg-foreground rounded-[17px] flex flex-col justify-between p-4 px-5 shadow-lg"
                           >
                              <div className="flex flex-col">
                                 <div className="pl-2 pb-5">
                                    <SvgFreelancemanIcon className="size-[75px]" />
                                    <p className="text-[28px] leading-tight">
                                       Launch Demo
                                    </p>
                                 </div>
                                 <div className="flex gap-2">
                                    <button
                                       onClick={(e) => {
                                          e.currentTarget.focus();
                                          handleGetFullDemo();
                                       }}
                                       className={
                                          'flex flex-col flex-1 text-md bg-primary text-foreground px-2 py-1 rounded-[11px]  ' +
                                          'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px]'
                                       }
                                    >
                                       <Enter />
                                       <p className="text-left">Full Version</p>
                                    </button>
                                    <button
                                       onClick={(e) => {
                                          e.currentTarget.focus();
                                          handleGetBlankDemo();
                                       }}
                                       className={
                                          'flex flex-col flex-1 text-md bg-transparent text-primary border border-secondary px-2 py-1 rounded-[10px] ' +
                                          'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px]'
                                       }
                                    >
                                       <Enter />
                                       <p className="text-left">
                                          Blank Version
                                       </p>
                                    </button>
                                 </div>
                                 <div className="border-b border-b-primary/20 mt-[25px] mb-[18px]" />
                                 <p className="pl-2 pb-2 text-[15px]">
                                    Try Authentication
                                 </p>
                                 <button
                                    onClick={(e) => {
                                       e.currentTarget.focus();
                                       handleGoogleOAuthLogin();
                                    }}
                                    className={
                                       'flex items-center text-md bg-transparent h-[32px] text-primary border border-secondary px-2 rounded-[11px] ' +
                                       'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px]'
                                    }
                                 >
                                    <Google className="size-[16px]" />
                                    <p className="px-2">Sign In With Google</p>
                                 </button>
                              </div>
                              <div className="text-sm opacity-40">
                                 <p className="font-semibold">Disclaimers:</p>
                                 <p className="pb-4">
                                    Each demo session is personal. Users are
                                    free to explore features, create tasks, edit
                                    contacts, upload files, or delete content
                                    during their session.
                                 </p>
                                 <p className="font-semibold">
                                    All data (including user data created via
                                    Google sign-in) will be automatically
                                    deleted 1 hour after creation.
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className="flex justify-between items-center px-6 rounded-tr-[20px] rounded-tl-[20px] w-full h-[33px] bg-primary mt-[60px] text-foreground">
                           <button className="flex gap-1 items-center">
                              <ArrowUpLeft className="size-5" />
                              <p>See More Of My Portfolio Projects</p>
                           </button>
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
