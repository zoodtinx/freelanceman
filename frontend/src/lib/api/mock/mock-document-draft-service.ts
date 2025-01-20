import { mockFiles } from '@mocks';
import { mockSalesDocumentDraft } from '@mocks';

export const getDocumentDraft = (id: string) => {
   const file = mockFiles.find((file) => file.id === id);

   return new Promise((resolve, reject) => {
      resolve(mockSalesDocumentDraft);
   });
};
