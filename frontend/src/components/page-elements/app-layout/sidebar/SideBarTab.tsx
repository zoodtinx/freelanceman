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

import { Layers, UsersRound, FileText, BookUser, CircleCheck, FolderOpen  } from 'lucide-react';

type SideBarTabProps = {
   tab: keyof typeof tabConfig;
};

const tabConfig = {
   projects: { labelKey: 'projects', icon: Layers },
   files: { labelKey: 'files', icon: FolderOpen },
   actions: { labelKey: 'actions', icon: CircleCheck},
   clients: { labelKey: 'clients', icon: UsersRound },
   partners: { labelKey: 'partners', icon: BookUser },
   documents: { labelKey: 'documents', icon: FileText },
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
               'flex w-full items-center gap-2 border-[1.75px] rounded-xl py-[8px]  px-[10px] text-md cursor-pointer transition-colors duration-75 md:p-[10px]',
               isActive
                  ? 'border-background text-primary bg-foreground'
                  : 'border-background text-secondary hover:text-primary'
            )}
         >
            <Icon className="w-[24px] h-auto md:w-7 md:h-7" />
            <p className="md:hidden">{t(labelKey)}</p>
         </Link>
      </li>
   );
};

export default SideBarTab;
