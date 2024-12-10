import { useQuery } from "@tanstack/react-query"

interface ClientList {
   [clientId: string]: string; 
}

export const useClientList = (clientId:string) {
   const query = useQuery<ClientList, Error>({
      queryKey: ['clientList'],
      queryFn: () => getAllProjects(),
   })
   
   return query
}