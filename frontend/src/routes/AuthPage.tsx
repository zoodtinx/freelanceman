import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FreelanceManIcon } from '@/components/shared/icons';

const AuthPage: React.FC = () => {
   return (
      <div className="flex bg-background w-full h-screen items-center justify-center p-8">
         <div className="flex flex-col gap-4 grow justify-center items-center w-1/2 text-primary">
            <FreelanceManIcon className="w-40" />
            <p className="text-center font-medium text-[30px] leading-tight">
               Gear up,
               <br /> Freelancer
            </p>
         </div>
         <div className="flex flex-col p-8 rounded-2xl justify-center items-center bg-foreground h-full w-3/5 shadow-md">
            <Outlet />
         </div>
      </div>
   );
};

export default AuthPage;
