import {
   FreelanceManIcon,
   FreelanceManTypo,
   MenuHamburger,
} from '@/components/shared/icons';

export default function FreelanceManLogo({
   onClick,
}: {
   onClick?: () => void;
}) {
   return (
      <div
         onClick={onClick}
         className="flex items-center shrink-0 gap-2 px-1 md:p-2 sm:p-1 w-auto text-primary h-auto cursor-pointer"
      >
         <FreelanceManIcon className="w-[55px] h-auto md:hidden sm:hidden shrink-0" />
         <FreelanceManTypo className="w-[90px] h-auto md:w-28 sm:hidden shrink-0" />
         <MenuHamburger className="lg:hidden md:hidden sm:visible w-7" />
      </div>
   );
}
