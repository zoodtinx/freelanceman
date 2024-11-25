import type { Project } from './project.types';
export interface UserProfile {
    id: string;
    username: string;
    email: string;
    avatar: string;
    bio: string;
    role: 'admin' | 'user';
    registeredAt: Date;
    projects: Project[];
}
