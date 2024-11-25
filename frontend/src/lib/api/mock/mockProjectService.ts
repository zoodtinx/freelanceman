import type { Project } from "@types";

const sampleProject: Partial<Project> = {
   id: "proj-12345",
   client: "Acme Corp",
   name: "Website Redesign",
   brief: {
     summary: "Redesign the company website to improve user experience.",
     details: "The redesign will include a new homepage, about us section, and e-commerce functionality.",
     requirements: ["Responsive design", "SEO optimization", "Accessibility compliance"],
   },
   projectStatus: "active", // Example status: "NotStarted", "InProgress", "Completed", etc.
   paymentStatus: "not processed", // Example status: "Pending", "Paid", "Overdue", etc.
   color: "#FF5733", // Example accent color for the project
   dateCreated: "2024-11-01T10:00:00.000Z",
   dateModified: "2024-11-15T15:30:00.000Z",
 };
 
 export const getProject = (id: string): Promise<Partial<Project>> => {
   return new Promise((resolve) => {
     setTimeout(() => resolve(sampleProject), 500);
   });
 };
 
 export const editProject = <K extends keyof Partial<Project>>(
   key: K,
   value: Partial<Project>[K]
 ): Promise<Partial<Project>> => {
   console.log("project service key", key);
   console.log("project service value", value);

   if (sampleProject[key] !== undefined) {
    console.log(sampleProject[key]) 
    sampleProject[key] = value;
     sampleProject.dateModified = new Date().toISOString(); // Update modification date
   } else {
     console.error(`Key "${key}" does not exist on sampleProject.`);
   }
   
   return Promise.resolve(sampleProject);
 };
 