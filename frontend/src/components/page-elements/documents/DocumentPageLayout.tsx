import { useLocation } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import { FileText, Plus, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { FileSection, DraftSection } from '@/components/page-elements/documents/DocumentPageViewMode';
import AddButton from '@/components/shared/ui/AddButton';

const DocumentPageLayout: React.FC = () => {
   const location = useLocation();
   const pathnameArray = location.pathname.split('/').filter((path) => path);
   const filteredPathnameArray = pathnameArray.slice(2);

   return (
      <div className="flex w-full grow bg-foreground rounded-[20px] p-4 pt-3 sm:w-full h-full shrink-0 shadow-md gap-3">
         <div className="flex flex-col grow">
            <div className='flex justify-between'>
               <div className="flex gap-1">
                  <FileText className="h-6 w-6 mt-1" />
                  <Link
                     to={'/home/documents'}
                     className="text-xl pt-1 leading-none mr-2"
                  >
                     Documents
                  </Link>
               </div>
               <AddButton />
            </div>
            <FileSection />
         </div>
         <DraftSection />
      </div>
   );
};

export default DocumentPageLayout;
