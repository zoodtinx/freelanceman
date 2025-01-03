import { mockFiles } from "@mocks";
import type { FileFormData } from "@types";

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

export const getAllFiles = (option?: Partial<FileFormData>) => {
   return new Promise((resolve) => {
      setTimeout(() => {
         const filteredFiles = mockFiles.filter((file: FileFormData) => {
            if (!option) {
               return true; // If no option provided, return all files
            }
            return (
               (!option.name || file.name.includes(option.name)) &&
               (!option.category || file.category === option.category) &&
               (!option.link || file.link.includes(option.link))
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
      if (key !== "id" && key in file) {
         file[key as keyof FileFormData] = filePayload[key as keyof FileFormData];
      }
   });

   file.dateModified = new Date().toISOString();

   return Promise.resolve(file);
};

export const createFile = (newFile: Omit<FileFormData, "id">) => {
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
