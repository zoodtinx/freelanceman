import SideBarTab from './SideBarTab';
import PinnedProjects from './PinnedProjects';
import GlobalAddButton from '@/components/page-elements/app-layout/sidebar/GlobalAddButton';

export default function SideBar() {
   return (
      <nav className="w-[180px] flex flex-col gap-2 h-full justify-between md:w-fit sm:hidden px-1">
         <div className="flex flex-col gap-3">
            <ul className="mb-2 flex flex-col bg-quaternary p-2 gap-1 rounded-xl">
               <SideBarTab tab="projects" />
               <SideBarTab tab="actions" />
               <SideBarTab tab="clients" />
               <SideBarTab tab="partners" />
               <SideBarTab tab="files" />
               <SideBarTab tab="income" />
            </ul>
         </div>
         <div className='grow overflow-y-auto'>
            <PinnedProjects />
         </div>
         <div className="flex flex-col gap-5 items-center w-full mb-5 shrink-0">
            <GlobalAddButton />
         </div>
      </nav>
   );
}
