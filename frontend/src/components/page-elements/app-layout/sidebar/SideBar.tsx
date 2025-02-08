import SideBarTab from './SideBarTab';
import PinnedProjects from './PinnedProjects';

export default function SideBar() {

   return (
      <nav className="w-[180px] flex flex-col gap-2 h-full justify-between md:w-fit sm:hidden">
         <div className="flex flex-col gap-5">
            <ul className="mb-2 flex flex-col">
               <SideBarTab tab="projects" />
               <SideBarTab tab="actions" />
               <SideBarTab tab="clients" />
               <SideBarTab tab="partners" />
               <SideBarTab tab="files" />
               <SideBarTab tab="documents" />
            </ul>
            <PinnedProjects />
         </div>
         <div className="flex justify-center w-full mb-8">
            <div className="bg-primary rounded-full w-16 aspect-square flex items-center justify-center text-white md:w-full">
               Add
            </div>
         </div>
      </nav>
   );
}