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
   settings: {
      currency: string,
      quitting?: boolean
   }
}

export type UserSearchOption = Partial<
   Pick<User, "name" | "specialization" | "email">
>;

export interface CreateUserDto {
   name: string;
   specialization: string[];
   bio: string;
   email: string;
   phoneNumber: string;
   address: string;
   avatarUrl?: string;
   pinnedProjects?: string[];
   settings: {
      currency: string,
      quitting: boolean
   }
}

export interface RegisterUserDto {
   email: string;
   password: string;
   displayName: string;
}

export type EditUserDto = Partial<
   Pick<User, "name" | "specialization" | "bio" | "email" | "phoneNumber" | "address" | "avatarUrl" | "pinnedProjects">
>;
