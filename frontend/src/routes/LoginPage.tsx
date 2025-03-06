import type React from 'react';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Link } from 'react-router-dom';
import { Button } from '@/components/shared/ui/primitives/Button';
import { Input } from '@/components/shared/ui/primitives/Input';
import { Label } from '@/components/shared/ui/form-field-elements';
import FreelanceManLogo from '@/components/page-elements/app-layout/topbar/Logo';

export default function LoginPage() {
   const [showPassword, setShowPassword] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [rememberMe, setRememberMe] = useState(false);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle login logic here
      console.log({ email, password, rememberMe });
   };

   return (
      <div className="bg-background w-auto h-screen flex flex-col sm:min-h-screen relative justify-center items-center">
         <div className="w-full max-w-md rounded-2xl border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
               <h2 className="text-2xl font-bold">Login</h2>
               <p className="text-sm text-muted-foreground">
                  Enter your email and password to access your account
               </p>
            </div>
            <form onSubmit={handleSubmit}>
               <div className="p-6 pt-0 space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                           href="/forgot-password"
                           className="text-sm text-primary hover:underline"
                        >
                           Forgot password?
                        </Link>
                     </div>
                     <div className="relative">
                        <Input
                           id="password"
                           type={showPassword ? 'text' : 'password'}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                        />
                        <Button
                           type="button"
                           variant="ghost"
                           size="icon"
                           className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                           onClick={() => setShowPassword(!showPassword)}
                           aria-label={
                              showPassword ? 'Hide password' : 'Show password'
                           }
                        >
                           {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                           ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                           )}
                        </Button>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Label htmlFor="remember" className="text-sm font-normal">
                        Remember me
                     </Label>
                  </div>
               </div>
               <div className="flex flex-col space-y-4 p-6 pt-0">
                  <Button type="submit" className="w-full">
                     Sign in
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                     Don&apos;t have an account?{' '}
                     <Link
                        href="/signup"
                        className="text-primary hover:underline"
                     >
                        Sign up
                     </Link>
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
}
