import { useLocation, useNavigate } from 'react-router-dom';
import {
   BookUser, CircleCheck,
   Folder,
   Layers,
   UsersRound,
   Wallet
} from 'lucide-react';
import { cn } from '@/lib/helper/utils';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
} from '@/components/shared/ui/select/Select';
import { capitalizeFirstChar } from '@/components/shared/ui/helpers/Helpers';

const iconMap: Record<string, JSX.Element> = {
   projects: <Layers className="w-full h-full" />,
   actions: <CircleCheck className="w-full h-full" />,
   files: <Folder className="w-full h-full" />,
   clients: <UsersRound className="w-full h-full" />,
   partners: <BookUser className="w-full h-full" />,
   income: <Wallet className="w-full h-full" />,
};

export const MenuPopover: React.FC = () => {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const menuItems = [
      { key: 'projects', label: 'Projects' },
      { key: 'actions', label: 'Actions' },
      { key: 'files', label: 'Files' },
      { key: 'clients', label: 'Clients' },
      { key: 'partners', label: 'Partners' },
      { key: 'income', label: 'Income' },
   ];

   const current =
      menuItems.find((item) => pathname.startsWith(`/home/${item.key}`))?.key ||
      'projects';

   return (
      <Select
         onValueChange={(val) => navigate(`/home/${val}`)}
         defaultValue={current}
      >
         <SelectTrigger
            className={cn(
               'bg-foreground h-10 w-fit p-2 pr-3 gap-2 flex items-center justify-center rounded-full text-primary',
               'lg:hidden md:hidden'
            )}
         >
            <div className="flex items-center gap-1 px-1">
               <span>{iconMap[current]}</span>
               <span className="text-md">{capitalizeFirstChar(current)}</span>
            </div>
         </SelectTrigger>
         <SelectContent>
            <div className="flex flex-col gap-1">
               {menuItems.map((item) => (
                  <SelectItem key={item.key} value={item.key}>
                     <div className="flex items-center gap-2">
                        <span>{iconMap[item.key]}</span>
                        <span className="text-md">{item.label}</span>
                     </div>
                  </SelectItem>
               ))}
            </div>
         </SelectContent>
      </Select>
   );
};
