import { useTranslation } from 'react-i18next';
import { Arrow } from '@/components/icons';

export default function ProfileBar() {
   const { t } = useTranslation();

   return (
      <div className="flex items-center justify-between bg-foreground h-full w-[180px] rounded-full pr-4 pl-5 md:hidden sm:hidden">
         <div className="flex flex-col leading-none">
            <p className="text-secondary text-subbase">{t('welcomeBack')}</p>
            <p className="text-primary font-semibold text-minihead">Nakamura</p>
         </div>
         <div className="w-6 h-6 rounded-full flex justify-center items-center  bg-secondary text-foreground">
            <Arrow className="w-4 h-auto" />
         </div>
      </div>
   );
}
