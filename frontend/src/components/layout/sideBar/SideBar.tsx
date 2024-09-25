import SideBarTab from './SideBarTab';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import {
   goToActionsPage,
   goToClientsPage,
   goToDocumentsPage,
   goToFilesPage,
   goToProjectPage,
} from '@/lib/redux/slices/activePageSlice';
import PinnedProjects from './PinnedProjects';

export default function SideBar() {
   const activePage = useSelector((state: RootState) => state.activePage);
   const dispatch = useDispatch();

   return (
      <nav className="max-w-[230px] w-full flex flex-col gap-2 h-full justify-between px-3 md:w-fit sm:hidden">
         <div className="flex flex-col gap-5">
            <ul className="mb-2 flex flex-col gap-1">
               <SideBarTab
                  tab="projects"
                  activeTab={activePage}
                  onClick={() => dispatch(goToProjectPage())}
               />
               <SideBarTab
                  tab="actions"
                  activeTab={activePage}
                  onClick={() => dispatch(goToActionsPage())}
               />
               <SideBarTab
                  tab="clients"
                  activeTab={activePage}
                  onClick={() => dispatch(goToClientsPage())}
               />
               <SideBarTab
                  tab="files"
                  activeTab={activePage}
                  onClick={() => dispatch(goToFilesPage())}
               />
               <SideBarTab
                  tab="documents"
                  activeTab={activePage}
                  onClick={() => dispatch(goToDocumentsPage())}
               />
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