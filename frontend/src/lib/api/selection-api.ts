import { useClientSelectionQuery } from "@/lib/api/client-api"

type Type = 'client' | 'project'

export const useSelectionQuery = (type: Type) => {
   switch (type) {
      case 'client':
         return useClientSelectionQuery;
      // case 'project':
      //    return useProjectSelectionQuery;
      default:
         throw new Error(`Unknown selection type: ${type}`);
   }
}