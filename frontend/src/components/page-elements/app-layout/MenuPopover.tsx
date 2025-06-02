import { useLocation, useNavigate } from 'react-router-dom';
import {
   BookUser,
   CircleCheck,
   Folder,
   Layers,
   UsersRound,
   Wallet,
} from 'lucide-react';
import { cn } from '@/lib/helper/utils';

export const MenuPopover: React.FC = () => {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const handleNavigate = (page: string) => {
      navigate(`/home/${page}`);
   };

   const checkIsActive = (tab: string) => {
      return (
         pathname === `/home/${tab}` ||
         pathname === `/home/${tab}/` ||
         pathname.includes(`/home/${tab}`)
      );
   };

   const menuItems = [
      {
         icon: <Layers />,
         onClick: () => handleNavigate('projects'),
         isActive: checkIsActive('projects'),
      },
      {
         icon: <CircleCheck />,
         onClick: () => handleNavigate('actions'),
         isActive: checkIsActive('actions'),
      },
      {
         icon: <Folder />,
         onClick: () => handleNavigate('files'),
         isActive: checkIsActive('files'),
      },
      {
         icon: <UsersRound />,
         onClick: () => handleNavigate('clients'),
         isActive: checkIsActive('clients'),
      },
      {
         icon: <BookUser />,
         onClick: () => handleNavigate('partners'),
         isActive: checkIsActive('partners'),
      },
      {
         icon: <Wallet />,
         onClick: () => handleNavigate('income'),
         isActive: checkIsActive('income'),
      },
   ];

   const menus = menuItems.map((item, index) => {
      return (
         <div
            key={index}
            onClick={item.onClick}
            className={cn(
               'flex justify-center text-secondary items-center aspect-square h-full',
               item.isActive && 'text-primary'
            )}
         >
            {item.icon}
         </div>
      );
   });

   return (
      <div
         className={cn(
            'flex bg-tertiary h-10 w-fit gap-1 p-1 items-center justify-center rounded-full cursor-pointer',
            'lg:hidden md:hidden px-3'
         )}
      >
         {menus}
      </div>
   );
};
