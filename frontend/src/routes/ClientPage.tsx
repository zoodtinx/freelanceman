import ContactColumn from '@/components/pages/clients/ContactColumn';
import { Outlet } from 'react-router-dom';

export default function ClientsPage() {
   return (
      <section className="w-full h-full flex gap-2 sm:flex-col">
         <div className="flex flex-col rounded-[30px] bg-foreground p-4 pt-5 h-full gap-[6px] grow">
            <Outlet />
         </div>
         <ContactColumn />
      </section>
   );
}
