import { Button } from '@/components/shared/ui/primitives/Button';
import { SalesDocument } from '@types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ProjectInfoField from '@/components/page-elements/documents/ProjectInfoField';
import FreelancerInfoField from '@/components/page-elements/documents/FreelancerInfoField';
import ClientInfoField from '@/components/page-elements/documents/ClientInfoField';
import ItemsField from '@/components/page-elements/documents/ItemsField';

import { Link, useParams } from 'react-router-dom';
import { useDocumentDraftQuery } from '@/lib/api/document-draft-api';
import { FilePlus2, FileText } from 'lucide-react';
import SelectorDialog from '@/components/shared/ui/SelectorDialog';

const DocumentPageCreateMode: React.FC = () => {
   const formMethods = useForm<SalesDocument>({});
   const params = useParams();
   const { data: draft, isLoading } = useDocumentDraftQuery({
      id: params.draftId,
   });

   useEffect(() => {
      if (params.draftId && draft) {
         formMethods.reset(draft[0]);
      }
   }, [draft, formMethods, params]);

   if (isLoading) {
      return <div>Loading...</div>;
   }

   const { handleSubmit } = formMethods;

   const onSubmit = (data: SalesDocument) => {};

   const breadcrumb = () => {
      return 'Hello';
   };

   const projectTitle = formMethods.watch('projectTitle')
   const category = formMethods.watch('category')
   console.log('value', projectTitle, category)
   console.log('fetched draft', draft)

   const documentCategory = 'Quotation';

   return (
      <div className="flex flex-col w-full grow bg-foreground rounded-[20px] p-4 pt-3 sm:w-full h-full shrink-0 shadow-md gap-3">
         <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
               <FilePlus2 className="h-6 w-6 mt-1" />
               <Link
                  to={'/home/documents'}
                  className="flex text-xl pt-1 leading-none mr-2 gap-2"
               >
                  <p>Create</p>
                  <p>{documentCategory}</p>
               </Link>
            </div>
            <div className='border border-white rounded-lg p-1 px-2'>
               Import Data
            </div>
         </div>
         <form
            className="flex flex-col grow gap-3"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className="flex grow gap-3">
               <div className="flex flex-col w-1/2 h-full gap-3">
                  <ProjectInfoField formMethods={formMethods} />
                  <FreelancerInfoField formMethods={formMethods} />
                  <ClientInfoField formMethods={formMethods} />
               </div>
               <div className="flex flex-col w-1/2 h-full gap-3">
                  <ItemsField formMethods={formMethods} />
               </div>
            </div>
            <footer className="flex  justify-between">
               <div>
                  <Button variant={'destructive'}>Delete</Button>
               </div>
               <div className="flex gap-2">
                  <Button variant={'outline'}>Save Draft</Button>
                  <Button
                     type="submit"
                     variant={'submit'}
                     className="bg-freelanceman-cyan text-freelanceman-darkgrey"
                  >
                     Create PDF
                  </Button>
               </div>
            </footer>
         </form>
         <SelectorDialog />
      </div>
   );
};

export default DocumentPageCreateMode;
