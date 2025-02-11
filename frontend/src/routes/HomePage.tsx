import TopBar from '@/components/page-elements/app-layout/topbar/TopBar';
import SideBar from '@/components/page-elements/app-layout/sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import FormDialog from '@/components/shared/ui/FormDialog';

export default function HomePage() {
   return (
      <div className="bg-background w-auto h-screen flex flex-col sm:min-h-screen relative">
         <TopBar />
         <main className="flex flex-grow min-h-0 px-2 pb-3 gap-2 sm:px-2 sm:pb-2 relative">
            <SideBar />
            <section className="flex-grow max-w-screen-lg w-full mx-auto min-h-0 flex">
               <Outlet />
            </section>
         </main>
         <FormDialog />
      </div>
   );
}
