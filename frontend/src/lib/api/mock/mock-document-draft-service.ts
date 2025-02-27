import { mockSalesDocument } from '@mocks';
import { SalesDocumentSearchOption } from '@types';

export const getDocumentDraft = (searchOption: SalesDocumentSearchOption) => {
   return new Promise((resolve, reject) => {
      if (!mockSalesDocument || !Array.isArray(mockSalesDocument)) {
         return reject(new Error('Invalid mock data'));
      }

      const filteredDocuments = mockSalesDocument.filter(doc => {
         return (
            (!searchOption.id || doc.id === searchOption.id) &&
            (!searchOption.title || doc.title.includes(searchOption.title)) &&
            (!searchOption.clientId || doc.clientId === searchOption.clientId) &&
            (!searchOption.projectId || doc.projectId === searchOption.projectId) &&
            (!searchOption.category || doc.category === searchOption.category)
         );
      });

      resolve(filteredDocuments);
   });
};

export const editSalesDocument = (id: string, updatedData: any) => {
   return new Promise((resolve, reject) => {
      const index = mockSalesDocument.findIndex(doc => doc.id === id);
      if (index === -1) {
         return reject(new Error('Document not found'));
      }
      mockSalesDocument[index] = { ...mockSalesDocument[index], ...updatedData };
      resolve(mockSalesDocument[index]);
   });
};

export const getSalesDocument = (id: string) => {
   return new Promise((resolve, reject) => {
      const document = mockSalesDocument.find(doc => doc.id === id);
      if (!document) {
         return reject(new Error('Document not found'));
      }
      resolve(document);
   });
};

export const getAllSalesDocuments = () => {
   return new Promise((resolve) => {
      resolve(mockSalesDocument);
   });
};

export const createSalesDocument = (newDocument: any) => {
   return new Promise((resolve) => {
      mockSalesDocument.push(newDocument);
      resolve(newDocument);
   });
};

export const deleteSalesDocument = (id: string) => {
   return new Promise((resolve, reject) => {
      const index = mockSalesDocument.findIndex(doc => doc.id === id);
      if (index === -1) {
         return reject(new Error('Document not found'));
      }
      const deletedDocument = mockSalesDocument.splice(index, 1);
      resolve(deletedDocument[0]);
   });
};
