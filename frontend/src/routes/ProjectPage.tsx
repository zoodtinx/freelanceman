import { useProjectQuery } from '@/lib/api/project-api';
import { Link, useParams } from 'react-router-dom';
import { Users, SlidersHorizontal, Wallet, Briefcase, Settings, UsersRound } from 'lucide-react';
import { ProjectContactSection } from '@/components/page-elements/project/ProjectContactSection';
import ProjectFileSection from '@/components/page-elements/project/ProjectFileSection';
import ProjectNoteSection from '@/components/page-elements/project/ProjectNoteSection';
import ProjectLinkSection from '@/components/page-elements/project/ProjectLinkSection';
import {
   formatPaymentStatus,
   formatProjectStatus,
   getStatusColor,
} from 'src/components/shared/ui/helpers/Helpers';
import ProjectTaskSection from 'src/components/page-elements/project/ProjectTaskSection';
import ProjectEventSection from 'src/components/page-elements/project/ProjectEventSection';
import { Project } from '@types';
import { UseQueryResult } from '@tanstack/react-query';
import useDialogStore from '@/lib/zustand/dialog-store';

export interface ProjectPageSectionProps {
   project: Project
}

export default function ProjectPage() {
   const { projectId } = useParams();

   const projectQuery = useProjectQuery(projectId);
   const { data: project, isLoading } = useProjectQuery(projectId);

   return (
      <section className="flex grow gap-2">
         <div className="flex flex-col w-2/3 gap-2">
            <div className="flex flex-col bg-foreground rounded-[20px] px-4 py-3 w-full relative shadow-md h-[85px] justify-center">
               {isLoading ? (
                  <p>Loading...</p>
               ) : (
                  <ProjectHeader project={project} />
               )}
            </div>
            <div className="flex rounded-[20px] bg-foreground grow relative shadow-md">
               {isLoading ? (
                  <p>Loading...</p>
               ) : (
                  <>
                     <ProjectTaskSection project={project} />
                     <div className="flex h-full">
                        <div className="border-[0.5px] border-tertiary" />
                     </div>
                     <ProjectEventSection project={project} />
                  </>
               )}
            </div>
            <div className="flex rounded-[20px] bg-foreground h-1/3 relative shadow-md">
               {isLoading ? (
                  <p>Loading...</p>
               ) : (
                  <>
                     <div className="flex flex-col w-3/5 shrink-0">
                        <ProjectNoteSection />
                     </div>
                     <div className="flex h-full">
                        <div className="border-[0.5px] border-tertiary" />
                     </div>
                     <div className="flex flex-col w-2/5">
                        <ProjectLinkSection />
                     </div>
                  </>
               )}
            </div>
         </div>
         <div className="w-1/3 flex flex-col rounded-[20px] gap-2">
            <div className="flex flex-col rounded-[20px] bg-foreground grow relative shadow-md">
               {isLoading ? (
                  <p>Loading...</p>
               ) : (
                  <ProjectFileSection project={project} />
               )}
            </div>
            <div className="flex flex-col rounded-[20px] bg-foreground h-2/5 relative overflow-hidden shadow-md">
               {isLoading ? (
                  <p>Loading...</p>
               ) : (
                  <ProjectContactSection project={project} />
               )}
            </div>
         </div>
      </section>
   );
}

const ProjectHeader: React.FC<ProjectPageSectionProps> = ({ project }) => {

   const { formDialogState, setFormDialogState } = useDialogStore();
   
   const handleOpenDialog = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: true,
            mode: 'edit',
            data: project,
            type: 'project-settings',
         };
      });
   }

   return (
      <>
         <div className='flex justify-between items-start'>
            <p className="text-[1.6em]">{project.title}</p>
            <Settings onClick={handleOpenDialog} className='w-5 h-5 stroke-[2px] text-secondary hover:text-primary transition-colors' />
         </div>
         <div className="flex justify-between">
            <div
               className="flex gap-1 text-secondary hover:text-primary w-fit transition-colors duration-75 cursor-pointer"
            >
               <UsersRound className=" w-5 h-auto" />
               <Link
                  to={`../../clients/${project.clientId}`}
                  className="text-md font-medium select-none"
               >
                  {project.client}
               </Link>
            </div>
            <div className="flex gap-1">
               <div className={`flex items-center gap-1 px-3 rounded-full text-constant-primary bg-${getStatusColor(project.projectStatus)}`}>
                  <Briefcase className="w-4 h-4" />
                  <p>Status :</p>
                  <p>{formatProjectStatus(project.projectStatus)}</p>
               </div>
               <div className={`flex items-center gap-1 px-3 rounded-full text-constant-primary bg-${getStatusColor(project.paymentStatus)}`}>
                  <Wallet className="w-4 h-4" />
                  <p>Payment :</p>
                  <p>{formatPaymentStatus(project.paymentStatus)}</p>
               </div>
            </div>
         </div>
      </>
   );
};
