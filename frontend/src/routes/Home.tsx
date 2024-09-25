import TopBar from '@/components/layout/topBar/TopBar';
import SideBar from '@/components/layout/sideBar/SideBar';
import { Outlet } from 'react-router-dom';

export default function Home() {
   return (
      <div className="bg-background w-auto h-screen flex flex-col sm:h-[2000px] relative">
         <TopBar />
         <main className="flex h-full">
            <SideBar />
            <Outlet />
         </main>
      </div>
   );
}
