import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';
import { getBlankDemo, getFullDemo } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   ArrowUpLeft,
   ChevronDown,
   Download,
   Folder,
   Notebook,
   Users,
   Wallet,
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
import { LoadingPage } from '@/routes/LoadingPage';

const AuthPage: React.FC = () => {
   const navigate = useNavigate();
   const demoCardRef = useRef<HTMLDivElement | null>(null);
   const featureCardsRef = useRef<HTMLDivElement | null>(null);
   const setAccessToken = useAuthStore((state) => state.setAccessToken);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);

   console.log(isError)

   const handleGetFullDemo = async () => {
      setIsError(false);
      setIsLoading(true);
      const result = await getFullDemo();

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
         <LoadingPage />
      );
   }
   const PlaceholderBox = () => (
      <div className="border border-primary opacity-10 border-dashed rounded-[20px] max-w-[400px] h-[205px]"></div>
   );
   const placeholders = [...Array(80)].map((_, i) => (
      <PlaceholderBox key={i} />
   ));

   return (
      <>
         <div className="w-full h-screen absolute z-20">
            <div className="w-full h-full">
               {/* <ScrollBar /> */}
               <div className="w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden">
                  <div className="sm:w-screen sm:px-4 md:px-6 lg:w-[1200px] lg:px-0 flex flex-col">
                     <div className="h-screen flex flex-col justify-between sm:gap-3 lg:gap-9">
                        <div
                           className={
                              'flex justify-between items-center ' +
                              'sm:pt-[20px] ' +
                              'md:pt-[20px] ' +
                              'lg:pt-[61px] lg:px-0 '
                           }
                        >
                           <div className="flex gap-2 lg:gap-4">
                              <SvgFreelancemanIcon className="h-auto w-[40px] lg:w-[70px]" />
                              <FreelanceMan1LineLogo className="h-auto w-[150px] lg:w-[215px]" />
                           </div>
                        </div>
                        <div className="flex items-center">
                           <div className="flex sm:flex-col lg:flex-row sm:gap-5 md:gap-[100px] lg:gap-[120px] lg:px-0">
                              <div className="flex flex-col sm:gap-[7px] md:gap-[10px] lg:gap-[20px] sm:px-2">
                                 <div className="flex gap-[8px] lg:gap-[13px]">
                                    <Users className="sm:size-[20px] lg:size-[30px] text-secondary" />
                                    <Folder className="sm:size-[20px] lg:size-[30px] text-secondary" />
                                    <Wallet className="sm:size-[20px] lg:size-[30px] text-secondary" />
                                    <Notebook className="sm:size-[20px] lg:size-[30px] text-secondary" />
                                    <Download className="sm:size-[20px] lg:size-[30px] text-secondary" />
                                 </div>
                                 <div className="sm:text-[30px] md:text-[37px] leading-tight lg:text-[53px] lg:leading-[63px]">
                                    <p className="font-light">A Workspace</p>
                                    <p className="font-semibold">Built For</p>
                                    <p className="font-semibold">
                                       Solo Freelancers
                                    </p>
                                 </div>
                                 <p className="sm:w-full mb-3 md:w-[400px] lg:w-[500px] lg:mb-0 pr-5 text-md text-primary/60">
                                    Working on multiple projects with multiple
                                    clients is not easy. Files, notes, and
                                    documents can quickly get out of control.
                                    FreelanceMan is here to help.
                                 </p>
                                 <button
                                    onClick={(e) => {
                                       e.currentTarget.focus();
                                       handleLaunchDemo();
                                    }}
                                    className={
                                       'flex items-center text-md bg-primary h-[32px] text-foreground px-2 rounded-[10px] w-fit ' +
                                       'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px]'
                                    }
                                 >
                                    <Enter />
                                    <p className="px-2">Launch Demo</p>
                                 </button>
                              </div>
                              <img
                                 className="sm:rounded-[7px] md:rounded-[15px] lg:rounded-[30px] shadow-lg sm:w-full sm:h-auto lg:h-[726px] lg:w-[1231px] animate-slide-in-right"
                                 src="https://ik.imagekit.io/freelanceman/flm-landingpage/flm-hero.webp?updatedAt=1756096497036"
                              />
                           </div>
                        </div>
                        <button
                           onClick={handleExploreFeature}
                           className={
                              'flex gap-1 text-md items-center w-fit pr-2 rounded-md mb-3 lg:mb-[25px] ' +
                              'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px] ring-offset-background'
                           }
                        >
                           <ChevronDown className="size-5" />
                           <p>Explore Features</p>
                        </button>
                     </div>

                     <div
                        ref={featureCardsRef}
                        className="w-full pt-5 lg:pt-11"
                     >
                        <div className="h-fit flex lg:flex-row sm:flex-col md:gap-[20px] lg:gap-[45px] sm:gap-5 lg:pb-10 pb-5">
                           <FeatureContainer feature={featuresConfig[0]} />
                           <FeatureContainer feature={featuresConfig[1]} />
                        </div>
                        <div className="h-fit flex lg:flex-row sm:flex-col md:gap-[20px] lg:gap-[45px] sm:gap-5 lg:pb-0 ">
                           <FeatureContainer feature={featuresConfig[2]} />
                           <FeatureContainer feature={featuresConfig[3]} />
                        </div>
                        <div className="border-b border-primary/30 mt-24" />
                        <div className="py-11 pt-7">
                           <div className="flex sm:flex-col justify-between items-center lg:pb-3 sm:pb-6">
                              <p className="text-[35px] font-light">
                                 Tech Stack
                              </p>
                              <button
                                 className={
                                    'flex items-center text-md bg-primary h-[32px] text-foreground px-3 gap-2 rounded-[10px] ' +
                                    'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-[2.5px]'
                                 }
                                 onClick={(e) => {
                                    e.currentTarget.focus();
                                    window.open(
                                       "https://github.com/zoodtinx/freelanceman",
                                       "_blank",
                                       "noopener,noreferrer"
                                    );
                                 }}
                              >
                                 <GithubLogo className="size-[20px]" />
                                 <span className="text-[18px]">
                                    See The Code
                                 </span>
                              </button>
                           </div>
                           <div className="flex sm:flex-col gap-[23px]">
                              <div className="flex-1 border border-primary/50 rounded-xl h-auto overflow-hidden">
                                 <p className="px-3 py-1 text-md text-primary/50 bg-primary/5">
                                    Client
                                 </p>
                                 <div className="border-b border-primary/50" />
                                 <div className="flex flex-col gap-3 px-5 pt-3 py-4">
                                    <div className="leading-tight">
                                       <p className="text-[30px] font-medium">
                                          React.js
                                       </p>
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
                                       <p className="text-[30px] font-medium">
                                          Nest.js
                                       </p>
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
                                       <p className="text-[30px] font-medium">
                                          AWS
                                       </p>
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
                        <div className="border-b border-primary/30" />
                        <div className="flex flex-col items-center sm:py-[60px] py-[80px]">
                           <div
                              ref={demoCardRef}
                              className="sm:w-full w-[400px] h-[560px] bg-foreground rounded-[17px] flex flex-col justify-between p-4 px-5 shadow-lg"
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
                                    Each demo session is generated personally
                                    for each user. Users are free to explore
                                    features, create tasks, edit contacts,
                                    upload files, or delete content during their
                                    session.
                                 </p>
                                 <p className="font-semibold">
                                    All data (including user data created via
                                    Google sign-in) will be automatically
                                    deleted 2 hour after creation.
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className="flex justify-between items-center px-6 rounded-tr-[20px] rounded-tl-[20px] w-full h-[33px] bg-primary text-foreground">
                           <a
                              href="https://www.peerapol.dev/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex gap-1 items-center"
                           >
                              <ArrowUpLeft className="size-5" />
                              <p>See More Of My Portfolio Projects</p>
                           </a>
                           <p className="sm:hidden">
                              © 2025 Peerapol Glaajing, All Rights Reserved.
                           </p>
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

const FeatureContainer = ({
   feature,
}: {
   feature: (typeof featuresConfig)[number];
}) => {
   return (
      <div className="flex-1 bg-foreground rounded-[23px] flex flex-col shadow-lg">
         <div className="sm:p-2 p-4">
            <img className="rounded-[14px]" src={feature.imageSrc} />
         </div>
         <div className="flex flex-col px-6 pb-4 sm:pt-3 pt-2 justify-center gap-[7px]">
            {feature.icon}
            <div className="flex lg:flex-row sm:flex-col">
               <p className="leading-8 text-[27px] sm:w-auto w-1/2 pt-1 shrink-0">
                  {feature.title}
               </p>
               <p className="text-md grow opacity-40 sm:pt-2 pt-0">
                  {feature.description}
               </p>
            </div>
         </div>
      </div>
   );
};

const featuresConfig = [
   {
      imageSrc:
         'https://ik.imagekit.io/freelanceman/flm-landingpage/flm-layout.webp?updatedAt=1755491400438',
      icon: <Stack />,
      title: (
         <>
            Multi Projects <br /> & Clients
         </>
      ),
      description:
         'All your freelance projects sorted by client. Clear overview, better focus, zero chaos.',
   },
   {
      imageSrc:
         'https://ik.imagekit.io/freelanceman/flm-landingpage/flm-projectpage.webp?updatedAt=1755491164194',
      icon: <Layout />,
      title: (
         <>
            Everything In <br /> One Place
         </>
      ),
      description:
         'Find everything instantly. Tasks, events, client info, and every files all organized per project.',
   },
   {
      imageSrc:
         'https://ik.imagekit.io/freelanceman/flm-landingpage/flm-files.webp?updatedAt=1755491164047',
      icon: <WelcomePageFolder />,
      title: (
         <>
            Your Files <br /> Your Rules
         </>
      ),
      description:
         'Upload directly or link to external files. Tag and add description however you like.',
   },
   {
      imageSrc:
         'https://ik.imagekit.io/freelanceman/flm-landingpage/flm-pdf.webp?updatedAt=1755491164204',
      icon: <WelcomePageWallet />,
      title: (
         <>
            Instant
            <br /> Professional Bills
         </>
      ),
      description:
         'Quotations, invoices, receipts. All the documents you need without switching between apps.',
   },
];

export default AuthPage;
