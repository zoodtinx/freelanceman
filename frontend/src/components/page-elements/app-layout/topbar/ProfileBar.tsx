import { useTranslation } from 'react-i18next';
import { Arrow } from '@/components/shared/icons';

export default function ProfileBar() {
   const { t } = useTranslation();

   return (
      
      <div className='flex flex-col leading-5 items-end'>
         <p>Good morning</p>
         <p className='text-md font-semibold'>Nakamura</p>
      </div>
   );
}


{/* <div className="flex items-center justify-between bg-foreground h-[42px] sm:h-[43px] w-auto rounded-full pr-3 pl-5 md:hidden sm:hidden">
         <div className="flex gap-1 pr-3 text-md">
            <p className="text-secondary">Welcome back,</p>
            <p className="text-primary font-semibold">Nakamura</p>
         </div>
         <div className="w-5 h-5 flex-shrink-0 rounded-full flex justify-center items-center  bg-secondary text-foreground">
            <Arrow className="w-3 h-auto" />
         </div>
      </div> */}