import { User } from "@prisma/client";

export interface ApiCreateDemoUserResponse {
   user: Partial<User>;
   accessToken: string;
 }
 