import { cn } from '@/lib/helper/utils';
import { Tabs, TabsTrigger, TabsList } from '@radix-ui/react-tabs';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/shared/ui/primitives/Popover';
import {
   Eclipse,
   Info,
   LogOut,
   Moon,
   Settings2,
   Sun,
   TimerReset,
   UserRound,
   UserRoundPen,
} from 'lucide-react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserQuery } from '@/lib/api/user-api';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import { UserPayload } from 'freelanceman-common';
import { useFileUrlQuery } from '@/lib/api/file-api';
import { UseQueryResult } from '@tanstack/react-query';
import useAuthStore from '@/lib/zustand/auth-store';
import { logOut } from '@/lib/api/auth-api';
import { useRef } from 'react';
import { useDarkMode } from '@/lib/zustand/theme-store';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import { getPageKey } from '@/components/page-elements/app-layout/sidebar/helper';

export const UserBar = () => {
   const { mode, toggle } = useDarkMode();
   const navigate = useNavigate();
   const location = useLocation();
   const popoverRef = useRef<HTMLButtonElement>(null);
   const { accessToken } = useAuthStore();
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const setWelcomeDialogState = useWelcomeDialogStore(
         (state) => state.setWelcomeDialogState
      );

   const handleSignOut = async () => {
      await logOut(accessToken);
      navigate('/welcome');
   };

   const { data: userDataPayload, isLoading: userDataIsLoading } =
      useUserQuery() as UseQueryResult<UserPayload>;
   const { data: urlDataPayload, isLoading: urlIsLoading } = useFileUrlQuery(
      userDataPayload?.avatar ?? '',
      Boolean(userDataPayload?.avatar)
   );

   const userData = userDataPayload as UserPayload;
   
   const pageKey = getPageKey(location.pathname)
   const handleOpenWelcomeDialog = () => {
      setWelcomeDialogState(() => {
         return {
            page: pageKey as any,
            isOpen: true
         }
      })
   }

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

   const handleClick = () => {
      popoverRef.current?.click();
   };

   const profileMenuItems = [
      {
         icon: Settings2,
         label: 'Edit Profile',
         onClick: handleEditProfile,
      },
      {
         icon: Info,
         label: 'View Tips',
         onClick: handleOpenWelcomeDialog
      },
      {
         icon: UserRoundPen,
         label: 'Get Account',
      },
      {
         icon: TimerReset,
         label: 'Reset Demo',
      },
      {
         icon: LogOut,
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
            <PopoverTrigger asChild>
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
                        <UserRound className="text-secondary w-9 h-9" />
                     </div>
                  )}
               </div>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] bg-foreground border-tertiary flex flex-col rounded-xl cursor-default select-none ml-3">
               <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex items-center gap-[5px] pl-1">
                     <Eclipse className="h-4 w-4" />
                     <p>Appearance</p>
                  </div>
                  <Tabs
                     className="w-[100px] p-1 bg-quaternary rounded-md text-secondary"
                     value={mode}
                     onValueChange={toggle}
                  >
                     <TabsList className="w-full flex">
                        <TabsTrigger
                           value="light"
                           className="flex justify-center w-1/2 text-base data-[state=active]:text-primary data-[state=active]:bg-foreground py-[2px] rounded-sm"
                        >
                           <Sun className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger
                           value="dark"
                           className="flex justify-center w-1/2 text-base data-[state=active]:text-primary data-[state=active]:bg-foreground py-[2px] rounded-sm"
                        >
                           <Moon className="h-4 w-4" />
                        </TabsTrigger>
                     </TabsList>
                  </Tabs>
               </div>
               {profileMenuItems.map(
                  ({ icon: Icon, label, onClick, className }, i) => (
                     <div key={label}>
                        {i === 1 && <Separator className='mb-1' />}
                        <div
                           onClick={onClick}
                           className={cn(
                              'flex items-center gap-[5px] justify-between hover:bg-background rounded-md transition-colors duration-75',
                              className
                           )}
                        >
                           <div className="flex items-center gap-[5px] pl-1 p-1 w-full">
                              <Icon className="h-4 w-4" />
                              <p>{label}</p>
                           </div>
                        </div>
                     </div>
                  )
               )}
            </PopoverContent>
         </Popover>
         {!userDataIsLoading && (
            <div className="flex flex-col leading-tight md:hidden w-full px-3 sm:px-0 sm:hidden">
               <p>Good morning</p>
               <p className="text-md font-semibold text-wrap">
                  {userData?.displayName}
               </p>
            </div>
         )}
      </div>
   );
};
