import { generateAuraTeaCoContacts } from './contacts/contacts';
import { generateAuraTeaCoProjects } from './projects/projects';

export const generateAuraTeaData = (userId: string) => {
    return {
        userId: userId,
        name: 'Aura Tea Co.',
        taxId: '123-456-7890',
        email: 'info@auratea.com',
        phoneNumber: '02-317-1064',
        address: '123 Tea Leaf Lane, Serenity City, CA 90210',
        detail: 'Premium organic tea distributor specializing in unique blends.',
        themeColor: '#8B4513',
    };
};

export const auraTeaDataGetterMap = {
    generateClient: generateAuraTeaData,
    generateContacts: generateAuraTeaCoContacts,
    generateProjects: generateAuraTeaCoProjects,
    generateProjectData: [
        {
            generateTasks: undefined,
            generateEvents: undefined,
            generateLinks: undefined,
            generateFiles: undefined,
        },
    ],
};
