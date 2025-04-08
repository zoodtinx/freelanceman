import React from 'react';
import { HamIcon } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import {
   Label,
   TextInputForm,
} from '@/components/shared/ui/form-field-elements';
import { register } from '@/lib/api/auth-api';
import useAuthStore from '@/lib/zustand/auth-store';

const RegisterPage: React.FC = () => {
   const setAccessToken = useAuthStore(
      (state) => state.setAccessToken
   );
   
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
      }

      const { accessToken } = await register(payload);
      setAccessToken(accessToken)
   };

   return (
      <div className="bg-background w-full h-screen flex items-center justify-center">
         <div className="bg-white p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-medium text-center mb-6">
               Create an Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div>
                  <Label>Display Name</Label>
                  <TextInputForm
                     fieldName="displayName"
                     formMethods={formMethods}
                     required={true}
                  />
               </div>
               <div>
                  <Label>Email</Label>
                  <TextInputForm
                     fieldName="email"
                     formMethods={formMethods}
                     required={true}
                  />
               </div>
               <div>
                  <Label>Password</Label>
                  <TextInputForm
                     fieldName="password"
                     formMethods={formMethods}
                     required={true}
                  />
               </div>
               <div>
                  <Label>Confirm Password</Label>
                  <TextInputForm
                     fieldName="confirmPassword"
                     formMethods={formMethods}
                  />
               </div>

               <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 text-white rounded-md mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
               >
                  Sign Up
               </button>
            </form>

            <button
               onClick={handleGoogleSignup}
               className="w-full mt-2 flex items-center justify-center py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
               <HamIcon className="w-5 h-5 mr-2" />
               Sign up with Google
            </button>

            <div className="mt-4 text-center text-sm text-gray-600">
               <span>Already have an account?</span>
               <a
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-800"
               >
                  {' '}
                  Log in
               </a>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;
