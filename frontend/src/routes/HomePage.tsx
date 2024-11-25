import TopBar from '@/components/layout/topbar/TopBar';
import SideBar from '@/components/layout/sidebar/SideBar';
import { Outlet } from 'react-router-dom';

export default function HomePage() {
   return (
      <div className="bg-background w-auto h-screen flex flex-col sm:min-h-screen relative">
         <TopBar />
         <main className="flex h-[calc(100vh-90px)] px-3 pb-3 gap-3 sm:px-2 sm:pb-2 relative">
            <SideBar />
            <Outlet />
         </main>
      </div>
   );
}


