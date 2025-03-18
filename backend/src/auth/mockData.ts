import { Prisma, PrismaClient, User } from "@prisma/client";
import { AccessTokenPayload, RefreshTokenPayload } from "src/auth/types";

export const mockUser = {
   id: '1a2b3c4d-1234-5678-9101-abcdefabcdef',
   email: 'johndoe@example.com',
   displayName: 'John Doe',
   password: '$2b$12$2bhJSAf6Qg68Y/sVrd9sNOzkYCo4k/vXuLTkrxCO/VrtU/AttQvw6',
   specialization: ['Graphic Design', 'Illustration'],
   bio: 'Freelance graphic designer specializing in branding and illustrations.',
   phoneNumber: '+1234567890',
   address: '123 Main St, New York, NY',
   avatar: 'https://example.com/avatar1.jpg',
   pinnedProjects: ['p1', 'p2'],
   currency: 'USD',
   quitting: false,
   createdAt: new Date('2025-03-12T10:00:00.000Z'), // ✅ Convert to Date
   updatedAt: new Date('2025-03-12T10:00:00.000Z'), // ✅ Convert to Date
   refreshTokens: [],
   projects: [],
   clients: [],
   partnerCompanies: [],
   clientContacts: [],
   partnerContacts: [],
   salesDocuments: [],
   files: [],
   tasks: [],
   events: [],
   authProvider: ['email'],
};

export const mockMinimalUserData:Partial<User> = {
  id: '1a2b3c4d-1234-5678-9101-abcdefabcdef',
   email: 'johndoe@example.com',
}

export const mockAccessTokenString =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxODM5MTAxLCJleHAiOjE3NDE4NDAwMDF9.g31wS1C_PLkUWi3GpILjgbyh4sw6hwwbnBCsHboP85I';

export const mockRefreshTokenString =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxODM5MTAxLCJleHAiOjE3NDE4NDAwMDF9.g31wS1C_PLkUWi3GpILjgbyh4sw6hwwbnBCsHboP85I';

export const mockAccessTokenPayload: AccessTokenPayload = {
   sub: '1234567890',
   iat: 1710332000,
   exp: 1710335600,
   role: 'user',
};

export const mockRefreshTokenPayload: RefreshTokenPayload = {
   sub: '1234567890',
   iat: 1710332000,
   exp: 1710335600,
 }

 export const mockRefreshTokenRecord = {
   id: '550e8400-e29b-41d4-a716-446655440000',
   token: 'mocktoken12345',
   userId: '123e4567-e89b-12d3-a456-426614174000',
   expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
 }
 
 export const mockRefreshTokenRecordWithUser = {
   id: '550e8400-e29b-41d4-a716-446655440000',
   token: 'mocktoken12345',
   userId: '123e4567-e89b-12d3-a456-426614174000',
   expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
   user: mockUser
 }