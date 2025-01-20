import { useQuery } from '@tanstack/react-query';
import { getDocumentDraft } from '@/lib/api/mock/mock-document-draft-service';

export const useDocumentDraftQuery = (draftId: string) => {
   return useQuery({
      queryKey: ['document-drafts', draftId],
      queryFn: () => getDocumentDraft(draftId),
   });
};
