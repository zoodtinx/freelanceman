import { useTranslation } from 'react-i18next';
import {
   ProjectAll,
   Files,
   Client,
   Documents,
   Checkbox,
   Notes,
} from '../../shared/icons/index';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

type SideBarTabProps = {
   tab: 'projects' | 'files' | 'actions' | 'contacts' | 'documents' | 'notes';
};

const SideBarTab: React.FC<SideBarTabProps> = ({ tab }) => {
   const { t } = useTranslation();
   const url = useLocation().pathname;
   const isActiveTab = url === `/home/${tab}`;

   let icon;
   let label;
   let route;
   switch (tab) {
      case 'projects':
         label = t('projects');
         icon = <ProjectAll className='w-[27px] h-auto' />;
         route = 'projects';
         break;
      case 'files':
         label = t('files');
         icon = <Files className='w-[27px] h-auto' />;
         route = 'files';
         break;
      case 'actions':
         label = t('actions');
         icon = <Checkbox className='w-[27px] h-auto' />;
         route = 'actions';
         break;
      case 'contacts':
         label = 'Contacts';
         icon = <Client className='w-[27px] h-auto' />;
         route = 'contacts';
         break;
      case 'documents':
         label = t('documents');
         icon = <Documents className='w-[27px] h-auto' />;
         route = 'documents';
         break;
      case 'notes':
         label = t('notes');
         icon = <Notes className='w-[27px] h-auto' />;
         route = 'notes';
         break;
   }

   const containerStyle = {
      base: 'flex w-full h-[46px] items-center gap-2 border-[1.75px] rounded-[13px] p-2 px-[10px] font-medium text-md cursor-pointer',
      breakpoints: 'md:w-fit',
      inactive:
         'border-background text-secondary hover:text-primary transition-color duration-75',
      active: 'border-background text-primary bg-foreground',
   };

   return (
      <li>
         <Link
            to={route}
            className={clsx([
               containerStyle.base,
               isActiveTab
                  ? containerStyle.active
                  : containerStyle.inactive,
               containerStyle.breakpoints,
            ])}
         >
            {icon}
            <p className="md:hidden">{label}</p>
         </Link>
      </li>
   );
};

export default SideBarTab;
