import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   getAllFiles,
   getFile,
   createFile,
   editFile,
   deleteFile,
} from './mock/mock-file-service';
import type { File, FileSearchOption, NewFilePayload } from '@types';

export const useAllFilesQuery = (searchTerm: FileSearchOption) => {
   return useQuery({
      queryKey: ['files', searchTerm],
      queryFn: () => getAllFiles(searchTerm),
   });
};

export const useFileQuery = (fileId: string) => {
   const queryClient = useQueryClient();

   return useQuery({
      queryKey: ['files', fileId],
      queryFn: () => {
         const cachedFiles = queryClient.getQueryData<File[]>(['files']);
         const cachedFile = cachedFiles?.find((file) => file.id === fileId);
         return cachedFile ?? getFile(fileId);
      },
   });
};

export const useCreateFile = () => {
   const queryClient = useQueryClient();

   return useMutation<File, Error, NewFilePayload>({
      mutationKey: ['createFile'],
      mutationFn: async (newFile: NewFilePayload) => await createFile(newFile),
      onMutate: async (newFile: NewFilePayload) => {
         await queryClient.cancelQueries(['files']);

         const previousFiles = queryClient.getQueryData<File[]>(['files']);

         queryClient.setQueryData<File[]>(['files'], (old) => [
            ...(old || []),
            { ...newFile, id: 'temp-id' },
         ]);

         return { previousFiles };
      },
      onError: (err, newFile, context: any) => {
         if (context?.previousFiles) {
            queryClient.setQueryData(['files'], context.previousFiles);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['files']);
      },
   });
};

export const useEditFile = (fileId: string) => {
   const queryClient = useQueryClient();

   return useMutation<
      File,
      Error,
      { key: keyof File; value: File[keyof File] }
   >({
      mutationKey: ['editFile'],
      mutationFn: async (filePayload: { key: keyof File; value: File[keyof File] }) => {
         await editFile(fileId, filePayload);
      },
      onMutate: async ({ key, value }) => {
         await queryClient.cancelQueries(['files']);

         const previousFiles = queryClient.getQueryData<File[]>(['files']);

         if (previousFiles) {
            queryClient.setQueryData(['files'], (old) =>
               old?.map((file) =>
                  file.id === fileId ? { ...file, [key]: value } : file
               )
            );
         }

         return { previousFiles };
      },
      onError: (err, variables, context) => {
         if (context?.previousFiles) {
            queryClient.setQueryData(['files'], context.previousFiles);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['files']);
      },
   });
};

export const useDeleteFile = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, string>({
      mutationKey: ['deleteFile'],
      mutationFn: async (fileId: string) => {
         await deleteFile(fileId);
      },
      onMutate: async (fileId: string) => {
         await queryClient.cancelQueries(['files']);

         const previousFiles = queryClient.getQueryData<File[]>(['files']);

         if (previousFiles) {
            queryClient.setQueryData<File[]>(['files'], (old) =>
               old?.filter((file) => file.id !== fileId)
            );
         }

         return { previousFiles };
      },
      onError: (err, fileId, context: any) => {
         if (context?.previousFiles) {
            queryClient.setQueryData(['files'], context.previousFiles);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries(['files']);
      },
   });
};
