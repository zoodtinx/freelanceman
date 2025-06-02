import { useUserQuery } from '@/lib/api/user-api';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import FilePageLayout from 'src/components/page-elements/files/FilePageLayout';

const FilePage = (): JSX.Element => {
   const { data: userData } = useUserQuery();
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   if (userData?.visitingStatus?.filesPage === false) {
      setWelcomeDialogState({ isOpen: true, page: 'filesPage' });
   }

   return (
      <section className="flex w-full h-full sm:flex-col">
         <FilePageLayout />
      </section>
   );
};

export default FilePage;
