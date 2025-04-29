import { Button } from '@/components/shared/ui/primitives/Button';
import { SalesDocumentPayload } from 'freelanceman-common/src/schemas';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ProjectInfoField from '@/components/page-elements/documents/ProjectInfoField';
import FreelancerInfoField from '@/components/page-elements/documents/FreelancerInfoField';
import ClientInfoField from '@/components/page-elements/documents/ClientInfoField';
import ItemsField from '@/components/page-elements/documents/ItemsField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSalesDocumentQuery } from 'src/lib/api/sales-document-api';
import { FilePlus2, LoaderCircle } from 'lucide-react';
import SelectorDialog from 'src/components/shared/ui/dialogs/selector-dialog/SelectorDialog';
import { toast } from 'sonner';

const SalesDocumentBuilderPage = ({
   category,
}: {
   category?: 'quotation' | 'invoice' | 'receipt';
}) => {
   const navigate = useNavigate();
   const [isApiLoading, setIsApiLoading] = useState<any>({
      isLoading: false,
      type: 'delete',
   });
   const [mode, setMode] = useState<any>('delete');
   const formMethods = useForm<SalesDocumentPayload>({});
   const documentId = useParams()?.id;
   const { data: salesDocumentData, isLoading } = useSalesDocumentQuery(
      documentId || ''
   );

   useEffect(() => {
      if (salesDocumentData) {
         formMethods.reset(salesDocumentData);
      }
   }, [salesDocumentData, formMethods, documentId]);

   if (documentId && isLoading) {
      return <div>Loading...</div>;
   }

   const { handleSubmit, getValues } = formMethods;

   const onSubmit = (data: SalesDocumentPayload) => {
      console.log(data);
   };

   const documentCategory = category ? category : getValues('category');

   const handleDiscard = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate('/home/income');
   };

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
               <div className="flex gap-2">
               <SalesDocButton isApiLoading={isApiLoading} mode='delete'>
                     Delete
                  </SalesDocButton>
                  <Button
                     onClick={handleDiscard}
                     variant={'destructiveOutline'}
                  >
                     Discard Changes
                  </Button>
               </div>
               <div className="flex gap-2">
                  <Button
                     variant={'default'}
                     className="flex gap-1"
                     onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        toast.success('Ballerina Ballerina Ballerina', {
                           
                        });
                     }}
                  >
                     <FilePlus2 className="w-4 h-4" />
                     <p>Create PDF</p>
                  </Button>
                  <SalesDocButton isApiLoading={isApiLoading} mode='save'>
                     Save Draft
                  </SalesDocButton>
               </div>
            </footer>
         </form>
         <SelectorDialog />
      </div>
   );
};

export const SalesDocButton = ({
   isApiLoading,
   mode,
   children,
}: {
   isApiLoading: {
      isLoading: boolean;
      type: 'delete' | 'save';
   };
   mode: 'delete' | 'save';
   children: string;
}) => {
   return (
      <Button variant={mode === 'save' ? 'submit' : 'destructive'} className="flex gap-1 transition-all">
         {isApiLoading.type === mode && isApiLoading.isLoading && (
            <LoaderCircle className="w-4 h-4 animate-spin transition-all" />
         )}
         {children}
      </Button>
   );
};

export default SalesDocumentBuilderPage;
