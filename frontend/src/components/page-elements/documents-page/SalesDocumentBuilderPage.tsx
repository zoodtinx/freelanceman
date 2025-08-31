import { Button } from '@/components/shared/ui/primitives/Button';
import React, { useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import ProjectInfoField from '@/components/page-elements/documents-page/ProjectInfoField';
import FreelancerInfoField from '@/components/page-elements/documents-page/FreelancerInfoField';
import ClientInfoField from '@/components/page-elements/documents-page/ClientInfoField';
import ItemsField from '@/components/page-elements/documents-page/ItemsField';
import { useNavigate, useParams } from 'react-router-dom';
import {
   useCreateSalesDocument,
   useDeleteSalesDocument,
   useEditSalesDocument,
   useSalesDocumentQuery,
} from 'src/lib/api/sales-document-api';
import {
   ArrowLeft,
   FilePlus2,
   Loader2,
   LoaderCircle,
   Trash,
   X,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/helper/utils';
import {
   getCreateSalesDocumentPayload,
   getEditSalesDocumentPayload,
} from '@/components/page-elements/documents-page/helper';
import { useProjectQuery } from '@/lib/api/project-api';
import { defaultCreateSalesDocumentValue } from '@/components/shared/ui/helpers/constants/default-values';
import { capitalizeFirstChar } from '@/components/shared/ui/helpers/Helpers';
import { useUserQuery } from '@/lib/api/user-api';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import { SalesDocumentFindOneResponse } from 'freelanceman-common';
import CreatePDFButton, { ViewerComponent } from '@/lib/pdf-generator/CreatePDF';

const SalesDocumentBuilderPage = ({
   category,
}: {
   category?: 'quotation' | 'invoice' | 'receipt';
}) => {
   // --- Hooks: Router, State ---
   const documentId = useParams()?.id;
   const projectId = useParams()?.projectId;
   const isEditMode = Boolean(documentId);
   const navigate = useNavigate();

   const [isApiLoading, setIsApiLoading] = useState<any>({
      isLoading: false,
      type: 'delete',
   });

   // --- Form and Queries ---
   const formMethods = useForm<SalesDocumentFindOneResponse>({});
   const { data: salesDocumentData, isFetching: isDocLoading } =
      useSalesDocumentQuery(documentId ?? '', isEditMode);
   const { data: projectData, isFetching: isProjectDataLoading } =
      useProjectQuery(projectId ?? '', !isEditMode);
   const { data: userData, isFetching: isUserDataLoading } = useUserQuery(
      !isEditMode
   );

   // --- Welcome Dialog ---
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   if (localStorage.getItem('documentbuilder') !== 'visited') {
      setWelcomeDialogState({ isOpen: true, page: 'documentBuilderPage' });
   }

   // --- Mutation Hooks ---
   const createSalesDoc = useCreateSalesDocument();
   const editSalesDoc = useEditSalesDocument();
   const deleteSalesDoc = useDeleteSalesDocument();
   // const createPdf = useCreatePdf();

   const isLoading =
      isDocLoading ||
      isProjectDataLoading ||
      isUserDataLoading ||
      createSalesDoc.isPending ||
      editSalesDoc.isPending;

   // --- Form Pre-fill ---
   useEffect(() => {
      if (salesDocumentData) {
         formMethods.reset(salesDocumentData);
      }

      if (projectData) {
         formMethods.reset(defaultCreateSalesDocumentValue);
         formMethods.setValue('currency', userData.currency);
         formMethods.setValue('freelancerName', userData.displayName);
         formMethods.setValue('freelancerTaxId', userData.taxId);
         formMethods.setValue('freelancerPhone', userData.phoneNumber);
         formMethods.setValue('freelancerEmail', userData.email);
         formMethods.setValue('freelancerAddress', userData.address);
         formMethods.setValue('category', category!);
         formMethods.setValue('issuedAt', new Date().toISOString());
         formMethods.setValue('number', '1');
         formMethods.setValue('projectId', projectData.id);
         formMethods.setValue('projectTitle', projectData.name);
         formMethods.setValue('clientId', projectData.client?.id);
         formMethods.setValue('clientName', projectData.client?.name);
         formMethods.setValue('clientTaxId', projectData.client?.taxId);
         formMethods.setValue('clientPhone', projectData.client?.phoneNumber);
         formMethods.setValue('clientAddress', projectData.client?.address);
      }
   }, [salesDocumentData, formMethods, documentId, projectData, userData]);

   // --- Form Submit Handlers ---
   const {
      handleSubmit,
      getValues,
      formState: { isDirty },
   } = formMethods;

   const onSubmit = async (data: SalesDocumentFindOneResponse) => {
      if (!data.items || data.items?.length === 0) {
         formMethods.setError('items', {
            type: 'manual',
            message: 'At least one item is required',
         });
         return;
      }
      toast.loading('Saving document...');
      setIsApiLoading({ type: 'submit', isLoading: true });

      if (!isEditMode) {
         const payload = getCreateSalesDocumentPayload(data);
         const result = await createSalesDoc.mutateAsync(payload);
         navigate(`/home/income/document/${result.id}`);
      } else {
         const payload = getEditSalesDocumentPayload(data);
         await editSalesDoc.mutateAsync(payload);
      }

      setIsApiLoading({ type: 'submit', isLoading: false });
      toast.success('Document saved');
   };

   const handleDiscard = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate('/home/income');
   };

   const handleDelete = async (e: React.MouseEvent) => {
      e.preventDefault();

      toast.loading('Deleting document...');
      await deleteSalesDoc.mutateAsync(salesDocumentData.id);
      toast.success('Document deleted');
      navigate('/home/income');
   };

   const documentCategory = category ?? getValues('category');

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[20px] p-3 pt-3 sm:w-full h-full shrink-0 shadow-md gap-3 overflow-hidden relative overflow-y-auto">
         {/* Header */}
         <div className="flex justify-between items-center h-fit">
            <div className="flex gap-1 items-center">
               <FilePlus2 className="h-6 w-6 mt-1" />
               <div className="flex text-xl pt-1 leading-none mr-2 gap-2">
                  <p>Create</p>
                  {isLoading ? (
                     <Loader2 className="text-primary animate-spin" />
                  ) : (
                     <p>{capitalizeFirstChar(documentCategory)}</p>
                  )}
               </div>
            </div>
            <X
               className="w-5 h-5 stroke-[3px] transition-opacity opacity-35 hover:opacity-100 cursor-pointer"
               onClick={() => navigate('/home/income')}
            />
         </div>
         <form
            className="flex flex-col grow gap-3 sm:flex-col w-full shrink"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className="flex flex-1 gap-3 overflow-hidden sm:flex-col">
               <div className="flex flex-col h-full w-1/2 gap-3 sm:flex-col sm:w-full">
                  <ProjectInfoField formMethods={formMethods} />
                  <FreelancerInfoField formMethods={formMethods} />
                  <ClientInfoField formMethods={formMethods} />
               </div>
               <div className="flex flex-col w-1/2 gap-3 sm:w-full">
                  <ItemsField formMethods={formMethods} />
               </div>
            </div>
            <footer className="flex justify-between shrink-0 h-fit">
               <div className="flex gap-2">
                  <Button
                     onClick={handleDiscard}
                     variant="destructiveOutline"
                     className="gap-1"
                  >
                     <ArrowLeft className="w-4 h-4" />
                     Back
                  </Button>
                  {salesDocumentData && (
                     <Button
                        onClick={handleDelete}
                        variant="destructive"
                        className="gap-1"
                     >
                        <Trash className="w-4 h-4" />
                        Delete
                     </Button>
                  )}
               </div>
               <div className="flex gap-2">
                  <CreatePDFButton enable={!isDirty} data={formMethods.getValues()} />
                  <SubmitButton
                     isApiLoading={isApiLoading}
                     formMethods={formMethods}
                  />
               </div>
            </footer>
         </form>
      </div>
   );
};

export const DiscardButton = ({
   onClick,
   isApiLoading,
}: {
   onClick: (e: React.MouseEvent) => void;
   isApiLoading: {
      isLoading: boolean;
      type: 'delete' | 'save';
   };
}) => {
   const isLoading = isApiLoading?.isLoading;
   const isDiscarding = isLoading && isApiLoading?.type === 'delete';

   const getVariant = () => {
      if (!isLoading || isDiscarding) return 'destructive';
      return 'destructiveOutline';
   };

   return (
      <Button variant={getVariant()} className="gap-1" onClick={onClick}>
         {isDiscarding && <LoaderCircle className="w-4 h-4 animate-spin" />}
         Delete
      </Button>
   );
};

export const SubmitButton = ({
   isApiLoading,
   formMethods,
}: {
   isApiLoading: {
      isLoading: boolean;
      type: 'delete' | 'save';
   };
   formMethods: UseFormReturn<any>;
}) => {
   const {
      formState: { isDirty },
   } = formMethods;

   const isLoading = isApiLoading?.isLoading;
   const isSubmitting =
      isApiLoading?.isLoading && isApiLoading?.type === 'save';

   const getVariant = () => {
      // If the form is not filled, show as 'ghost'
      if (!isDirty) {
         return 'ghost';
      }
      // If not loading or currently submitting, show as 'submit'
      if (!isLoading || isSubmitting) {
         return 'submit';
      }
      // Otherwise, fallback to 'ghost'
      return 'ghost';
   };

   const variant = getVariant();

   const handleClick = () => {};

   return (
      <Button
         variant={variant}
         type="submit"
         className={cn('gap-1 items-center', !isDirty && 'cursor-not-allowed')}
         onClick={handleClick}
      >
         {isSubmitting && <LoaderCircle className="w-4 h-4 animate-spin" />}
         Save Draft
      </Button>
   );
};

export default SalesDocumentBuilderPage;
