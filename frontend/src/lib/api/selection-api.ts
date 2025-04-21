import { useClientSelectionsQuery, useClientsQuery } from "@/lib/api/client-api"
import { useProjectSelectionQuery, useProjectsQuery } from "@/lib/api/project-api";

type Type = 'client' | 'project'

export const useSelectionQuery = (type: Type) => {
   switch (type) {
      case 'client':
         return useClientSelectionsQuery;
      case 'project':
         return useProjectSelectionQuery;
      default:
         throw new Error(`Unknown selection type: ${type}`);
   }
}