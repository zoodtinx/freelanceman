import React from 'react';
import DocumentPageLayout from 'src/components/page-elements/documents/DocumentPageLayout';
import { Outlet } from 'react-router-dom';

const DocumentPage: React.FC = () => {
   return (
      <section className="flex w-full h-full sm:flex-col">
         <Outlet />
      </section>
   );
};

export default DocumentPage;