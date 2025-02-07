import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import {
   ProjectAll,
   Files,
   Client,
   Documents,
   Checkbox,
   Notes,
} from '@/components/shared/icons';

type SideBarTabProps = {
   tab: keyof typeof tabConfig;
};

const tabConfig = {
   projects: { labelKey: 'projects', icon: ProjectAll },
   files: { labelKey: 'files', icon: Files },
   actions: { labelKey: 'actions', icon: Checkbox },
   clients: { labelKey: 'clients', icon: Client },
   partners: { labelKey: 'partners', icon: Client },
   documents: { labelKey: 'documents', icon: Documents },
   notes: { labelKey: 'notes', icon: Notes },
};

const SideBarTab: React.FC<SideBarTabProps> = ({ tab }) => {
   const { t } = useTranslation();
   const { pathname } = useLocation();
   const isActive = pathname === `/home/${tab}`;

   const { labelKey, icon: Icon } = tabConfig[tab];

   return (
      <li>
         <Link
            to={tab}
            className={clsx(
               'flex w-full items-center gap-2 border-[1.75px] rounded-lg p-1 px-[10px] text-md cursor-pointer transition-colors duration-75 md:w-fit',
               isActive
                  ? 'border-background text-primary bg-foreground'
                  : 'border-background text-secondary hover:text-primary'
            )}
         >
            <Icon className="w-[22px] h-auto" />
            <p className="md:hidden">{t(labelKey)}</p>
         </Link>
      </li>
   );
};

export default SideBarTab;
