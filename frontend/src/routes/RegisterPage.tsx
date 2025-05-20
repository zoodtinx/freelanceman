import React from 'react';
import { useForm } from 'react-hook-form';
import {
   Label,
   TextInputForm,
} from '@/components/shared/ui/form-field-elements';
import { register } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';
import { Button } from '@/components/shared/ui/primitives/Button';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

   const onSubmit = async (formData: any) => {
      const payload = {
         email: formData.email,
         displayName: formData.displayName,
         password: formData.password,
      };

      const { success, data } = await register(payload);

      if (!success) {
         toast.error('This email is already in use.');
         return;
      }
      setAccessToken(data.accessToken);
      navigate('/home/projects');
   };

   const handleLogin = () => {
      navigate('../login');
   };

   const handleGoogleRegister = async () => {
      window.location.href = 'http://localhost:3000/auth/google';
   };

   return (
      <div className="h-full w-full flex flex-col justify-between items-center">
         <div></div>
         <div className="w-1/2">
            <h2 className="text-xl font-medium text-center mb-6">
               Create an Account
            </h2>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="space-y-4 w-full"
            >
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
                  Register
               </Button>
            </form>
            <Button
               onClick={handleGoogleRegister}
               type="submit"
               variant={'outline'}
               className="w-full py-2 h-8 mt-2 focus:outline-none text-primary"
            >
               Register with Google
            </Button>
            <div className="mt-4 text-center text-gray-600">
               <span>Already have an account?</span>
               <a
                  className="text-button-blue-blue font-semibold cursor-pointer"
                  onClick={handleLogin}
               >
                  {' '}
                  Sign in
               </a>
            </div>
         </div>
         <div className="opacity-70 hover:opacity-100 cursor-pointer">
            Skip setup, explore demo.
         </div>
      </div>
   );
};

export default RegisterPage;
