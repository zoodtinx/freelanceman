import {
   refreshAccess as apiRefreshAccess,
   checkAccess as apiCheckAccess,
} from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';
import { QueryKey, useQuery, keepPreviousData } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAppQuery = (
   queryKey: QueryKey,
   queryFn: (token: string) => Promise<any>,
   enabled: boolean = true
) => {
   const { accessToken, setAccessToken } = useAuthStore();
   const navigate = useNavigate();

   const queryResult = useQuery({
      queryKey,
      queryFn: () => queryFn(accessToken),
      enabled: Boolean(accessToken) && enabled,
      placeholderData: keepPreviousData,
      retry: 0,
   });

   useEffect(() => {
      const tryRefresh = async () => {
         const result = await apiRefreshAccess();
         if (!result.success) {
            navigate('/user/login');
            return false;
         }
         setAccessToken(result.data.accessToken);
         queryResult.refetch();
         return true;
      };

      const handleUnauthorized = async () => {
         const refreshed = await tryRefresh();
         if (!refreshed) return;
      };

      if (
         queryResult.isError &&
         queryResult.error instanceof Error &&
         queryResult.error.message === 'Unauthorized'
      ) {
         handleUnauthorized();
      }
   }, [queryResult.isError, queryResult.error, navigate]);

   return queryResult;
};
