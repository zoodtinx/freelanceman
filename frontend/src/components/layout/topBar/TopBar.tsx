import QuickNote from './QuickNote';
import ProfileBar from './ProfileBar';
import Avatar from './Avatar';
import FreelanceManLogo from './Logo';

export default function TopBar() {
   return (
      <header className="flex bg-background bg-background  h-[90px] md:h-[82px] sm:h-[62px] w-full items-center justify-between px-3 sm:px-3 sm:sticky sm:top-0 sm:z-50 sm:backdrop-blur sm:bg-opacity-60 sm:dark:bg-header-dark sm:dark:bg-opacity-60 ">
         <FreelanceManLogo />
         <QuickNote />
         <div className="h-[55px] items-center flex gap-1">
            <Avatar />
            <ProfileBar />
         </div>
      </header>
   );
}
