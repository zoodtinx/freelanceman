export const mockCreateClientPayload = {
    name: 'Quantum Dynamics',
    taxId: '852-369-147',
    email: 'contact@quantumdynamics.com',
    phoneNumber: '+66 9876 5432',
    address: '88 Innovation Street, Bangkok',
    detail: 'Advanced quantum computing and AI research.',
    userId: '2769d98f-1e25-49ad-9e41-c05d3d261ef4',
    themeColor: '#4287f5',
};

export const mockCreateExistingClientPayload = {
    name: 'NextGen Robotics',
    taxId: '753-951-852',
    email: 'sales@nextgenrobotics.com',
    phoneNumber: '+66 2468 1357',
    address: '99 Future Lane, Khon Kaen',
    detail: 'AI-driven robotics and automation services.',
    userId: '2769d98f-1e25-49ad-9e41-c05d3d261ef4',
    themeColor: '#f5a742',
};

export const mockCreateClientPayloadWithInvalidUserId = {
    name: 'NextGen Robotics',
    taxId: '753-951-852',
    email: 'sales@nextgenrobotics.com',
    phoneNumber: '+66 2468 1357',
    address: '99 Future Lane, Khon Kaen',
    detail: 'AI-driven robotics and automation services.',
    userId: '2769d98f-1e25-49ad-9e41-z85d3d261ef4',
    themeColor: '#f5a742',
};

export const mockInvalidCreateClientPayload = {
    name: 'NextGen Robotics',
    taxId: '753-951-852',
    email: 'sales@nextgenrobotics.com',
    phoneNumber: '+66 2468 1357',
    address: '99 Future Lane, Khon Kaen',
    detail: 'AI-driven robotics and automation services.',
    themeColor: '#f5a742',
};
