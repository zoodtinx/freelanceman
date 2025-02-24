import { useClientSelectionQuery } from "@/lib/api/client-api"
import { useAllProjectsQuery, useProjectQuery, useProjectSelectionsQuery } from "@/lib/api/project-api"

type Type = 'client' | 'project'

export const useSelectionQuery = (type: Type) => {
   switch (type) {
      case 'client':
         return useClientSelectionQuery;
      case 'project':
         return useProjectSelectionsQuery;
      default:
         throw new Error(`Unknown selection type: ${type}`);
   }
}