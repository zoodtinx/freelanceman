import {
   getFiles,
   getFile,
   createFile,
   deleteFile,
   editFile,
   getFileUrl,
   getPresignedUrl,
} from '@/lib/api/services/file-service';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';
import { FileFilterDto } from 'freelanceman-common';

export const useFileApi = () => {
   return {
      uploadFile: useCreateFile(),
      deleteFile: useDeleteFile(),
      editFile: useEditFile(),
   };
};

export const useFilesQuery = (filter: FileFilterDto = {}) => {
   return useAppQuery(['files', filter], (token) => getFiles(token, filter));
};

export const useFileQuery = (fileId: string) => {
   return useAppQuery(['files', fileId], (token) => getFile(token, fileId));
};

export const useFileUrlQuery = (fileKey: string, enabled?: boolean) => {
   return useAppQuery(
      ['filesUrl', fileKey],
      (token) => getFileUrl(token, fileKey),
      enabled
   );
};

export const useCreateFile = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'uploadFile',
         invalidationKeys: ['files'],
         mutationFn: createFile,
      },
      callbacks
   );
};

export const useEditFile = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'editFile',
         invalidationKeys: ['files'],
         mutationFn: editFile,
      },
      callbacks
   );
};

export const useDeleteFile = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'deleteFile',
         invalidationKeys: ['files'],
         mutationFn: deleteFile,
      },
      callbacks
   );
};

export const useGetPresignedUrl = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'getPresignedUrl',
         invalidationKeys: ['files'],
         mutationFn: getPresignedUrl,
      },
      callbacks
   );
}