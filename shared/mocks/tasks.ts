import { Task } from "../types/project.types";

export const mockTask: Task = {
  id: 'task-001',
  name: 'Create Project Proposal',
  status: 'inProgress',
  details:
    'Draft a comprehensive proposal for the new project, including objectives, scope, timeline, and deliverables.',
  link: 'https://example.com/project-proposal',
  createdAt: '2024-11-19T15:00:00Z', // Added createdAt field
  dueDate: '2024-11-27T17:00:00Z',
  project: 'Project Management Tool Development',
  projectId: '1234',
  client: 'Acme Corp',
  clientId: '5647',
};

export const mockAllTask: Task[] = [
  {
    id: 'task-002',
    name: 'Write Blog Post',
    status: 'planned',
    details: 'Write a blog post on the latest design trends for 2024.',
    link: '',
    createdAt: '2024-10-01T10:00:00', // Added createdAt field
    dueDate: '2024-10-05T12:00:00',
    project: 'Content Creation for ABC Agency',
    projectId: '2345', // Added projectId
    client: 'ABC Agency',
    clientId: '3456', // Added clientId
  },
  {
    id: 'task-003',
    name: 'Develop API Endpoints',
    status: 'inProgress',
    details: 'Build REST API endpoints for client management module.',
    link: 'https://github.com/xyz/project-api',
    createdAt: '2024-09-25T14:30:00', // Added createdAt field
    dueDate: '2024-10-07T18:00:00',
    project: 'Client Management System',
    projectId: '3456', // Added projectId
    client: 'DEF Solutions',
    clientId: '4567', // Added clientId
  },
  {
    id: 'task-004',
    name: 'Logo Redesign',
    status: 'completed',
    details: 'Finalize logo redesign and send files to the client.',
    link: 'https://www.dropbox.com/logo-final',
    createdAt: '2024-09-10T11:00:00', // Added createdAt field
    dueDate: '2024-09-20T18:00:00',
    project: 'Branding Refresh for GHI Corp',
    projectId: '4567', // Added projectId
    client: 'GHI Corp',
    clientId: '5678', // Added clientId
  },
  {
    id: 'task-005',
    name: 'Social Media Audit',
    status: 'planned',
    details: 'Conduct a social media audit for client’s Instagram and LinkedIn accounts.',
    link: '',
    createdAt: '2024-10-05T09:00:00', // Added createdAt field
    dueDate: '2024-10-12T17:00:00',
    project: 'Social Media Optimization for JKL Media',
    projectId: '5678', // Added projectId
    client: 'JKL Media',
    clientId: '6789', // Added clientId
  },
  {
    id: 'task-006',
    name: 'SEO Optimization',
    status: 'inProgress',
    details: 'Optimize on-page SEO for landing page and blog posts.',
    link: 'https://www.semrush.com/dashboard',
    createdAt: '2024-09-28T10:00:00', // Added createdAt field
    dueDate: '2024-10-07T16:00:00',
    project: 'SEO Campaign for MNO Enterprises',
    projectId: '6789', // Added projectId
    client: 'MNO Enterprises',
    clientId: '7890', // Added clientId
  },
];
