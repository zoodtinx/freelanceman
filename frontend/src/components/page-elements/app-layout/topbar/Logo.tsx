import { FreelanceManIcon, FreelanceManTypo, MenuHamburger } from '@/components/shared/icons'

export default function FreelanceManLogo() {
   return (
      <div className="flex items-center gap-2 px-3 md:p-2 sm:p-1 w-auto text-primary">
         <FreelanceManIcon className="w-[70px] h-auto md:hidden sm:hidden" />
         <FreelanceManTypo className="w-[110px] h-auto md:w-28 sm:hidden" />
         <MenuHamburger className="lg:hidden md:hidden sm:visible w-7" />
      </div>
   );
}
