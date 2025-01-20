import React from 'react';
import QuickNotesPageLayout from '@/components/page-elements/quick-notes/QuickNotePageLayout';

const QuickNotesPage: React.FC = () => {
   return (
      <section className="flex w-full h-full sm:flex-col">
         <QuickNotesPageLayout />
      </section>
   );
};

export default QuickNotesPage;