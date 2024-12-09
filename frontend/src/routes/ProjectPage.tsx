import { useProjectQuery } from '@/lib/api/projectApi';
import { useParams } from 'react-router-dom';
import ProjectSideBar from '@/components/pages/project/ProjectSideBar';
import { Users, EllipsisVertical } from 'lucide-react';

export default function ProjectPage() {
   const { projectId } = useParams();
   const { data: project } = useProjectQuery(projectId || '', 'full');

   if (!projectId) {
      return <p>Oops</p>;
   }

   if (!project) {
      return <div>Loading...</div>;
   }

   console.log('project', project);

   return (
      <section className="flex flex-col rounded-2xl bg-foreground p-4 pt-5 w-full h-full relative">
         <EllipsisVertical className='absolute top-3 right-2 text-secondary hover:text-primary transition-colors duration-75'/>
         <p className="text-xl">{project.name}</p>
         <div className="flex gap-1 cursor-default text-secondary hover:text-primary transition-colors duration-75">
            <Users className=" w-5 h-auto" />
            <p className="text-md font-medium">
               {project.client}
            </p>
         </div>
         <div className="flex w-full">
            <div className="grow"></div>
            <ProjectSideBar />
         </div>
      </section>
   );
}
