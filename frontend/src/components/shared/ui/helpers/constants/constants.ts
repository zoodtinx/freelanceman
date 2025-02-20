import { TaskStatus, EventStatus, Project, Contact, Event, Task, File } from "@types";


 

 export const taskStatusSelections = [
   { value: 'pending', label: 'Planned', color: 'bg-yellow-100' },
   { value: 'inProgress', label: 'In Progress', color: 'bg-emerald-200' },
   { value: 'completed', label: 'Completed', color: 'bg-blue-100' },
   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-200' },
];

export const eventStatusSelections = [
   { value: 'scheduled', label: 'Scheduled', color: 'bg-yellow-100' },
   { value: 'inProgress', label: 'In Progress', color: 'bg-emerald-200' },
   { value: 'completed', label: 'Completed', color: 'bg-blue-100' },
   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-200' },
];

export const projectStatusSelections = [
   { value: 'active', label: 'Active', color: 'bg-green-100' },
   { value: 'onHold', label: 'On Hold', color: 'bg-orange-200' },
   { value: 'completed', label: 'Completed', color: 'bg-blue-200' },
];

export const paymentStatusSelections = [
   { value: 'notProcessed', label: 'Not Processed', color: 'bg-gray-200' },
   { value: 'processing', label: 'Processing', color: 'bg-yellow-200' },
   { value: 'paid', label: 'Paid', color: 'bg-teal-100' },
];

export const fileCategorySelections = [
   { value: 'project-document', label: 'Project Document' },
   { value: 'project-assets', label: 'Project Assets' },
   { value: 'project-file', label: 'Working File' },
   { value: 'client-file', label: 'Client File' },
   { value: 'personal', label: 'Personal' },
];

export  const fileTypeSelections = [
   { value: 'image', label: 'Image' },
   { value: 'video', label: 'Video' },
   { value: 'document', label: 'Document' },
   { value: 'code', label: 'Code' },
   { value: 'design', label: 'Design' },
   { value: 'spreadsheet', label: 'Spreadsheet' },
   { value: 'presentation', label: 'Presentation' },
   { value: 'audio', label: 'Audio' },
   { value: 'archive', label: 'Archive' },
   { value: 'video-editing', label: 'Video Editing' },
   { value: 'project-management', label: 'Project Management' },
   { value: 'database', label: 'Database' },
   { value: 'other', label: 'Other' },
];