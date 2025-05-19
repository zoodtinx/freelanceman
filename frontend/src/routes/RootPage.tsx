import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   refreshAccess as apiRefreshAccess,
   checkAccess as apiCheckAccess,
} from '@/lib/api/auth-api';
import React from 'react';
import { useDarkMode } from '@/lib/zustand/theme-store';
import { Loader2 } from 'lucide-react';

const RootPage: React.FC = () => {
   const { mode } = useDarkMode();
   const [isLoading, setIsLoading] = useState(false)
   const { pathname } = useLocation();
   const pathSections = pathname.split('/').filter(Boolean);
   const { accessToken, setAccessToken } = useAuthStore();
   const navigate = useNavigate();

   useEffect(() => {
      const refreshAccess = async () => {
         setIsLoading(true)
         const result = await apiRefreshAccess();
         setIsLoading(false)
         if (!result.success) {
            navigate('/user/welcome');
            return;
         }
         setAccessToken(result.data.accessToken);
         const isOnAuthPages =
            pathSections.includes('user') || !pathSections.length;
         if (isOnAuthPages) {
            navigate('/home');
         }
      };
      
      const checkAccess = async () => {
         setIsLoading(true)
         const result = await apiCheckAccess(accessToken);
         setIsLoading(false)
         if (!result.success) {
            setIsLoading(true)
            await refreshAccess();
            setIsLoading(false)
            return;
         }
         const isOnAuthPages =
            pathSections.includes('user') || !pathSections.length;
         if (isOnAuthPages) {
            navigate('/home');
         }
      };

      if (!accessToken) {
         refreshAccess();
      } else {
         checkAccess();
      }
   }, [accessToken]);

   if (isLoading) {
      return (
         <div className="w-screen h-screen flex justify-center items-center">
            <Loader2 className="animate-spin h-14 w-14" />
         </div>
      );
   }

   return <Outlet />;
};

export default RootPage;
