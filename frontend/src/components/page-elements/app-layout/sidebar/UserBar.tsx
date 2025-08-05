import { cn } from '@/lib/helper/utils';
import { Tabs, TabsTrigger, TabsList } from '@radix-ui/react-tabs';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/shared/ui/primitives/Popover';
import {
   ChevronDown,
   Eclipse,
   Hand, Loader2,
   LogOut,
   Moon,
   Settings2,
   Sun,
   TimerReset,
   UserRound
} from 'lucide-react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserQuery } from '@/lib/api/user-api';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import { useFileUrlQuery } from '@/lib/api/file-api';
import { UseQueryResult } from '@tanstack/react-query';
import useAuthStore from '@/lib/zustand/auth-store';
import { getFullDemo, logOut } from '@/lib/api/auth-api';
import { useRef, useState } from 'react';
import { useDarkMode } from '@/lib/zustand/theme-store';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import { getPageKey } from '@/components/page-elements/app-layout/sidebar/helper';
import { UserFindOneResponse } from 'freelanceman-common';
import { toast } from 'sonner';

export const UserBar = () => {
   const { mode, toggle } = useDarkMode();
   const navigate = useNavigate();
   const location = useLocation();
   const popoverRef = useRef<HTMLButtonElement>(null);
   const { accessToken } = useAuthStore();
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [isLoading, setIsLoading] = useState(false);
   const [isResetDemoLoading, setIsResetDemoLoading] = useState(false);

   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   const handleSignOut = async (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsLoading(true);
      await logOut(accessToken);
      setIsLoading(false);
      navigate('/welcome');
      toast.success('See you for your next project!');
   };

   // fetch user data
   const { data: userDataPayload, isLoading: userDataIsLoading } =
      useUserQuery() as UseQueryResult<UserFindOneResponse>;
   // fetch user avatar url
   const { data: urlDataPayload, isLoading: urlIsLoading } = useFileUrlQuery(
      userDataPayload?.avatar ?? '',
      Boolean(userDataPayload?.avatar)
   );

   const userData = userDataPayload as UserFindOneResponse;

   // open welcome dialog based on current page
   const pageKey = getPageKey(location.pathname);
   const handleOpenWelcomeDialog = () => {
      setWelcomeDialogState(() => {
         return {
            page: pageKey as any,
            isOpen: true,
         };
      });
   };

   const handleEditProfile = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'globalAddButton',
         type: 'userProfile',
         data: { ...userData },
         entity: 'user',
      });
   };

   const handleResetDemo = async (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsResetDemoLoading(true);
      const result = await getFullDemo();
      if (result.success) {
         window.location.reload();
      } else {
         toast.error('Unexpected error, please try again');
      }
   };

   const handleClick = () => {
      popoverRef.current?.click();
   };

   const iconClassName = 'h-4 w-4';

   const profileMenuItems = [
      {
         icon: <Settings2 className={iconClassName} />,
         label: 'Edit Profile',
         onClick: handleEditProfile,
      },
      {
         icon: <Hand className={iconClassName} />,
         label: 'View Welcome Message',
         onClick: handleOpenWelcomeDialog,
      },
      {
         icon: isResetDemoLoading ? (
            <Loader2 className={cn(`animate-spin`, iconClassName)} />
         ) : (
            <TimerReset className={iconClassName} />
         ),
         onClick: handleResetDemo,
         label: 'Reset Demo',
      },
      {
         icon: isLoading ? (
            <Loader2 className={cn(`animate-spin`, iconClassName)} />
         ) : (
            <LogOut className={iconClassName} />
         ),
         label: 'Sign Out',
         onClick: handleSignOut,
         className: 'text-button-red',
      },
   ];

   return (
      <div
         onClick={handleClick}
         className="flex lg:flex-col md:flex-col sm:grow gap-3 items-center"
      >
         <Popover>
            <PopoverTrigger asChild ref={popoverRef} onClick={handleClick}>
               <div
                  className={`w-[140px] aspect-square overflow-hidden rounded-full shrink-0 md:w-10 md:h-10 cursor-pointer
                              sm:w-10 sm:h-10
                  `}
               >
                  {urlIsLoading ? (
                     <Skeleton className="rounded-full w-full h-full" />
                  ) : urlDataPayload?.url ? (
                     <img
                        src={urlDataPayload?.url}
                        alt=""
                        className="w-full h-full object-cover bg-tertiary"
                     />
                  ) : (
                     <div className="flex bg-foreground w-full h-full items-center justify-center">
                        <UserRound
                           className={cn(
                              'text-secondary w-[27px] h-[27px]',
                              'lg:w-[90px] lg:h-[90px] lg:stroke-[1.4px]'
                           )}
                        />
                     </div>
                  )}
               </div>
            </PopoverTrigger>
            <PopoverContent
               className={cn(
                  'w-[250px] bg-foreground text-primary border-tertiary flex flex-col rounded-xl cursor-default select-none',
                  'ml-3 dark:border-transparent sm:bg-primary sm:text-foreground'
               )}
            >
               <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex items-center gap-[5px] pl-1">
                     <Eclipse className="h-4 w-4" />
                     <p>Appearance</p>
                  </div>
                  <Tabs
                     className="w-[100px] p-1 bg-tertiary sm:bg-secondary rounded-md text-primary"
                     value={mode}
                     onValueChange={toggle}
                  >
                     <TabsList className="w-full flex">
                        <TabsTrigger
                           value="light"
                           className={cn(
                              'flex justify-center w-1/2 text-base py-[2px] rounded-sm data-[state=active]:bg-foreground data-[state=active]:text-primary',
                              'sm:data-[state=active]:text-foreground sm:data-[state=active]:bg-primary '
                           )}
                        >
                           <Sun className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger
                           value="dark"
                           className={cn(
                              'flex justify-center w-1/2 text-base py-[2px] rounded-sm data-[state=active]:bg-foreground data-[state=active]:text-primary',
                              'sm:data-[state=active]:text-foreground sm:data-[state=active]:bg-primary '
                           )}
                        >
                           <Moon className="h-4 w-4" />
                        </TabsTrigger>
                     </TabsList>
                  </Tabs>
               </div>
               {profileMenuItems.map(
                  ({ icon: Icon, label, onClick, className }, i) => (
                     <div key={label}>
                        {i === 1 && <Separator className="mb-1" />}
                        <div
                           onClick={onClick}
                           className={cn(
                              'flex items-center gap-[5px] justify-between hover:bg-background rounded-md transition-colors duration-75',
                              'sm:hover:bg-background sm:hover:text-primary',
                              className
                           )}
                        >
                           <div className="flex items-center gap-[5px] pl-1 p-1 w-full">
                              {Icon}
                              <p>{label}</p>
                           </div>
                        </div>
                     </div>
                  )
               )}
            </PopoverContent>
         </Popover>
         {userDataIsLoading ? (
            <Skeleton className="h-[42px] w-full rounded-xl" />
         ) : (
            <div className="flex flex-col leading-tight h-[42px] md:hidden w-full px-3 sm:px-0 sm:hidden cursor-pointer">
               <div className="flex w-full justify-between items-center relative">
                  <p>Good morning</p>
                  <ChevronDown className="w-5 h-5 absolute right-0" />
               </div>
               <p className="text-md font-semibold text-wrap">
                  {userData?.displayName}
               </p>
            </div>
         )}
      </div>
   );
};
