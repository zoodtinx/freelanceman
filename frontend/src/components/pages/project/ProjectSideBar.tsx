import {
   Documents,
   Files,
   Materials,
   Task,
   Plus,
   Contact,
} from '@/components/shared/icons';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import React from 'react';

const ProjectSideBar: React.FC = () => {
   const { t } = useTranslation();

   return (
      <div className="flex flex-col w-[290px] shrink-0 gap-3">
         <div className="flex flex-col gap-2">
            <SidebarButton label="tasks" icon={<Task />}>
               {t('tasks')} & {t('events')}
            </SidebarButton>
            <SidebarButton label="files" icon={<Files />}>
               {t('files')}
            </SidebarButton>
            <SidebarButton label="documents" icon={<Documents />}>
               {t('contracts')} & {t('invoices')}
            </SidebarButton>
            <SidebarButton label="materials" icon={<Materials />}>
               {t('brief')} {t('materials')}
            </SidebarButton>
         </div>
         {/* <ContactSection /> */}
      </div>
   );
};

export default ProjectSideBar;

const SidebarButton: React.FC<SidebarButtonProps> = ({
   children,
   icon,
   label,
}) => {
   const url = useLocation().pathname.split('/');
   const currentPage = url[url.length - 1];
   const isActiveTab = currentPage === label;
   const iconWithClassName = React.cloneElement(icon as React.ReactElement, {
      className: 'aspect-square w-7',
   });

   return (
      <Link
         to={label}
         className={clsx(
            'flex items-center bg-background p-1 px-2 rounded-[18px] gap-2 transition-colors duration-75 border-[2px] cursor-default',
            {
               'border-primary hover:border-primary': isActiveTab,
               'border-background hover:border-tertiary': !isActiveTab,
            }
         )}
      >
         {iconWithClassName}
         <p className="text-md grow">{children}</p>
      </Link>
   );
};

// const ContactSection: React.FC = () => {
//    const { project } = useActiveproject();

//    return (
//       <div className="flex flex-col rounded-[30px] relative grow py-3 px-3 bg-background">
//          <div className="z-10 flex flex-col gap-2">
//             <div className="flex justify-between items-center text-[#333333] px-2">
//                <p className="text-lg">Contacts</p>
//                <Plus className="aspect-square h-[13px]" />
//             </div>
//             <div className="flex flex-col gap-1">
//                <ContactCard />
//                <ContactCard />
//                <ContactCard />
//                <ContactCard />
//                <ContactCard />
//             </div>
//          </div>
//          <div
//             className="absolute inset-0 z-0 rounded-[30px]"
//             style={{ backgroundColor: project.color }}
//          />
//       </div>
//    );
// };

// const ContactCard: React.FC = () => {
//    return (
//       <div className="flex h-[62px] bg-background text-primary-foreground rounded-full pl-2 pr-4 items-center justify-between">
//          <div className="flex gap-2">
//             <div className="aspect-square rounded-full bg-white w-[45px]"></div>
//             <div className="flex flex-col leading-tight">
//                <p className="font-semibold">Alissa Millarneaux</p>
//                <p className="text-sm">Sansiri</p>
//                <p className="text-sm">Marketing Executives</p>
//             </div>
//          </div>
//          <Contact className="text-tertiary aspect-square w-7" />
//       </div>
//    );
// };

// interface SidebarButtonProps extends React.HTMLAttributes<HTMLDivElement> {
//    icon: React.ReactNode;
//    label: string;
// }
