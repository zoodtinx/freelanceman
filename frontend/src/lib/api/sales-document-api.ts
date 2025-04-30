import {
   editSalesDocument,
   getSalesDocument,
   createSalesDocument,
   deleteSalesDocument,
   createPdf
} from './services/sales-document-service';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';

export const useSalesDocumentApi = () => {
   return {
      createSalesDocument: useCreateSalesDocument(),
      deleteSalesDocument: useDeleteSalesDocument(),
      editSalesDocument: useEditSalesDocument(),
   };
};

export const useSalesDocumentQuery = (
   salesDocumentId: string,
   enabled?: boolean
) => {
   return useAppQuery(
      ['salesDocuments', salesDocumentId],
      (token) => getSalesDocument(token, salesDocumentId),
      enabled
   );
};

export const useCreateSalesDocument = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
         {
            mutationKey: 'createSalesDocument',
            invalidationKeys: ['salesDocument'],
            mutationFn: createSalesDocument,
         },
         callbacks
      );
}
export const useEditSalesDocument = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
     {
       mutationKey: 'editSalesDocument',
       invalidationKeys: ['salesDocument'],
       mutationFn: editSalesDocument,
     },
     callbacks
   );
 };
 
 export const useDeleteSalesDocument = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
     {
       mutationKey: 'deleteSalesDocument',
       invalidationKeys: ['salesDocument'],
       mutationFn: deleteSalesDocument,
     },
     callbacks
   );
 };
 
 export const useCreatePdf = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
     {
       mutationKey: 'createPdf',
       invalidationKeys: ['salesDocument'],
       mutationFn: createPdf,
     },
     callbacks
   );
 };
 