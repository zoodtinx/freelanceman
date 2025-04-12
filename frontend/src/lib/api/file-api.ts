import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFiles, getFile } from '@/lib/api/services/file-service';
import {
   editFile,
   getAllFiles,
   createFile,
   deleteFile,
} from './mock/mock-file-service';
import type { CreateFileDto, EditFileDto, File, FileSearchOption } from '@types';
import useAuthStore from '@/lib/zustand/auth-store';


export const useFileApi = () => {
   return {
      createFile: useCreateFile(),
      deleteFile: useDeleteFile(),
      editFile: useEditFile()
   }
}


export const useAllFilesQuery = (searchOptions: FileSearchOption = {}) => {
   return useQuery({
      queryKey: ['files', searchOptions],
      queryFn: () => getAllFiles(searchOptions),
   });
};


export const useFilesQuery = (searchOptions: FileSearchOption = {}) => {
   const { accessToken } = useAuthStore();
   
   return useQuery({
      queryKey: ['files', searchOptions],
      queryFn: () => getFiles(accessToken, searchOptions),
   });
};


export const useFileQuery = (fileId: string) => {
   return useQuery<File, Error, File>({
      queryKey: ['files', fileId],
      queryFn: () => getFile(fileId),
   });
};


export const useCreateFile = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createFile'],
      mutationFn: async (newFile: CreateFileDto) => await createFile(newFile),
      onMutate: async (newFile: CreateFileDto) => {
         await queryClient.cancelQueries({ queryKey: ['files'] });
         const previousFiles = queryClient.getQueryData(['files']);

         queryClient.setQueryData(['files'], (old: File[]) => [
            ...(old || []),
            { ...newFile, id: 'temp-id' },
         ]);

         return { previousFiles };
      },
      onError: (err, newFile, context) => {
         console.log('New file ', newFile);
         console.log(err);
         if (context?.previousFiles) {
            queryClient.setQueryData(['files'], context.previousFiles);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['files'] });
      },
   });
};


interface EditFileMutationPayload {
   fileId: string;
   filePayload: EditFileDto;
}

export const useEditFile = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['editFile'],
      mutationFn: async ({ fileId, filePayload }: EditFileMutationPayload) => {
         await editFile(fileId, filePayload);
      },
      onMutate: async ({ fileId, filePayload }) => {
         await queryClient.cancelQueries({ queryKey: ['files'] });
         const previousFiles = queryClient.getQueryData(['files']);

         if (previousFiles) {
            queryClient.setQueryData(['files'], (old: File[]) =>
               old?.map((file) => (file.id === fileId ? filePayload : file))
            );
         }

         return { previousFiles };
      },
      onError: (err, newFilePayload, context) => {
         console.log('New file ', newFilePayload);
         console.log(err);
         if (context?.previousFiles) {
            queryClient.setQueryData(['files'], context.previousFiles);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['files'] });
      },
   });
};


export const useDeleteFile = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['deleteFile'],
      mutationFn: async (fileId: string) => {
         await deleteFile(fileId);
      },
      onMutate: async (fileId: string) => {
         await queryClient.cancelQueries({ queryKey: ['files'] });
         const previousFiles = queryClient.getQueryData(['files']);

         if (previousFiles) {
            queryClient.setQueryData(['files'], (old: File[]) =>
               old?.filter((file) => file.id !== fileId)
            );
         }

         return { previousFiles };
      },
      onError: (err, fileIds, context) => {
         console.log('File deleting ', fileIds);
         console.log(err);
         if (context?.previousFiles) {
            queryClient.setQueryData(['files'], context.previousFiles);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['files'] });
      },
   });
};
