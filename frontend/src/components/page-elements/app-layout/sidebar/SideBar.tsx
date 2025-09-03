import SideBarTab from './SideBarTab';
import PinnedProjects from './PinnedProjects';

export default function SideBar() {
   return (
      <nav className="w-full flex flex-col gap-2 justify-between md:w-fit sm:hidden">
         <div className="flex flex-col gap-3">
            <ul className="mb-2 flex flex-col bg-quaternary md:p-[6px] lg:p-[6px] gap-1 rounded-xl">
               <SideBarTab tab="projects" />
               <SideBarTab tab="actions" />
               <SideBarTab tab="clients" />
               <SideBarTab tab="partners" />
               <SideBarTab tab="files" />
               <SideBarTab tab="income" />
            </ul>
         </div>
         <div className='overflow-y-auto hidden xl:block '>
            <PinnedProjects />
         </div>
      </nav>
   );
}
