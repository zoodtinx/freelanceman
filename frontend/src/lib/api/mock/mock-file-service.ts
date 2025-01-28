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
   console.log(searchOptions.name);
   return new Promise((resolve) => {
      setTimeout(() => {
         if (!searchOptions || Object.keys(searchOptions).length === 0) {
            resolve(mockFiles);
            return;
         }

         const filteredFiles = mockFiles.filter((file) => {
            const matchesName =
               !searchOptions.name ||
               searchOptions.name.trim() === '' ||
               file.name
                  .toLowerCase()
                  .includes(searchOptions.name.trim().toLowerCase());

            const matchesFileName =
               !searchOptions.fileName ||
               searchOptions.fileName.trim() === '' ||
               file.fileName
                  .toLowerCase()
                  .includes(searchOptions.fileName.trim().toLowerCase());

            const matchesCategory =
               !searchOptions.category ||
               searchOptions.category.trim() === '' ||
               file.category === searchOptions.category.trim();

            const matchesType =
               !searchOptions.type ||
               searchOptions.type.trim() === '' ||
               file.type === searchOptions.type.trim();

            return (
               matchesName && matchesFileName && matchesCategory && matchesType
            );
         });
         console.log(filteredFiles);
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
