import {
   editSalesDocument,
   getSalesDocument,
   createSalesDocument,
   deleteSalesDocument,
   createPdf,
} from './services/sales-document-service';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/lib/zustand/auth-store';
import { useNavigate } from 'react-router-dom';
import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import { defaultApiOptions } from '@/lib/api/services/helpers/default-option';
import { getBaseMutationOptions } from '@/lib/api/services/helpers/base-mutation-options';
import { CreatePdfDto, CreateSalesDocumentDto, EditSalesDocumentDto } from 'freelanceman-common';

export const useSalesDocumentQuery = (
   salesDocumentId: string,
   enabled?: boolean
) => {
   return useAppQuery(
      ['salesDocument', salesDocumentId],
      (token) => getSalesDocument(token, salesDocumentId),
      enabled,
      false
   );
};

export const useCreateSalesDocument = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: CreateSalesDocumentDto) => createSalesDocument(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['salesDocument'],
      }),
   });
};

export const useEditSalesDocument = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: EditSalesDocumentDto) => editSalesDocument(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['salesDocument'],
      }),
   });
};

export const useDeleteSalesDocument = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (id: string) => deleteSalesDocument(accessToken, id),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['salesDocument', 'paymentData'],
      }),
   });
};

export const useCreatePdf = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: CreatePdfDto) => createPdf(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['salesDocument'],
      }),
   });
};
