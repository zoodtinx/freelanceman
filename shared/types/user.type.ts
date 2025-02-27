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
}

export type EditUserDto = Partial<
   Pick<User, "name" | "specialization" | "bio" | "email" | "phoneNumber" | "address" | "avatarUrl" | "pinnedProjects">
>;
