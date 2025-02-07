import ClientColumn from 'src/components/page-elements/all-clients/ClientColumn';
import ContactColumn from 'src/components/page-elements/all-clients/ContactColumn';

export default function AllClientsPage() {

   return (
      <section className=" flex gap-2 sm:flex-col grow">
         <ClientColumn />
         <ContactColumn />
      </section>
   );
}