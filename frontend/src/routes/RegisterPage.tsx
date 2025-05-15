import React from 'react';
import { HamIcon } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import {
   Label,
   TextInputForm,
} from '@/components/shared/ui/form-field-elements';
import { register } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';
import { Button } from '@/components/shared/ui/primitives/Button';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import FreelanceManLogo from '@/components/page-elements/app-layout/topbar/Logo';
import { FreelanceManIcon } from '@/components/shared/icons';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
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

   const onSubmit = async (data: any) => {
      const payload = {
         email: data.email,
         displayName: data.displayName,
         password: data.password,
      };

      const { accessToken } = await register(payload);
      setAccessToken(accessToken);
   };

   const handleLogin = () => {
      navigate('../login')
   }

   return (
      <div className="flex bg-background w-full h-screen items-center justify-center p-8">
         <div className='flex grow justify-center items-center w-1/2'>
            <FreelanceManIcon className='w-36' />
         </div>
         <div className="flex flex-col p-8 rounded-2xl items-center bg-white h-full w-3/5 justify-center shadow-md">
            <div className='w-1/2'>
               <h2 className="text-xl font-medium text-center mb-6">
                  Create an Account
               </h2>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                  <div>
                     <Label className="text-primary">Display Name</Label>
                     <TextInputForm
                        fieldName="displayName"
                        formMethods={formMethods}
                        required={true}
                     />
                  </div>
                  <div>
                     <Label className="text-primary">Email</Label>
                     <TextInputForm
                        fieldName="email"
                        formMethods={formMethods}
                        required={true}
                     />
                  </div>
                  <div>
                     <Label className="text-primary">Password</Label>
                     <TextInputForm
                        fieldName="password"
                        formMethods={formMethods}
                        required={true}
                     />
                  </div>
                  <div>
                     <Label className="text-primary">Confirm Password</Label>
                     <TextInputForm
                        fieldName="confirmPassword"
                        formMethods={formMethods}
                     />
                  </div>
                  <div className="py-2">
                     <Separator className="" />
                  </div>
                  <Button
                     type="submit"
                     className="w-full py-2 text-foreground h-8 mt-4 focus:outline-none"
                  >
                     Sign Up
                  </Button>
               </form>
               <Button
                  type="submit"
                  variant={'outline'}
                  className="w-full py-2 h-8 mt-2 focus:outline-none text-primary"
               >
                  Sign Up with Google
               </Button>
               <div className="mt-4 text-center text-sm text-gray-600">
                  <span>Already have an account?</span>
                  <a
                     className="text-button-blue-blue font-semibold"
                     onClick={handleLogin}
                  >
                     {' '}
                     Log in
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;
