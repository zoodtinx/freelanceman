export interface User {
   id: string; 
   name: string; 
   email: string; 
   passwordHash: string; 
   role: 'admin' | 'freelancer' | 'client'; 
   avatarUrl?: string; 
   createdAt: Date; 
   updatedAt: Date; 
   bio?: string; 
   contacts?: string[]; 
   projects?: string[]; 
   settings?: {
     theme: 'light' | 'dark'; 
     notifications: {
       email: boolean; 
       push: boolean; 
     };
   };
   paymentDetails?: {
     accountHolderName: string;
     accountNumber: string;
     bankName: string;
     swiftCode: string;
   }; 
 }
 