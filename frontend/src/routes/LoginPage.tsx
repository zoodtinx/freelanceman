import React from 'react';
import { HamIcon } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import {
   Label,
   TextInputForm,
} from '@/components/shared/ui/form-field-elements';
import { login } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';
import { useNavigate } from 'react-router-dom';
import { FreelanceManIcon } from '@/components/shared/icons';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Button } from '@/components/shared/ui/primitives/Button';

const LogInPage: React.FC = () => {
   const navigate = useNavigate();
   // const setAccessToken = useAuthStore((state) => state.setAccessToken);
   const { setAccessToken, accessToken } = useAuthStore();

   const formMethods = useForm();
   const {
      handleSubmit,
      formState: { errors },
   } = formMethods;

   const handleGoogleSignup = () => {
      console.log('Google Sign-up triggered');
   };

   const onSubmit = async (data: any) => {
      console.log('data', data)
      
      const payload = {
         email: data.email,
         password: data.password,
      };

      const result = await login(payload);

      if (result.success) {
         setAccessToken(result.data.accessTokenString);
         navigate('/home');
      }
   };

   const handleRegiser = () => {
      navigate('../register')
   }

   return (
      <div className="flex bg-background w-full h-screen items-center justify-center p-8">
         <div className="flex flex-col gap-4 grow justify-center items-center w-1/2 text-primary">
            <FreelanceManIcon className="w-40" />
            <p className="text-center font-medium text-[30px] leading-tight">
               Gear up,
               <br /> Freelancer
            </p>
         </div>
         <div className="flex flex-col p-8 rounded-2xl items-center bg-white h-full w-3/5 justify-between shadow-md">
            <div></div>
            <div className="w-1/2">
               <h2 className="text-xl font-medium text-center mb-6">Sign In</h2>
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
               >
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
                  <div className="py-2">
                     <Separator className="" />
                  </div>
                  <Button
                     type="submit"
                     className="w-full py-2 text-foreground h-8 mt-4 focus:outline-none"
                  >
                     Sign in
                  </Button>
               </form>
               <Button
                  type="submit"
                  variant={'outline'}
                  className="w-full py-2 h-8 mt-2 focus:outline-none text-primary"
               >
                  Sign in with Google
               </Button>
               <div className="mt-4 text-center">
                  <span className='opacity-70'>New Freelancer?</span>
                  <a
                     className="text-button-blue-blue font-semibold cursor-pointer opacity-70 hover:opacity-100"
                     onClick={handleRegiser}
                  >
                     {' '}
                     Register
                  </a>
               </div>
            </div>
            <div className='opacity-70 hover:opacity-100 cursor-pointer'>
               Skip setup, explore demo.
            </div>
         </div>
      </div>
   );
};

export default LogInPage;
