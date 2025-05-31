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
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';

const RootPage: React.FC = () => {
   const { mode } = useDarkMode();
   const [isLoading, setIsLoading] = useState(false);
   const { pathname } = useLocation();
   const pathSections = pathname.split('/').filter(Boolean);
   const { accessToken, userData, setUserData, setAccessToken } =
      useAuthStore();
   const navigate = useNavigate();
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   useEffect(() => {
      const refreshAccess = async () => {
         setIsLoading(true);
         const result = await apiRefreshAccess();
         setIsLoading(false);
         if (!result.success) {
            navigate('/user/welcome');
            return;
         }
         console.log('user', result.data);
         setAccessToken(result.data.accessToken);
         setUserData(result.data.user);
         const isOnAuthPages =
            pathSections.includes('user') || !pathSections.length;
         if (isOnAuthPages) {
            navigate('/home');
            if (result.data.user.isFirstTimeVisitor) {
               setWelcomeDialogState({ isOpen: true, page: 'home' });
            }
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
   }, [accessToken, userData, setUserData]);

   if (isLoading) {
      return (
         <div className="w-screen h-screen flex justify-center items-center">
            <SvgFreelancemanIcon className="animate-bounce h-24 w-auto" />
         </div>
      );
   }

   return <Outlet />;
};

export default RootPage;
