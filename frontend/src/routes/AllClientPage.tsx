import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import ClientColumn from 'src/components/page-elements/all-clients/ClientPageClient';
import ContactColumn from 'src/components/page-elements/all-clients/ClientPageContact';

export default function AllClientsPage() {
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   // check if user has visited the page
   if (localStorage.getItem('client') !== 'visited') {
      setWelcomeDialogState({ isOpen: true, page: 'allClientsPage' });
   }

   return (
      <section className=" flex gap-2 sm:flex-col h-full w-full">
         <ClientColumn />
         <ContactColumn />
      </section>
   );
}
