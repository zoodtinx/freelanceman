import ClientColumn from '@/components/pages/clients/ClientColumn';
import ContactColumn from '@/components/pages/clients/ContactColumn';
import { Outlet } from 'react-router-dom';

export default function ClientsPage() {

   return (
      <section className="w-full h-full flex gap-2 sm:flex-col">
         <ClientColumn />
         <ContactColumn />
      </section>
   );
}