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
