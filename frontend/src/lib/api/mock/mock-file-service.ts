import { mockFiles } from '@mocks';
import type { File, FileFormData, FileSearchOption } from '@types';

export const getFile = (id: string) => {
   const file = mockFiles.find((file) => file.id === id);

   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (file) {
            resolve(file);
         } else {
            reject(new Error(`File with id ${id} not found`));
         }
      }, 500);
   });
};

export const getAllFiles = (
   searchOptions: FileSearchOption = {}
): Promise<File[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         if (!searchOptions || Object.keys(searchOptions).length === 0) {
            resolve(mockFiles);
            return;
         }

         const filteredFiles = mockFiles.filter((file) => {
            const matchesDisplayName =
               !searchOptions.displayName?.trim() ||
               file.displayName.toLowerCase().includes(searchOptions.displayName.trim().toLowerCase());

            const matchesCategory =
               !searchOptions.category?.trim() ||
               file.category === searchOptions.category.trim();

            const matchesType =
               !searchOptions.type?.trim() ||
               file.type === searchOptions.type.trim();

            const matchesClientId =
               !searchOptions.clientId ||
               file.clientId === searchOptions.clientId;

            const matchesProjectId =
               !searchOptions.projectId ||
               file.projectId === searchOptions.projectId;

            return (
               matchesDisplayName &&
               matchesCategory &&
               matchesType &&
               matchesClientId &&
               matchesProjectId
            );
         });

         resolve(filteredFiles);
      }, 500);
   });
};



export const editFile = (id: string, filePayload: Partial<FileFormData>) => {
   const file = mockFiles.find((f) => f.id === id);

   if (!file) {
      return Promise.reject(new Error(`File with id ${id} not found`));
   }

   Object.keys(filePayload).forEach((key) => {
      if (key !== 'id' && key in file) {
         file[key as keyof FileFormData] =
            filePayload[key as keyof FileFormData];
      }
   });

   file.dateModified = new Date().toISOString();

   return Promise.resolve(file);
};

export const createFile = (newFile: Omit<FileFormData, 'id'>) => {
   const createdFile = {
      ...newFile,
      id: crypto.randomUUID(),
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
   };

   mockFiles.push(createdFile);

   return Promise.resolve(createdFile);
};

export const deleteFile = (fileId: string) => {
   const index = mockFiles.findIndex((file) => file.id === fileId);

   if (index !== -1) {
      mockFiles.splice(index, 1);
   }

   return Promise.resolve(fileId);
};
