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
