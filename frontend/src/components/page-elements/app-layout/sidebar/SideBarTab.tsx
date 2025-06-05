import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import {
   Layers,
   UsersRound,
   FileText,
   BookUser,
   CircleCheck,
   Folder,
   Coins,
   Wallet,
   CircleDollarSign,
   Banknote,
   WalletCards,
   Wallet2,
   WalletMinimal,
   LucideWallet,
} from 'lucide-react';

type SideBarTabProps = {
   tab: keyof typeof tabConfig;
};

const tabConfig = {
   projects: { label: 'Projects', icon: Layers },
   files: { label: 'Files', icon: Folder },
   actions: { label: 'Actions', icon: CircleCheck },
   clients: { label: 'Clients', icon: UsersRound },
   partners: { label: 'Partners', icon: BookUser },
   income: { label: 'Income', icon: Wallet },
};

const SideBarTab: React.FC<SideBarTabProps> = ({ tab }) => {
   const { pathname } = useLocation();
   const isActive =
      pathname === `/home/${tab}` ||
      pathname === `/home/${tab}/` ||
      pathname.includes(`/home/${tab}`);

   const { label, icon: Icon } = tabConfig[tab];

   return (
      <li>
         <Link
            to={tab}
            className={clsx(
               'aspect-square flex w-fit items-center gap-[6px] rounded-lg p-7 text-md cursor-pointer transition-colors duration-75 md:p-[7px]',
               isActive
                  ? 'bg-primary text-foreground dark:bg-foreground dark:text-primary'
                  : 'text-secondary hover:text-primary'
            )}
         >
            <Icon className="w-[24px] h-auto md:w-[23px] md:h-[23px]" />
            <p className="md:hidden">{label}</p>
         </Link>
      </li>
   );
};

export default SideBarTab;
