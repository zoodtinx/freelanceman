import { useProjectQuery } from '@/lib/api/project-api';
import { Link, useParams } from 'react-router-dom';
import { Users, EllipsisVertical } from 'lucide-react';
import { ProjectContactSection } from '@/components/page-elements/project/ProjectContactSection';
import ProjectFileSection from '@/components/page-elements/project/ProjectFileSection';
import ProjectNoteSection from '@/components/page-elements/project/ProjectNoteSection';
import ProjectLinkSection from '@/components/page-elements/project/ProjectLinkSection';
import ProjectTask from '@/components/page-elements/project/ProjectTask';
import ProjectEvent from '@/components/page-elements/project/ProjectEvent';

export default function ProjectPage() {
   const { projectId } = useParams();
   const { data: project, isLoading } = useProjectQuery(projectId);

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (!project) {
      return <div>Project not found</div>;
   }

   console.log('project', project);

   return (
      <section className="flex grow gap-2">
         <div className="flex flex-col w-2/3 rounded-2xl gap-2">
            <div className="flex flex-col bg-transparent rounded-2xl px-1 py-3 w-full relative">
               <EllipsisVertical className="absolute top-3 right-2 text-secondary hover:text-primary transition-colors duration-75" />
               <p className="text-[1.7em]">{project.title}</p>
               <div className="flex gap-1 cursor-default text-secondary hover:text-primary w-fit transition-colors duration-75" style={{
                  color: project.accentColor
               }}>
                  <Users className=" w-5 h-auto" />
                  <Link
                     to={`../../clients/${project.clientId}`}
                     className="text-md font-medium select-none cursor-default"
                  >
                     {project.client}
                  </Link>
               </div>
            </div>
            <div className="flex rounded-2xl bg-foreground grow relative">
               <ProjectTask project={project} />
               <div className="flex h-full">
                  <div className="border-[0.5px] border-tertiary" />
               </div>
               <ProjectEvent />
            </div>
            <div className="flex rounded-2xl bg-foreground h-1/3 relative">
               <div className="flex flex-col flex-[5]">
                  <ProjectNoteSection />
               </div>
               <div className="flex h-full">
                  <div className="border-[0.5px] border-tertiary" />
               </div>
               <div className="flex flex-col flex-[3]">
                  <ProjectLinkSection />
               </div>
            </div>
         </div>
         <div className="w-1/3 flex flex-col rounded-2xl gap-2">
            <div className="flex flex-col rounded-2xl bg-foreground grow relative">
               <ProjectFileSection />
            </div>
            <div className="flex flex-col rounded-2xl bg-foreground h-2/5 relative">
               <ProjectContactSection />
            </div>
         </div>
      </section>
   );
}
