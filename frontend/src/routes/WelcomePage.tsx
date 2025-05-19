import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FreelanceManIcon } from '@/components/shared/icons';
import { Button } from '@/components/shared/ui/primitives/Button';
import { getDemo } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';

const WelcomePage: React.FC = () => {
   const navigate = useNavigate();
   const setAccessToken = useAuthStore((state) => state.setAccessToken);
   const formMethods = useForm();
   const {
      handleSubmit,
      formState: { errors },
   } = formMethods;

   const handleGoogleSignup = () => {
      console.log('Google Sign-up triggered');
   };

   const handleGetDemo = async () => {
      const result = await getDemo();
      console.log('result', result);
      if (result.success) {
         setAccessToken(result.data.accessToken);
         navigate('/home/projects');
      } else {
         alert('Boo');
      }
   };

   const handleNavigate = (page: 'register' | 'login') => {
      navigate(`../${page}`);
   };

   return (
      <div className="flex flex-col items-center gap-4">
         <div className="flex flex-col items-center">
            <p className="text-xl">
               Welcome to <span className="font-semibold">FreelanceMan</span>
            </p>
            <p>
               Your all-in-one tool for managing freelance projects with ease.
            </p>
         </div>
         <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
               <p>Explore Full feature</p>
               <Button onClick={handleGetDemo} className="w-[150px]">
                  Try Demo
               </Button>
            </div>
            <div className="flex items-center gap-2">
               <p>Get blank app</p>
               <Button
                  onClick={() => handleNavigate('login')}
                  className="w-[150px]"
                  variant={'outline'}
               >
                  Try Demo
               </Button>
            </div>
            <div className="flex items-center gap-2">
               <p>Explore Full feature</p>
               <Button
                  onClick={() => handleNavigate('login')}
                  className="w-[150px]"
                  variant={'outline'}
               >
                  Sign In
               </Button>
            </div>
            <div className="flex items-center gap-2">
               <p>Explore Full feature</p>
               <Button
                  onClick={() => handleNavigate('register')}
                  className="w-[150px]"
                  variant={'outline'}
               >
                  Register
               </Button>
            </div>
         </div>
      </div>
   );
};

export default WelcomePage;
