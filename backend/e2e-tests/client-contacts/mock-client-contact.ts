import { CreateClientContactDto } from "../../../shared/schemas/client-contact.schema";

export const mockCreateClientContactPayload: CreateClientContactDto = {
   name: 'John Doe',
   companyId: '0e6e4218-7366-4e33-903b-da1f7d0d2d55',
   role: 'Project Manager',
   phoneNumber: '123-456-7890',
   email: 'john.doe@example.com',
   detail: 'Main point of contact for project coordination.',
   avatar: 'https://example.com/avatar.jpg',
};
