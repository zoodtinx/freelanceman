import { useTranslation } from 'react-i18next';
import {
   ProjectAll,
   Files,
   Client,
   Documents,
   Checkbox,
} from '../../icons/index';
import clsx from 'clsx';

type SideBarTabProps = {
   tab: 'projects' | 'files' | 'actions' | 'clients' | 'documents';
   activeTab: string;
   onClick: () => void;
};

export default function SideBarTab({
   tab,
   activeTab,
   onClick,
}: SideBarTabProps) {
   const { t } = useTranslation();
   const svgProp = { width: 27, height: 27 };

   let icon;
   let label;
   switch (tab) {
      case 'projects':
         label = t('projects');
         icon = <ProjectAll {...svgProp} />;
         break;
      case 'files':
         label = t('files');
         icon = <Files {...svgProp} />;
         break;
      case 'actions':
         label = t('actions');
         icon = <Checkbox {...svgProp} />;
         break;
      case 'clients':
         label = t('clients');
         icon = <Client {...svgProp} />;
         break;
      case 'documents':
         label = t('documents');
         icon = <Documents {...svgProp} />;
         break;
   }

   const containerStyle = {
      base: 'flex w-full h-[46px] items-center gap-2 border-[1.75px] rounded-[13px] p-2 px-[10px] font-medium text-[18px] cursor-pointer',
      breakpoints: 'md:w-fit',
      inactive:
         'border-background text-secondary hover:text-primary transition-color duration-75',
      active: 'border-background text-primary bg-tertiary',
   };

   return (
      <li
         className={clsx([
            containerStyle.base,
            activeTab === tab ? containerStyle.active : containerStyle.inactive,
            containerStyle.breakpoints
         ])}
         onClick={onClick}
      >
         {icon}
         <p className='md:hidden'>{label}</p>
      </li>
   );
}