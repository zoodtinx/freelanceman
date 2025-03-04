import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { Notes } from '@/components/shared/icons';
import { Layers, UsersRound, FileText, BookUser, CircleCheck, Folder, Coins, Wallet, CircleDollarSign, Banknote, WalletCards, Wallet2, WalletMinimal, LucideWallet } from 'lucide-react';

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
   notes: { label: 'Notes', icon: Notes },
};

const SideBarTab: React.FC<SideBarTabProps> = ({ tab }) => {
   const { pathname } = useLocation();
   const isActive = pathname === `/home/${tab}` || pathname === `/home/${tab}/` || pathname.includes(`/home/${tab}`);

   const { label, icon: Icon } = tabConfig[tab];

   return (
      <li>
         <Link
            to={tab}
            className={clsx(
               'flex w-full items-center gap-2 border-[1.75px] rounded-xl py-[8px] px-[10px] text-md cursor-pointer transition-colors duration-75 md:p-[10px]',
               isActive
                  ? 'border-background text-primary bg-foreground'
                  : 'border-background text-secondary hover:text-primary'
            )}
         >
            <Icon className="w-[24px] h-auto md:w-7 md:h-7" />
            <p className="md:hidden">{label}</p>
         </Link>
      </li>
   );
};

export default SideBarTab;
