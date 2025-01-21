import ClientColumn from 'src/components/page-elements/all-clients/ClientColumn';
import ContactColumn from 'src/components/page-elements/all-clients/ContactColumn';

export default function AllClientsPage() {

   return (
      <section className="w-full h-full flex gap-2 sm:flex-col">
         <ClientColumn />
         <ContactColumn />
      </section>
   );
}