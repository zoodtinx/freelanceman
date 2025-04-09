import SideBarTab from './SideBarTab';
import PinnedProjects from './PinnedProjects';
import GlobalAddButton from '@/components/page-elements/app-layout/sidebar/GlobalAddButton';

export default function SideBar() {
   return (
      <nav className="w-[180px] flex flex-col gap-2 h-full justify-between md:w-fit sm:hidden">
         <div className="flex flex-col gap-4">
            <ul className="mb-2 flex flex-col">
               <SideBarTab tab="projects" />
               <SideBarTab tab="actions" />
               <SideBarTab tab="clients" />
               <SideBarTab tab="partners" />
               <SideBarTab tab="files" />
               <SideBarTab tab="income" />
            </ul>
            {/* <PinnedProjects /> */}
         </div>
         <div className="flex flex-col gap-5 items-center w-full mb-5">
            <GlobalAddButton />
         </div>
      </nav>
   );
}

