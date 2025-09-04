import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import FilePageLayout from '@/components/page-elements/files-page/FilePageLayout';
import { useEffect } from 'react';

const FilePage = (): JSX.Element => {
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   // check if user has visited the page
   useEffect(() => {
      if (localStorage.getItem('files') !== 'visited') {
        setWelcomeDialogState({ isOpen: true, page: 'filesPage' });
      }
    }, []);

   return (
      <section className="flex w-full h-full sm:flex-col sm:pt-0 p-2">
         <FilePageLayout />
      </section>
   );
};

export default FilePage;
