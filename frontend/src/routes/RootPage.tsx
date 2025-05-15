import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   refreshAccess as apiRefreshAccess,
   checkAccess as apiCheckAccess,
} from '@/lib/api/auth-api';
import React from 'react';
import { useDarkMode } from '@/lib/zustand/theme-store';

const RootPage: React.FC = () => {
   const { mode } = useDarkMode();
   console.log('mode', mode)
   const { pathname } = useLocation();
   const pathSections = pathname.split('/').filter(Boolean);
   const { accessToken, setAccessToken } = useAuthStore();
   const navigate = useNavigate();

   useEffect(() => {
      const refreshAccess = async () => {
         const result = await apiRefreshAccess();
         if (!result.success) {
            navigate('/user/login');
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
         console.log('accessToken', accessToken);
         const result = await apiCheckAccess(accessToken);
         console.log('result', result);
         if (!result.success) {
            await refreshAccess();
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

   return <Outlet />;
};

export default RootPage;
