import { Button } from '@/components/shared/ui/primitives/Button';
import { SalesDocument } from '@types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ProjectInfoField from '@/components/page-elements/documents/ProjectInfoField';
import FreelancerInfoField from '@/components/page-elements/documents/FreelancerInfoField';
import ClientInfoField from '@/components/page-elements/documents/ClientInfoField';
import ItemsField from '@/components/page-elements/documents/ItemsField';

import { useParams } from 'react-router-dom';
import { useDocumentDraftQuery } from '@/lib/api/document-draft-api';

const CreateDocumentPage: React.FC = () => {
   const formMethods = useForm<SalesDocument>({});
   const params = useParams();
   const { data: draft, isLoading } = useDocumentDraftQuery(params.draftId || '');

   useEffect(() => {
      if (params.draftId && draft) {
         formMethods.reset(draft);
      }
   }, [draft, formMethods, params.draftId]);

   if (isLoading) {
      return <div>Loading...</div>
   }

   const { handleSubmit } = formMethods;

   const onSubmit = (data: SalesDocument) => {
      console.log(data);
   };

   return (
      <>
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
            <footer className="flex pb-2 justify-between">
               <div>
                  <Button variant={'destructive'}>Delete</Button>
               </div>
               <div className="flex gap-2">
                  <Button variant={'outline'}>Save Draft</Button>
                  <Button 
                     type="submit" 
                     variant={'submit'} 
                     className='bg-freelanceman-cyan text-freelanceman-darkgrey'>
                        Create PDF
                  </Button>
               </div>
            </footer>
         </form>
      </>
   );
};

export default CreateDocumentPage;
