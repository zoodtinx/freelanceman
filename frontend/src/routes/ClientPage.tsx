import ClientColumn from 'src/components/page-elements/clients/ClientColumn';
import ContactColumn from 'src/components/page-elements/clients/ContactColumn';

export default function ClientsPage() {

   return (
      <section className="w-full h-full flex gap-2 sm:flex-col">
         <ClientColumn />
         <ContactColumn />
      </section>
   );
}