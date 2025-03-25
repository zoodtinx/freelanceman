import {
  CreateEventDto,
  SearchEventDto,
  UpdateEventDto,
} from 'src/shared/zod-schemas/event.schema';

export const mockCreateEvent: CreateEventDto = {
  name: 'Kickoff meeting',
  status: 'scheduled',
  projectId: '1d3f60dc-471e-4975-8507-abc07104ac5d',
  clientId: '1c33ad06-c6fe-420b-b540-9b1b79421373',
  dueAt: new Date().toISOString(),
  details: 'Discuss project scope and timeline',
  link: 'https://example.com/meeting-link',
};

export const mockSearchEvent: SearchEventDto = {
  name: 'Kickoff',
  status: 'scheduled',
  dueAt: new Date().toISOString(),
  projectId: '1d3f60dc-471e-4975-8507-abc07104ac5d',
  clientId: '1c33ad06-c6fe-420b-b540-9b1b79421373',
};

export const mockUpdateEvent: UpdateEventDto = {
  name: 'Rescheduled kickoff',
  status: 'scheduled',
  dueAt: new Date().toISOString(),
  link: 'https://example.com/new-meeting-link',
  details: 'Client changed the date',
};
