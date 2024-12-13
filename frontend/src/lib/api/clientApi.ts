import { useQuery } from "@tanstack/react-query"
import { getClientInfo } from "./mock/mockClientService";
import type { ClientResponse } from "@types";

interface ClientList {
   [clientId: string]: string; 
}

// export const useClientList = (clientId:string) {
//    const query = useQuery<ClientList, Error>({
//       queryKey: ['clientList'],
//       queryFn: () => getAllProjects(),
//    })
   
//    return query
// }


export const useClient = (clientId: string) => {
   const query = useQuery<ClientResponse, Error>({
      queryKey: ['client', clientId],
      queryFn: () => getClientInfo(clientId),
   });

   return query;
};