import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/lib/api/mock/mock-user-service';

export const useUserQuery = (shouldFetch: boolean) => {
   return useQuery({
      queryKey: ['user'],
      queryFn: () => getUserData(),
      enabled: shouldFetch
   });
};
