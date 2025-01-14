import React from 'react';
import DocumentPageLayout from 'src/components/page-elements/documents/DocumentPageLayout';

const DocumentPage: React.FC = () => {
   return (
      <section className="flex w-full h-full sm:flex-col">
         <DocumentPageLayout />
      </section>
   );
};

export default DocumentPage;