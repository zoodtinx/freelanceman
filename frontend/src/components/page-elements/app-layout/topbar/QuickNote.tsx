import { Edit } from '@/components/shared/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FreelanceManIcon, FreelanceManTypoHorizontal } from '@/components/shared/icons'

export default function QuickNote() {
   const [inputValue, setInputValue] = useState('');
   const { t,i18n  } = useTranslation();

   const changeLanguage = () => {
      const lng = i18n.language === 'en' ? 'th' : 'en';
      i18n.changeLanguage(lng);
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   };

   return (
      <>
         <div className="flex items-center gap-2 px-3 md:p-2 sm:p-1 w-auto text-primary lg:hidden md:hidden sm:visible">
            <FreelanceManIcon className="w-[50px] h-auto" />
            <FreelanceManTypoHorizontal className="w-[120px]" />
         </div>
         <div className="w-[725px] h-[43px] flex justify-between text-[16px] items-center rounded-full p-1 bg-foreground cursor-pointer select-none text-primary sm:hidden md:w-[600px]">
            <input
               type="text"
               name=""
               id=""
               placeholder={t('dropAQuickNote')}
               className="ml-4 w-full bg-transparent border-0 focus:outline-none"
               value={inputValue}
               onChange={handleChange}
            />
            <div onClick={() => changeLanguage('th')} className="flex gap-1 h-full items-center rounded-full px-5 font-semibold hover:bg-secondary transition-color bg-primary text-foreground shrink-0">
               <p className="dark:text-primary-dark">{t('addAQuickNote')}</p>
               <Edit
                  className="dark:fill-primary-dark"
                  width={20}
                  height={20}
               />
            </div>
         </div>
      </>
   );
}
