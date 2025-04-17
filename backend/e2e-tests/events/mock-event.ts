export const mockCreateEventPayload = {
  name: "Design Proposal Review",
  status: "In Progress",
  projectId: "088860df-8fdd-4379-a8e6-c3fb3d997003",
  clientId: "0e6e4218-7366-4e33-903b-da1f7d0d2d55",
  dueAt: "2025-04-10T15:30:00Z",
  details: "Review the design proposal with the client, gather feedback, and prepare revisions.",
  link: "https://example.com/meeting-link"
};

export const mockSearchEvent = {
  name: 'Kickoff',
  status: 'scheduled',
  dueAt: new Date().toISOString(),
  projectId: '1d3f60dc-471e-4975-8507-abc07104ac5d',
  clientId: '1c33ad06-c6fe-420b-b540-9b1b79421373',
};

export const mockUpdateEvent = {
  name: 'Rescheduled kickoff',
  status: 'scheduled',
  dueAt: new Date().toISOString(),
  link: 'https://example.com/new-meeting-link',
  details: 'Client changed the date',
};


