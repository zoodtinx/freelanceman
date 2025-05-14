import { Tabs, TabsTrigger, TabsList } from '@radix-ui/react-tabs';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/shared/ui/primitives/Popover';
import {
   Calendar,
   CircleCheck,
   DoorClosed,
   Eclipse,
   Loader2,
   LogOut,
   Moon,
   Settings2,
   Sun,
   UserRound,
   UserRoundPen,
} from 'lucide-react';
import FreelanceManLogo from './Logo';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { useTheme } from 'next-themes';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useNavigate } from 'react-router-dom';
import { useUserQuery } from '@/lib/api/user-api';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import {
   EventListPayload,
   EventPayload,
   UserPayload,
} from 'freelanceman-common';
import { useTasksQuery } from '@/lib/api/task-api';
import { useEventsQuery } from '@/lib/api/event-api';
import { formatDate } from '@/lib/helper/formatDateTime';
import { useFileUrlQuery } from '@/lib/api/file-api';
import { UseQueryResult } from '@tanstack/react-query';
import useAuthStore from '@/lib/zustand/auth-store';
import { logOut } from '@/lib/api/auth-api';

export const mockUser = {
   id: 'id_00458_59',
   name: 'Alice Morgan',
   specialization: ['Graphic Design', 'Branding', 'Illustration'],
   bio: 'Creative graphic designer with a passion for visual storytelling and brand identity.',
   email: 'alicemorgan@example.com',
   phoneNumber: '+1987654321',
   address: '456 Creative Avenue, Los Angeles, CA, USA',
   taxId: '1103300137575',
   avatarUrl: 'https://example.com/avatar-alice.jpg',
   settings: {
      theme: 'light',
   },
   pinnedProjects: [],
   createdAt: new Date('2023-06-15T09:30:00Z'),
   updatedAt: new Date(),
};

export default function TopBar() {
   const date = new Date().toISOString();
   const formattedDate = formatDate(date, 'FULL');

   const eventQueryResult = useEventsQuery({ status: 'scheduled' });
   const taskQueryResult = useTasksQuery({ status: 'pending' });

   return (
      <header
         className={`flex flex-shrink-0 h-[63px] w-full items-center justify-between px-3
                     md:h-[82px]
                     sm:h-[62px] sm:px-3 sm:sticky sm:top-0 sm:z-50 sm:backdrop-blur sm:bg-opacity-60 sm:dark:bg-header-dark sm:dark:bg-opacity-60
                  `}
      >
         <FreelanceManLogo />
         <div className="flex gap-4 cursor-default items-center justify-between text-secondary text-md bg-foreground h-[37px] sm:h-[43px] w-auto rounded-full px-4 sm:hidden">
            <p>{formattedDate}</p>
            <CountDisplay
               icon={CircleCheck}
               label="Task"
               queryResult={taskQueryResult}
            />
            <CountDisplay
               icon={Calendar}
               label="Event"
               queryResult={eventQueryResult}
            />
         </div>
         <div className="h-[55px] items-center flex gap-2">
            <SettingsPopover />
         </div>
      </header>
   );
}

const CountDisplay = ({
   queryResult,
   icon: Icon,
   label,
}: {
   queryResult: UseQueryResult<EventListPayload>;
   icon: React.ElementType;
   label: string;
}) => {
   const { data, isLoading } = queryResult;
   const navigate = useNavigate();

   if (isLoading) {
      return <Loader2 className="animate-spin h-5 w-5" />;
   }

   return (
      <p
         onClick={() => navigate('/home/actions')}
         className="flex gap-1 items-center select-none cursor-pointer hover:text-primary transition-colors duration-100"
      >
         <Icon className="h-5 w-5" />
         <span>{data?.items?.length || '0'}</span>
         <span>{(data?.items?.length || 0) <= 1 ? label : `${label}s`}</span>
      </p>
   );
};

const SettingsPopover = () => {
   const theme = useTheme();
   const navigate = useNavigate()
   const { accessToken } = useAuthStore();
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const handleSignOut = async () => {
      await logOut(accessToken)
      navigate('/user/login')
   }

   const { data: userDataPayload, isLoading: userDataIsLoading } =
      useUserQuery() as UseQueryResult<UserPayload>;
   const { data: urlDataPayload, isLoading: urlIsLoading } = useFileUrlQuery(
      userDataPayload?.avatar ?? '',
      Boolean(userDataPayload?.avatar)
   );

   const userData = userDataPayload as UserPayload;

   const handleEditProfile = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'global-add-button',
         type: 'user-profile',
         data: { ...userData },
         entity: 'user',
      });
   };

   const toggleTheme = (value: string) => {
      if (value === 'light') {
         theme.setTheme('light');
      } else {
         theme.setTheme('dark');
      }
   };

   return (
      <div className="flex gap-2 items-center">
         {!userDataIsLoading && (
            <div className="flex flex-col leading-tight items-end">
               <p>Good morning</p>
               <p className="text-md font-semibold">{userData?.displayName}</p>
            </div>
         )}
         <Popover>
            <PopoverTrigger asChild>
               <div className="w-12 h-12 overflow-hidden rounded-full">
                  {urlIsLoading ? (
                     <Skeleton className="rounded-full w-full h-full" />
                  ) : urlDataPayload?.url ? (
                     <img src={urlDataPayload?.url} alt="" />
                  ) : (
                     <div className="flex bg-foreground w-full h-full items-center justify-center">
                        <UserRound className="text-secondary w-7 h-7" />
                     </div>
                  )}
               </div>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] bg-foreground border-tertiary flex flex-col rounded-xl cursor-default select-none">
               <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex items-center gap-[5px] pl-1">
                     <Eclipse className="h-4 w-4" />
                     <p>Appearance</p>
                  </div>
                  <Tabs
                     className="w-[100px] p-1 bg-tertiary rounded-md text-secondary"
                     value={theme.theme}
                     onValueChange={toggleTheme}
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
               <div className="flex items-center gap-[5px] justify-between hover:bg-background rounded-md transition-colors duration-75">
                  <div
                     className="flex items-center gap-[5px] pl-1 p-1 w-full"
                     onClick={handleEditProfile}
                  >
                     <Settings2 className="h-4 w-4" />
                     <p>Edit Profile</p>
                  </div>
               </div>
               <Separator />
               <div className="flex items-center gap-[5px] justify-between hover:bg-background rounded-md transition-colors duration-75">
                  <div className="flex items-center gap-[5px] pl-1 p-1">
                     <UserRoundPen className="h-4 w-4" />
                     <p>Get Account</p>
                  </div>
               </div>
               <div onClick={handleSignOut} className="flex items-center gap-[5px] justify-between hover:bg-background rounded-md transition-colors duration-75 text-button-red">
                  <div className="flex items-center gap-[5px] pl-1 p-1">
                     <LogOut className="h-4 w-4" />
                     <p>Sign Out</p>
                  </div>
               </div>
            </PopoverContent>
         </Popover>
      </div>
   );
};
