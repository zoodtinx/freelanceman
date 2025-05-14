import { v4 as uuidv4 } from 'uuid';

export const getSeedUserData = () => {
   return   {
        displayName: 'John Doe',
        password: uuidv4(),
        email: uuidv4(),
        specialization: ['Graphic Design', 'Illustration'],
        pinnedProjects: [],
        quitting: false,
    }
}