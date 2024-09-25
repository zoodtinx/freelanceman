import QuickNote from './QuickNote';
import ProfileBar from './ProfileBar';
import Avatar from './Avatar';
import FreelanceManLogo from './Logo';

export default function TopBar() {
   return (
      <header className="flex bg-gradient-to-b from-background to-transparent h-[90px] md:h-[82px] sm:h-[55px] w-full items-center justify-between px-3 sm:px-2 sm:sticky sm:top-0">
         <FreelanceManLogo />
         <QuickNote />
         <div className="h-[55px] items-center flex gap-1">
            <Avatar />
            <ProfileBar />
         </div>
      </header>
   );
}
