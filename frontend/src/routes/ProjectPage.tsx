import { useEditProject, useProjectQuery } from '@/lib/api/project-api';
import { Link, useParams } from 'react-router-dom';
import { Wallet, Briefcase, Settings, UsersRound } from 'lucide-react';
import { ProjectContactSection } from '@/components/page-elements/project/ProjectContactSection';
import ProjectFileSection from '@/components/page-elements/project/ProjectFileSection';
import ProjectNoteSection from '@/components/page-elements/project/ProjectNoteSection';
import ProjectLinkSection from '@/components/page-elements/project/ProjectLinkSection';
import ProjectTaskSection from 'src/components/page-elements/project/ProjectTaskSection';
import ProjectEventSection from 'src/components/page-elements/project/ProjectEventSection';
import { ProjectPayload } from 'freelanceman-common';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import StatusSelect from '@/components/shared/ui/select/StatusSelect';
import {
   paymentStatusSelections,
   projectStatusSelections,
} from '@/components/shared/ui/helpers/constants/selections';
import { toast } from 'sonner';
import { useRef, useState } from 'react';
import { useUserQuery } from '@/lib/api/user-api';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import { cn } from '@/lib/helper/utils';

export default function ProjectPage() {
   const { projectId } = useParams();
   const { data: project, isLoading } = useProjectQuery(
      projectId!,
      Boolean(projectId)
   );

   const { data: userData } = useUserQuery();
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   if (userData?.visitingStatus?.projectPage === false) {
      setWelcomeDialogState({ isOpen: true, page: 'projectPage' });
   }

   if (!isLoading && !project) {
      return 'No Project';
   }

   return (
      <div className="flex grow w-full sm:flex-col overflow-y-auto lg:p-1 md:p-1 lg:pb-2 md:pb-2 gap-2 sm:gap-0">
         <div className="flex flex-col grow gap-2 w-2/3 sm:w-full">
            {isLoading || !project ? (
               <Skeleton className="flex flex-col bg-foreground rounded-[13px] px-4 py-3 w-full relative shadow-md h-[85px] justify-center" />
            ) : (
               <div
                  className={cn(
                     'flex flex-col bg-foreground rounded-[13px] px-4 py-3 w-full relative shadow-md h-[85px] justify-center',
                     'sm:h-fit sm:p-2 sm:px-3 sm:gap-2 sm:pb-3 sm:shadow-sm'
                  )}
               >
                  <ProjectHeader project={project} />
               </div>
            )}

            <div className="flex gap-2 grow sm:flex-col h-[65%]">
               {isLoading || !project ? (
                  <Skeleton className="flex rounded-[13px] bg-foreground relative shadow-md w-1/2 h-full" />
               ) : (
                  <div
                     className={cn(
                        'flex rounded-[13px] bg-foreground relative shadow-md w-1/2',
                        'sm:w-full sm:h-[420px] sm:shadow-sm'
                     )}
                  >
                     <ProjectTaskSection project={project} />
                  </div>
               )}

               {isLoading || !project ? (
                  <Skeleton className="flex rounded-[13px] bg-foreground relative shadow-md w-1/2 h-full" />
               ) : (
                  <div
                     className={cn(
                        'flex rounded-[13px] bg-foreground relative shadow-md w-1/2 overflow-hidden',
                        'sm:w-full sm:h-[420px] sm:shadow-sm'
                     )}
                  >
                     <ProjectEventSection project={project} />
                  </div>
               )}
            </div>

            <div className="flex gap-2 grow sm:flex-col h-[35%]">
               {isLoading || !project ? (
                  <Skeleton className="flex rounded-[13px] bg-foreground relative shadow-md w-1/3 h-full" />
               ) : (
                  <div
                     className={cn(
                        'flex rounded-[13px] bg-foreground relative shadow-md w-[35%]',
                        'sm:w-full sm:min-h-[130px] sm:shadow-sm'
                     )}
                  >
                     <ProjectLinkSection project={project} />
                  </div>
               )}

               {isLoading || !project ? (
                  <Skeleton className="flex rounded-[13px] bg-foreground relative shadow-md w-2/3 h-full" />
               ) : (
                  <div
                     className={cn(
                        'flex rounded-[13px] bg-foreground relative shadow-md w-[65%]',
                        'sm:w-full sm:min-h-[200px] sm:shadow-sm'
                     )}
                  >
                     <ProjectNoteSection project={project} />
                  </div>
               )}
            </div>
         </div>

         <div
            className={cn(
               'w-[340px] flex flex-col rounded-[13px] gap-2',
               'sm:w-full sm:shadow-sm sm:mt-2 sm:pb-4'
            )}
         >
            {isLoading || !project ? (
               <Skeleton className="flex flex-col rounded-[13px] bg-foreground h-2/5 relative overflow-hidden shadow-md" />
            ) : (
               <div
                  className={cn(
                     'flex flex-col rounded-[13px] bg-foreground h-2/5 relative overflow-hidden shadow-md',
                     'sm:w-full sm:min-h-[130px] sm:shadow-sm'
                  )}
               >
                  <ProjectContactSection project={project} />
               </div>
            )}
            {isLoading || !project ? (
               <Skeleton className="flex flex-col rounded-[13px] bg-foreground grow relative shadow-md" />
            ) : (
               <div
                  className={cn(
                     'flex flex-col rounded-[13px] bg-foreground grow relative overflow-hidden shadow-md',
                     'sm:w-full sm:shadow-sm sm:min-h-[180px]'
                  )}
               >
                  <ProjectFileSection project={project} />
               </div>
            )}
         </div>
      </div>
   );
}

const ProjectHeader = ({ project }: { project: ProjectPayload }) => {
   const [projectStatus, setprojectStatus] = useState(project.projectStatus);
   const [paymentStatus, setPaymentStatus] = useState(project.paymentStatus);

   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const editProject = useEditProject({
      errorCallback() {
         toast.error('Unable to update the project');
      },
      successCallback() {
         toast.success('Project updated');
      },
   });

   const handleEditProject = () => {
      editProject.mutate({
         id: project.id,
         projectStatus: projectStatus,
         paymentStatus: paymentStatus,
      });
   };

   const handleOpenDialog = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: true,
            mode: 'edit',
            data: project,
            type: 'project-settings',
            entity: 'project',
            openedOn: 'project-page',
         };
      });
   };

   const handleProjectStatusChange = (value: any) => {
      setprojectStatus(value);
      handleEditProject();
   };

   const handlePaymentStatusChange = (value: any) => {
      setPaymentStatus(value);
      handleEditProject();
   };

   const projectSelectRef = useRef<HTMLButtonElement | null>(null);
   const paymentSelectRef = useRef<HTMLButtonElement | null>(null);
   const handleProjectSelectGroupClick = () => {
      projectSelectRef.current?.click();
   };
   const handlePaymentSelectGroupClick = () => {
      paymentSelectRef.current?.click();
   };

   return (
      <>
         <div className="flex justify-between items-start">
            <p className="text-[1.6em] sm:text-lg sm:leading-snug">
               {project.title}
            </p>
            <Settings
               onClick={handleOpenDialog}
               className="w-5 h-5 stroke-[2px] text-secondary hover:text-primary transition-colors"
            />
         </div>
         <div className="flex justify-between">
            <div className="flex gap-1 text-secondary hover:text-primary w-fit transition-colors duration-75 cursor-pointer sm:hidden">
               <UsersRound className=" w-5 h-auto" />
               <Link
                  to={project.clientId && `../../clients/${project.clientId}`}
                  className="text-md font-medium select-none"
               >
                  {project.client?.name ?? 'Freelancing'}
               </Link>
            </div>
            <div className="flex gap-1">
               <div
                  className="flex items-center border border-tertiary cursor-pointer rounded-full pl-3"
                  onClick={handleProjectSelectGroupClick}
               >
                  <Briefcase className="w-4 h-4 mr-1" />
                  <p className="sm:text-sm">Status:</p>
                  <StatusSelect
                     selections={projectStatusSelections}
                     value={projectStatus}
                     className="flex px-2 bg-transparent text-primary h-6 items-center py-0 font-semibold flex-1"
                     handleValueChange={handleProjectStatusChange}
                     showColor={false}
                     ref={projectSelectRef}
                  />
               </div>
               <div
                  className="flex items-center border border-tertiary cursor-pointer rounded-full pl-3 flex-1"
                  onClick={handlePaymentSelectGroupClick}
               >
                  <Wallet className="w-4 h-4 mr-1" />
                  <p className="sm:text-sm">Payment:</p>
                  <StatusSelect
                     selections={paymentStatusSelections}
                     value={paymentStatus}
                     className="flex px-2 bg-transparent text-primary h-6 items-center py-0 font-semibold"
                     handleValueChange={handlePaymentStatusChange}
                     showColor={false}
                     ref={paymentSelectRef}
                  />
               </div>
            </div>
         </div>
      </>
   );
};
