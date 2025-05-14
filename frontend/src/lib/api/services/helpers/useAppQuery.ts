import useAuthStore from '@/lib/zustand/auth-store';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAppQuery = (
   queryKey: QueryKey,
   queryFn: (token: string) => Promise<any>,
   enabled: boolean = true
) => {
   const { accessToken } = useAuthStore();
   const navigate = useNavigate();

   const queryResult = useQuery({
      queryKey,
      queryFn: () => queryFn(accessToken),
      enabled: Boolean(accessToken) && enabled
   });

   const { isError, error } = queryResult;

   useEffect(() => {
      if (
    queryResult.isError &&
    queryResult.error instanceof Error &&
    queryResult.error.message === 'Unauthorized'
  ) {
    navigate('/user/login');
  }
   }, [isError, error, navigate]);

   return queryResult;
};
