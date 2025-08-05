import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   refreshAccess as apiRefreshAccess,
   checkAccess as apiCheckAccess,
} from '@/lib/api/auth-api';
import React from 'react';
import { useDarkMode } from '@/lib/zustand/theme-store';
import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';

const RootPage: React.FC = () => {
   // initialize dark mode store
   useDarkMode(); 
   
   // initialize auth store
   const { accessToken, setAccessToken } = useAuthStore();

   const [isLoading, setIsLoading] = useState(false);
   
   // redirect helper hooks
   const { pathname } = useLocation();
   const pathSections = pathname.split('/').filter(Boolean);
   const isOnAuthPages = pathSections.includes('user') || !pathSections.length;
   const navigate = useNavigate();

   // authentication side effect
   useEffect(() => {
      const refreshAccess = async () => {
         setIsLoading(true);
         const result = await apiRefreshAccess();
         setIsLoading(false);
         if (!result.success) {
            navigate('/welcome');
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
         setIsLoading(true);
         const result = await apiCheckAccess(accessToken);
         setIsLoading(false);
         if (!result.success) {
            setIsLoading(true);
            await refreshAccess();
            setIsLoading(false);
            return;
         }
         if (isOnAuthPages) {
            navigate('/home');
         }
      };


      if (accessToken) {
         checkAccess();
      } else {
         refreshAccess();
      }
   }, [accessToken]);

   // loading ui
   if (isLoading && isOnAuthPages) {
      return (
         <div className="w-screen h-screen flex justify-center items-center">
            <SvgFreelancemanIcon className="animate-bounce h-24 w-auto text-constant-primary" />
         </div>
      );
   }

   return <Outlet />;
};

export default RootPage;
