import {
   getFiles,
   getFile,
   createFile,
   deleteFile,
   editFile,
   getFileUrl,
   getPresignedUrl,
   deleteManyFile,
} from '@/lib/api/services/file-service';
import { CreateFileDto, EditFileDto, FileFilterDto, S3GetPresignedUrlDto } from 'freelanceman-common';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/lib/zustand/auth-store';
import { useNavigate } from 'react-router-dom';
import { UseApiOptions } from '@/lib/api/services/helpers/api.type';
import { defaultApiOptions } from '@/lib/api/services/helpers/default-option';
import { getBaseMutationOptions } from '@/lib/api/services/helpers/base-mutation-options';

export const useFilesQuery = (filter: FileFilterDto = {}, enable?: boolean) => {
   return useAppQuery(['files', filter], (token) => getFiles(token, filter), enable);
};

export const useFileQuery = (fileId: string, enable?: boolean) => {
   return useAppQuery(['file', fileId], (token) => getFile(token, fileId), enable, false);
};

export const useFileUrlQuery = (fileKey: string, enable?: boolean) => {
   return useAppQuery(['fileUrl', fileKey], (token) => getFileUrl(token, fileKey), enable);
};

export const useCreateFile = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: CreateFileDto) => createFile(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['files'],
      }),
   });
};

export const useEditFile = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (payload: EditFileDto) => editFile(accessToken, payload),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['files'],
      }),
   });
};

export const useDeleteFile = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (fileId: string) => deleteFile(accessToken, fileId),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['files'],
      }),
   });
};

export const useDeleteManyFile = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (ids: string[]) => deleteManyFile(accessToken, ids),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['files'],
      }),
   });
};

export const useGetPresignedUrl = (options: UseApiOptions = defaultApiOptions) => {
   const queryClient = useQueryClient();
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (fileKey: S3GetPresignedUrlDto) => getPresignedUrl(accessToken, fileKey),
      ...getBaseMutationOptions({
         navigate,
         options,
         queryClient,
         queryKey: ['files'],
      }),
   });
};
