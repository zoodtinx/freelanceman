import QuickNote from './QuickNote';
import ProfileBar from './ProfileBar';
import Avatar from './Avatar';
import FreelanceManLogo from './Logo';
import { SunIcon, Calendar, CircleCheck } from 'lucide-react';

export default function TopBar() {
   return (
      <header
         className={`flex flex-shrink-0 h-[70px] w-full items-center justify-between px-3
                     md:h-[82px]
                     sm:h-[62px] sm:px-3 sm:sticky sm:top-0 sm:z-50 sm:backdrop-blur sm:bg-opacity-60 sm:dark:bg-header-dark sm:dark:bg-opacity-60
                  `}
      >
         <FreelanceManLogo />
         <div className="flex gap-4 items-center justify-between text-secondary text-md bg-foreground h-[37px] sm:h-[43px] w-auto rounded-full px-4 sm:hidden">
            <p>Monday, 19 December 2025</p>
            <div className="flex items-center gap-1">
               <CircleCheck className="h-5 w-5" />
               <p>5 tasks</p>
            </div>
            <div className="flex items-center gap-1">
               <Calendar className="h-5 w-5" />
               <p>2 events</p>
            </div>
         </div>
         <div className="h-[55px] items-center flex gap-2">
            <ProfileBar />
            <Avatar />
         </div>
      </header>
   );
}
