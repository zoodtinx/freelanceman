import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/shared/ui/primitives/Popover';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import {
   Building2,
   Calendar,
   CircleCheck,
   PencilRuler,
   Plus,
   Upload,
   UserRound,
} from 'lucide-react';
import {
   defaultContactValues,
   defaultEventValues,
   defaultPartnerContactValues,
   defaultValues,
} from '@/components/shared/ui/helpers/constants/default-values';
import { useState } from 'react';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { cn } from '@/lib/helper/utils';

const GlobalAddButton = () => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const [open, setOpen] = useState(false);

   type MenuItem = {
      Icon: React.FC<React.SVGProps<SVGSVGElement>>;
      label: string;
      action: () => void;
   };
   type MenuEntry = MenuItem | 'separator';

   const handleNewTask = () => {
      setFormDialogState({
         isOpen: true,
         type: 'task',
         entity: 'task',
         mode: 'create',
         data: { ...defaultValues['task'] },
         openedOn: 'globalAddButton',
      });
   };

   const handleNewEvent = () => {
      setFormDialogState({
         isOpen: true,
         type: 'event',
         entity: 'event',
         mode: 'create',
         data: { ...defaultEventValues },
         openedOn: 'globalAddButton',
      });
   };

   const handleNewContact = () => {
      setFormDialogState({
         isOpen: true,
         type: 'clientContact',
         entity: 'clientContact',
         mode: 'create',
         data: { ...defaultContactValues },
         openedOn: 'globalAddButton',
      });
   };

   const handleNewPartnerContact = () => {
      setFormDialogState({
         isOpen: true,
         type: 'partnerContact',
         entity: 'partnerContact',
         mode: 'create',
         data: { ...defaultPartnerContactValues },
         openedOn: 'globalAddButton',
      });
   };

   const handleNewClient = () => {
      setFormDialogState({
         isOpen: true,
         type: 'newClient',
         mode: 'create',
         entity: 'client',
         data: { ...defaultValues['new-client'] },
         openedOn: 'globalAddButton',
      });
   };

   const handleNewProject = () => {
      setFormDialogState({
         isOpen: true,
         type: 'newProject',
         mode: 'create',
         data: { ...defaultValues['new-project'] },
         openedOn: 'globalAddButton',
         entity: 'project',
      });
   };

   const handleNewFile = () => {
      setFormDialogState({
         isOpen: true,
         type: 'newFile',
         mode: 'create',
         entity: 'file',
         data: { ...defaultValues['file'] },
         openedOn: 'globalAddButton',
      });
   };

   const menuItems: MenuEntry[] = [
      { Icon: CircleCheck, label: 'Task', action: handleNewTask },
      { Icon: Calendar, label: 'Event', action: handleNewEvent },
      'separator',
      { Icon: PencilRuler, label: 'Project', action: handleNewProject },
      'separator',
      { Icon: Building2, label: 'Client', action: handleNewClient },
      { Icon: UserRound, label: 'Contact', action: handleNewContact },
      { Icon: UserRound, label: 'Partner', action: handleNewPartnerContact },
      'separator',
      { Icon: Upload, label: 'File', action: handleNewFile },
   ];

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <div
               className={`rounded-full w-[44px] mb-3 md:mb-0 md:w-10 aspect-square flex items-center justify-center text-white bg-primary transition-colors duration-100 cursor-pointer
                           sm:w-10 sm:h-10 sm:mb-0
               `}
            >
               <Plus className="h-full w-full stroke-[2.5px] text-foreground p-2" />
            </div>
         </PopoverTrigger>
         <PopoverContent
            className={cn(
               'w-[165px] flex flex-col rounded-xl p-[6px] cursor-default select-none border-tertiary text-primary',
               'md:ml-4 sm:mr-3 bg-foreground',
               'sm:bg-primary sm:text-foreground',
               'dark:border-transparent '
            )}
         >
            {menuItems.map((item, index) =>
               item === 'separator' ? (
                  <Separator key={index} />
               ) : (
                  <div
                     key={item.label}
                     onClick={() => {
                        item.action();
                        setOpen(false);
                     }}
                     className={cn(
                        'flex items-center gap-[5px] px-[5px] py-[3px] hover:bg-background transition-colors duration-75 rounded-sm',
                        'sm:hover:text-primary'
                     )}
                  >
                     <item.Icon className="h-4 w-4" />
                     <p>{item.label}</p>
                  </div>
               )
            )}
         </PopoverContent>
      </Popover>
   );
};

export default GlobalAddButton;
