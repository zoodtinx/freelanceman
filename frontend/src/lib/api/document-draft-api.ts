import { useQuery } from '@tanstack/react-query';
import { getDocumentDraft } from '@/lib/api/mock/mock-document-draft-service';
import { SalesDocumentSearchOption } from '@types';

export const useDocumentDraftQuery = (searchOption: SalesDocumentSearchOption) => {
   return useQuery({
      queryKey: ['document-drafts', searchOption],
      queryFn: () => getDocumentDraft(searchOption),
   });
};