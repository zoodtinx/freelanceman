import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   refreshAccess as apiRefreshAccess,
   checkAccess as apiCheckAccess,
} from '@/lib/api/auth-api';
import React from 'react';

const RootPage: React.FC = () => {
   const { theme } = useTheme();
   const { pathname } = useLocation();
   const pathSections = pathname.split('/').filter(Boolean);
   const { accessToken, setAccessToken } = useAuthStore();
   const navigate = useNavigate();

   useEffect(() => {
      const htmlClass = document.documentElement.className;
      console.log('HTML class after theme is applied:', htmlClass);
      const prefersDarkMode = window.matchMedia(
         '(prefers-color-scheme: dark)'
      ).matches;
      console.log('Prefers dark mode:', prefersDarkMode ? 'dark' : 'light');
   }, [theme]);

   useEffect(() => {
      const refreshAccess = async () => {
         const result = await apiRefreshAccess();
         if (!result.success) {
            navigate('/user/login');
         }
         setAccessToken(result.data.newAccessToken);
      };

      const checkAccess = async () => {
         const result = await apiCheckAccess(accessToken);
         if (!result.success) {
            await refreshAccess();
            return
         }
         const isOnAuthPages = pathSections.includes('user')
         if (isOnAuthPages) {
            navigate('/home')
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
