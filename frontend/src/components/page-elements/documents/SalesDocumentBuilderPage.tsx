import { Button } from '@/components/shared/ui/primitives/Button';
import { SalesDocumentPayload } from 'freelanceman-common/src/schemas';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import ProjectInfoField from '@/components/page-elements/documents/ProjectInfoField';
import FreelancerInfoField from '@/components/page-elements/documents/FreelancerInfoField';
import ClientInfoField from '@/components/page-elements/documents/ClientInfoField';
import ItemsField from '@/components/page-elements/documents/ItemsField';

import { Link, useParams } from 'react-router-dom';
import { useSalesDocumentQuery } from 'src/lib/api/sales-document-api';
import { FilePlus2 } from 'lucide-react';
import SelectorDialog from 'src/components/shared/ui/dialogs/selector-dialog/SelectorDialog';

const SalesDocumentBuilderPage = ({
   category,
}: {
   category?: 'quotation' | 'invoice' | 'receipt';
}) => {
   const formMethods = useForm<SalesDocumentPayload>({});
   const params = useParams();
   const documentId = params.id;
   const { data: salesDocumentData, isLoading } = useSalesDocumentQuery(
      documentId || ''
   );

   useEffect(() => {
      if (salesDocumentData) {
         formMethods.reset(salesDocumentData);
      }
   }, [salesDocumentData, formMethods, params]);

   if (documentId && isLoading) {
      return <div>Loading...</div>;
   }

   const { handleSubmit, getValues } = formMethods;

   const onSubmit = (data: SalesDocumentPayload) => {
      console.log(data);
   };

   const documentCategory = category ? category : getValues('category');

   return (
      <div className="flex flex-col w-full grow bg-foreground rounded-[20px] p-4 pt-3 sm:w-full h-full shrink-0 shadow-md gap-3 overflow-y-auto">
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
         </div>
         <form
            className="flex flex-col grow gap-3"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className="flex grow gap-3">
               <div className="flex flex-col w-1/2  gap-3">
                  <ProjectInfoField formMethods={formMethods} />
                  <FreelancerInfoField formMethods={formMethods} />
                  <ClientInfoField formMethods={formMethods} />
               </div>
               <div className="flex flex-col w-1/2  gap-3">
                  <ItemsField formMethods={formMethods} />
               </div>
            </div>
            <footer className="flex justify-between shrink-0">
               <div>
                  <Button variant={'destructive'}>Delete</Button>
               </div>
               <div className="flex gap-2">
                  <Button
                     type="submit"
                     variant={'submit'}
                     className="bg-freelanceman-cyan text-freelanceman-darkgrey"
                  >
                     Create PDF
                  </Button>
                  <Button variant={'outline'}>Save Draft</Button>
               </div>
            </footer>
         </form>
         <SelectorDialog />
      </div>
   );
};

export default SalesDocumentBuilderPage;
