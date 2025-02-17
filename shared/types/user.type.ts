export interface User {
   id: string;
   name: string;
   specialization: string[];
   bio: string;
   email: string;
   phoneNumber: string;
   address: string;
   avatarUrl?: string;
   pinnedProjects: string[];
   createdAt: Date;
   updatedAt: Date;
}
