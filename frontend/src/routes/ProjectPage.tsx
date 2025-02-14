import { useProjectQuery } from '@/lib/api/project-api';
import { Link, useParams } from 'react-router-dom';
import { Users, EllipsisVertical, Wallet, Briefcase } from 'lucide-react';
import { ProjectContactSection } from '@/components/page-elements/project/ProjectContactSection';
import ProjectFileSection from '@/components/page-elements/project/ProjectFileSection';
import ProjectNoteSection from '@/components/page-elements/project/ProjectNoteSection';
import ProjectLinkSection from '@/components/page-elements/project/ProjectLinkSection';
import { formatPaymentStatus, formatProjectStatus } from 'src/components/shared/ui/helpers/Helpers';
import ProjectTaskSection from 'src/components/page-elements/project/ProjectTaskSection';
import ProjectEventSection from 'src/components/page-elements/project/ProjectEventSection';

export default function ProjectPage() {
   const { projectId } = useParams();

   const { data: project, isLoading } = useProjectQuery(projectId);

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (!project) {
      return <div>Project not found</div>;
   }

   return (
      <section className="flex grow gap-2">
         <div className="flex flex-col w-2/3 gap-2">
            <div className="flex flex-col bg-foreground rounded-[20px] px-4 py-3 w-full relative shadow-md">
               <p className="text-[1.6em]">{project.title}</p>
               <div className="flex justify-between">
                  <div
                     className="flex gap-1 cursor-default text-secondary hover:text-primary w-fit transition-colors duration-75"
                     style={{
                        color: project.themeColor,
                     }}
                  >
                     <Users className=" w-5 h-auto" />
                     <Link
                        to={`../../clients/${project.clientId}`}
                        className="text-md font-medium select-none cursor-default"
                     >
                        {project.client}
                     </Link>
                  </div>
                  <div className='flex gap-4'>
                     <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <p>Status :</p>
                        <p>{formatProjectStatus(project.projectStatus)}</p>
                     </div>
                     <div className="flex items-center gap-1">
                        <Wallet className="w-4 h-4" />
                        <p>Payment :</p>
                        <p>{formatPaymentStatus(project.paymentStatus)}</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex rounded-[20px] bg-foreground grow relative shadow-md">
               <ProjectTaskSection project={project} />
               <div className="flex h-full">
                  <div className="border-[0.5px] border-tertiary" />
               </div>
               <ProjectEventSection project={project} />
            </div>
            <div className="flex rounded-[20px] bg-foreground h-1/3 relative shadow-md">
               <div className="flex flex-col w-3/5 shrink-0">
                  <ProjectNoteSection />
               </div>
               <div className="flex h-full">
                  <div className="border-[0.5px] border-tertiary" />
               </div>
               <div className="flex flex-col w-2/5">
                  <ProjectLinkSection />
               </div>
            </div>
         </div>
         <div className="w-1/3 flex flex-col rounded-[20px] gap-2">
            <div className="flex flex-col rounded-[20px] bg-foreground grow relative shadow-md">
               <ProjectFileSection project={project} />
            </div>
            <div className="flex flex-col rounded-[20px] bg-foreground h-2/5 relative overflow-hidden shadow-md">
               <ProjectContactSection project={project} />
            </div>
         </div>
      </section>
   );
}

const ProjectHeader = () => {
   
}
