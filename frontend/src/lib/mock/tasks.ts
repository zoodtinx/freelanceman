import { Task } from "@types";

export const task = {
  id: 'task-001',
  name: 'Create Project Proposal',
  status: 'inprogress',
  details:
     'Draft a comprehensive proposal for the new project, including objectives, scope, timeline, and deliverables.',
  link: 'https://example.com/project-proposal',
  startedAt: '2024-11-20T09:00:00Z',
  dueDate: '2024-11-27T17:00:00Z',
  project: 'Project Management Tool Development',
  projectId: '1234',
  client: 'Acme Corp',
  clientId: '5647',
};


export const tasks: Task[] = [
   {
     id: 'task-002',
     name: 'Write Blog Post',
     status: 'planned',
     details: 'Write a blog post on the latest design trends for 2024.',
     link: '',
     startedAt: '',
     dueDate: '2024-10-05T12:00:00',
     project: 'Content Creation for ABC Agency',
     client: 'ABC Agency',
   },
   {
     id: 'task-003',
     name: 'Develop API Endpoints',
     status: 'in progress',
     details: 'Build REST API endpoints for client management module.',
     link: 'https://github.com/xyz/project-api',
     startedAt: '2024-09-28T08:30:00',
     dueDate: '2024-10-07T18:00:00',
     project: 'Client Management System',
     client: 'DEF Solutions',
   },
   {
     id: 'task-004',
     name: 'Logo Redesign',
     status: 'completed',
     details: 'Finalize logo redesign and send files to the client.',
     link: 'https://www.dropbox.com/logo-final',
     startedAt: '2024-09-15T09:00:00',
     dueDate: '2024-09-20T18:00:00',
     project: 'Branding Refresh for GHI Corp',
     client: 'GHI Corp',
   },
   {
     id: 'task-005',
     name: 'Social Media Audit',
     status: 'planned',
     details: 'Conduct a social media audit for client’s Instagram and LinkedIn accounts.',
     link: '',
     startedAt: '',
     dueDate: '2024-10-12T17:00:00',
     project: 'Social Media Optimization for JKL Media',
     client: 'JKL Media',
   },
   {
     id: 'task-006',
     name: 'SEO Optimization',
     status: 'in progress',
     details: 'Optimize on-page SEO for landing page and blog posts.',
     link: 'https://www.semrush.com/dashboard',
     startedAt: '2024-09-30T11:00:00',
     dueDate: '2024-10-07T16:00:00',
     project: 'SEO Campaign for MNO Enterprises',
     client: 'MNO Enterprises',
   },
 ];
 