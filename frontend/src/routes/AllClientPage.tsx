import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import ClientColumn from '@/components/page-elements/all-clients-page/ClientPageClient';
import ContactColumn from '@/components/page-elements/all-clients-page/ClientPageContact';
import { useEffect } from 'react';

export default function AllClientsPage() {
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   // check if user has visited the page
   useEffect(() => {
      if (localStorage.getItem('clients') !== 'visited') {
        setWelcomeDialogState({ isOpen: true, page: 'allClientsPage' });
      }
    }, []);

   return (
      <section className=" flex gap-2 sm:flex-col h-full w-full">
         <ClientColumn />
         <ContactColumn />
      </section>
   );
}
