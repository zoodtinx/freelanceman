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
   FilePlus2,
   PencilRuler,
   Plus,
   UserRound,
} from 'lucide-react';
import {
   defaultClientValue,
   defaultContactValues,
   defaultEventValues,
   defaultFileValues,
   defaultNewProjectValue,
   defaultTaskValue,
   defaultValues,
} from '@/components/shared/ui/helpers/constants/default-values';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

const GlobalAddButton = () => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const navigate = useNavigate();
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
         mode: 'create',
         data: defaultValues['task'],
         openedOn: 'global-add-button',
      });
   };

   const handleNewEvent = () => {
      setFormDialogState({
         isOpen: true,
         type: 'event',
         mode: 'create',
         data: defaultEventValues,
         openedOn: 'global-add-button',
      });
   };

   const handleNewContact = () => {
      setFormDialogState({
         isOpen: true,
         type: 'client-contact',
         mode: 'create',
         data: defaultValues['client-contact'],
         openedOn: 'global-add-button',
      });
   };

   const handleNewClient = () => {
      setFormDialogState({
         isOpen: true,
         type: 'new-client',
         mode: 'create',
         data: defaultValues['new-client'],
         openedOn: 'global-add-button',
      });
   };

   const handleNewProject = () => {
      setFormDialogState({
         isOpen: true,
         type: 'new-project',
         mode: 'create',
         data: defaultValues['new-project'],
         openedOn: 'global-add-button',
      });
   };

   const handleNewFile = () => {
      setFormDialogState({
         isOpen: true,
         type: 'new-file',
         mode: 'create',
         data: defaultValues['file'],
         openedOn: 'global-add-button',
      });
   };

   const handleNewDocument = () => {
      navigate('/home/documents/create');
      setOpen(false);
   };

   const menuItems: MenuEntry[] = [
      { Icon: CircleCheck, label: 'Task', action: handleNewTask },
      { Icon: Calendar, label: 'Event', action: handleNewEvent },
      'separator',
      { Icon: PencilRuler, label: 'Project', action: handleNewProject },
      'separator',
      { Icon: Building2, label: 'Client', action: handleNewClient },
      { Icon: UserRound, label: 'Contact', action: handleNewContact },
      'separator',
      { Icon: Plus, label: 'Add File', action: handleNewFile },
      'separator',
      { Icon: FilePlus2, label: 'Sales Document', action: handleNewDocument },
   ];

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <div className="rounded-full w-[60px] md:w-[45px] aspect-square flex items-center justify-center text-white bg-foreground">
               <Plus className="h-full w-full stroke-[2.5px] text-primary p-2" />
            </div>
         </PopoverTrigger>
         <PopoverContent className="w-[165px] bg-white flex flex-col rounded-xl p-[6px] cursor-default select-none bg-foreground border-tertiary">
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
                     className="flex items-center gap-[5px] px-[5px] py-[3px] hover:bg-background transition-colors duration-75 rounded-sm"
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
