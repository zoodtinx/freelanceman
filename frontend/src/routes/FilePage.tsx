import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import FilePageLayout from '@/components/page-elements/files-page/FilePageLayout';

const FilePage = (): JSX.Element => {
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   // check if user has visited the page
   if (localStorage.getItem('files') !== 'visited') {
      setWelcomeDialogState({ isOpen: true, page: 'filesPage' });
   }

   return (
      <section className="flex w-full h-full sm:flex-col">
         <FilePageLayout />
      </section>
   );
};

export default FilePage;
