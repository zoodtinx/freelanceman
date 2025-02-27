import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editSalesDocument,
   getSalesDocument,
   getAllSalesDocuments,
   createSalesDocument,
   deleteSalesDocument,
} from './mock/mock-document-draft-service';
import type { CreateSalesDocumentDto, EditSalesDocumentDto, SalesDocument, SalesDocumentSearchOption } from '@types';


export const useSalesDocumentApi = () => {
   return {
      createSalesDocument: useCreateSalesDocument(),
      deleteSalesDocument: useDeleteSalesDocument(),
      editSalesDocument: useEditSalesDocument()
   }
}


export const useAllSalesDocumentsQuery = (searchOptions: SalesDocumentSearchOption = {}) => {
   return useQuery({
      queryKey: ['salesDocuments', searchOptions],
      queryFn: () => getAllSalesDocuments(searchOptions),
   });
};


export const useSalesDocumentsQuery = (searchOptions: SalesDocumentSearchOption = {}) => {
   return useQuery({
      queryKey: ['salesDocuments', JSON.stringify(searchOptions)],
      queryFn: () => getAllSalesDocuments(searchOptions),
   });
};


export const useSalesDocumentQuery = (salesDocumentId: string) => {
   return useQuery<SalesDocument, Error, SalesDocument>({
      queryKey: ['salesDocuments', salesDocumentId],
      queryFn: () => getSalesDocument(salesDocumentId),
   });
};

export const useSalesDocumentSelectionQuery = (searchOptions: SalesDocumentSearchOption = {}) => {
   const queryClient = useQueryClient();

   return useQuery({
      queryKey: ['salesDocumentSelection', JSON.stringify(searchOptions)], 
      queryFn: async () => {
         const cachedSalesDocuments = queryClient.getQueryData<SalesDocument[]>(['salesDocuments', JSON.stringify(searchOptions)]);
         
         if (cachedSalesDocuments) {
            return cachedSalesDocuments.map(doc => ({
               value: doc.id, 
               label: doc.title 
            }));
         }

         const salesDocuments = await getAllSalesDocuments(searchOptions);
         return salesDocuments.map(doc => ({
            value: doc.id, 
            label: doc.title 
         }));
      },
   });
};

export const useCreateSalesDocument = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createSalesDocument'],
      mutationFn: async (newSalesDocument: CreateSalesDocumentDto) => await createSalesDocument(newSalesDocument),
      onMutate: async (newSalesDocument: CreateSalesDocumentDto) => {
         await queryClient.cancelQueries({ queryKey: ['salesDocuments'] });
         const previousSalesDocuments = queryClient.getQueryData(['salesDocuments']);

         queryClient.setQueryData(['salesDocuments'], (old: SalesDocument[]) => [
            ...(old || []),
            { ...newSalesDocument, id: 'temp-id' },
         ]);

         return { previousSalesDocuments };
      },
      onError: (err, newSalesDocument, context) => {
         console.log('New sales document ', newSalesDocument);
         console.log(err);
         if (context?.previousSalesDocuments) {
            queryClient.setQueryData(['salesDocuments'], context.previousSalesDocuments);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['salesDocuments'] });
      },
   });
};


interface EditSalesDocumentMutationPayload {
   salesDocumentId: string;
   salesDocumentPayload: EditSalesDocumentDto;
}

export const useEditSalesDocument = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['editSalesDocument'],
      mutationFn: async ({ salesDocumentId, salesDocumentPayload }: EditSalesDocumentMutationPayload) => {
         await editSalesDocument(salesDocumentId, salesDocumentPayload);
      },
      onMutate: async ({ salesDocumentId, salesDocumentPayload }) => {
         await queryClient.cancelQueries({ queryKey: ['salesDocuments'] });
         const previousSalesDocuments = queryClient.getQueryData(['salesDocuments']);

         if (previousSalesDocuments) {
            queryClient.setQueryData(['salesDocuments'], (old: SalesDocument[]) =>
               old?.map((salesDocument) => (salesDocument.id === salesDocumentId ? salesDocumentPayload : salesDocument))
            );
         }

         return { previousSalesDocuments };
      },
      onError: (err, newSalesDocumentPayload, context) => {
         console.log('New sales document ', newSalesDocumentPayload);
         console.log(err);
         if (context?.previousSalesDocuments) {
            queryClient.setQueryData(['salesDocuments'], context.previousSalesDocuments);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['salesDocuments'] });
      },
   });
};


export const useDeleteSalesDocument = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['deleteSalesDocument'],
      mutationFn: async (salesDocumentId: string) => {
         await deleteSalesDocument(salesDocumentId);
      },
      onMutate: async (salesDocumentId: string) => {
         await queryClient.cancelQueries({ queryKey: ['salesDocuments'] });
         const previousSalesDocuments = queryClient.getQueryData(['salesDocuments']);

         if (previousSalesDocuments) {
            queryClient.setQueryData(['salesDocuments'], (old: SalesDocument[]) =>
               old?.filter((salesDocument) => salesDocument.id !== salesDocumentId)
            );
         }

         return { previousSalesDocuments };
      },
      onError: (err, salesDocumentIds, context) => {
         console.log('Sales document deleting ', salesDocumentIds);
         console.log(err);
         if (context?.previousSalesDocuments) {
            queryClient.setQueryData(['salesDocuments'], context.previousSalesDocuments);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['salesDocuments'] });
      },
   });
};
