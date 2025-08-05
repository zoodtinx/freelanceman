import { useEditProject, useProjectQuery } from '@/lib/api/project-api';
import { Link, useParams } from 'react-router-dom';
import { Wallet, Briefcase, Settings, UsersRound } from 'lucide-react';
import { ProjectContactSection } from '@/components/page-elements/project/ProjectContactSection';
import ProjectFileSection from '@/components/page-elements/project/ProjectFileSection';
import ProjectNoteSection from '@/components/page-elements/project/ProjectNoteSection';
import ProjectLinkSection from '@/components/page-elements/project/ProjectLinkSection';
import ProjectTaskSection from 'src/components/page-elements/project/ProjectTaskSection';
import ProjectEventSection from 'src/components/page-elements/project/ProjectEventSection';
import { ProjectFindOneResponse } from 'freelanceman-common';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import StatusSelect from '@/components/shared/ui/select/StatusSelect';
import {
   paymentStatusSelections,
   projectStatusSelections,
} from '@/components/shared/ui/helpers/constants/selections';
import { useRef, useState } from 'react';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import { cn } from '@/lib/helper/utils';

export default function ProjectPage() {
   const { projectId } = useParams();
   const { data: project, isLoading } = useProjectQuery(
      projectId!,
      Boolean(projectId)
   );

   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   // check if user has visited the page to show or hide welcome dialog
   if (localStorage.getItem('project') !== 'visited') {
      setWelcomeDialogState({ isOpen: true, page: 'projectPage' });
   }

   return (
      <div
         className={cn(
            'flex grow w-full overflow-y-auto gap-2',
            'lg:p-1 lg:pb-2',
            'md:pb-2 md:p-1',
            'sm:flex-col sm:gap-0'
         )}
      >
         <div
            className={cn(
               'flex flex-col grow gap-2 w-2/3',
               'sm:w-full sm:gap-2'
            )}
         >
            {isLoading || !project ? (
               <Skeleton className="flex flex-col rounded-[13px] px-4 py-3 w-full relative  h-[85px] justify-center shrink-0" />
            ) : (
               <div
                  className={cn(
                     'flex flex-col bg-foreground rounded-[13px] px-4 py-3 w-full relative shadow-md h-[85px] justify-center',
                     'sm:h-fit sm:p-2 sm:px-3 sm:gap-2 sm:pb-3 sm:shadow-md sm:border sm:border-secondary sm:dark:border-tertiary'
                  )}
               >
                  <ProjectHeader project={project} />
               </div>
            )}

            <div
               className={cn(
                  'flex gap-2 h-[65%] shrink-0 grow-0',
                  'sm:flex-col sm:h-auto'
               )}
            >
               {isLoading || !project ? (
                  <Skeleton className="flex rounded-[13px] relative w-1/2 h-full" />
               ) : (
                  <div
                     className={cn(
                        'flex rounded-[13px] bg-foreground relative shadow-md w-1/2',
                        'sm:w-full sm:h-[420px] sm:shadow-md sm:border sm:border-secondary sm:dark:border-tertiary'
                     )}
                  >
                     <ProjectTaskSection project={project} />
                  </div>
               )}

               {isLoading || !project ? (
                  <Skeleton className="flex rounded-[13px] relative w-1/2 h-full" />
               ) : (
                  <div
                     className={cn(
                        'flex rounded-[13px] bg-foreground relative shadow-md w-1/2 overflow-hidden',
                        'sm:w-full sm:h-[420px] sm:shadow-md sm:border sm:border-secondary sm:dark:border-tertiary'
                     )}
                  >
                     <ProjectEventSection project={project} />
                  </div>
               )}
            </div>

            <div
               className={cn(
                  'flex gap-2 h-[35%] grow-0 w-full',
                  'sm:flex-col sm:h-auto'
               )}
            >
               {isLoading || !project ? (
                  <Skeleton className="flex rounded-[13px] relative shadow-md w-[35%] h-full shrink-0" />
               ) : (
                  <div
                     className={cn(
                        'flex rounded-[13px] bg-foreground relative shadow-md w-[35%] shrink-0',
                        'sm:w-full sm:h-[300px] sm:shadow-md h-full sm:border sm:border-secondary sm:dark:border-tertiary'
                     )}
                  >
                     <ProjectLinkSection project={project} />
                  </div>
               )}

               {isLoading || !project ? (
                  <Skeleton className="flex rounded-[13px] relative shadow-md w-[65%] h-full" />
               ) : (
                  <div
                     className={cn(
                        'flex rounded-[13px] bg-foreground relative shadow-md w-[65%] h-full',
                        'sm:w-full sm:h-[300px] sm:shadow-md sm:border sm:border-secondary sm:dark:border-tertiary'
                     )}
                  >
                     <ProjectNoteSection project={project} />
                  </div>
               )}
            </div>
         </div>

         <div
            className={cn(
               'w-[340px] flex flex-col rounded-[13px] gap-2 bg-',
               'sm:w-full sm:shadow-md sm:mt-2 sm:pb-4'
            )}
         >
            {isLoading || !project ? (
               <Skeleton className="flex flex-col rounded-[13px] h-2/5 relative overflow-hidden" />
            ) : (
               <div
                  className={cn(
                     'flex flex-col rounded-[13px] bg-foreground h-2/5 relative overflow-hidden shadow-md',
                     'sm:w-full sm:h-[300px] sm:shadow-md sm:border sm:border-secondary sm:dark:border-tertiary'
                  )}
               >
                  <ProjectContactSection project={project} />
               </div>
            )}
            {isLoading || !project ? (
               <Skeleton className="flex flex-col rounded-[13px] grow relative" />
            ) : (
               <div
                  className={cn(
                     'flex flex-col rounded-[13px] bg-foreground grow relative overflow-hidden shadow-md',
                     'sm:w-full sm:shadow-md sm:h-[420px] sm:border sm:border-secondary sm:dark:border-tertiary'
                  )}
               >
                  <ProjectFileSection project={project} />
               </div>
            )}
         </div>
      </div>
   );
}

const ProjectHeader = ({ project }: { project: ProjectFindOneResponse }) => {
   const [projectStatus, setprojectStatus] = useState(project.projectStatus);
   const [paymentStatus, setPaymentStatus] = useState(project.paymentStatus);

   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const editProject = useEditProject();

   const handleEditProject = () => {
      editProject.mutate({
         id: project.id,
         projectStatus: projectStatus as any,
         paymentStatus: paymentStatus as any,
      });
   };

   const handleOpenDialog = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: true,
            mode: 'edit',
            data: project,
            type: 'projectSettings',
            entity: 'project',
            openedOn: 'projectPage',
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
            <p className="text-[1.6em] sm:text-lg sm:leading-snug font-medium lg:font-normal">
               {project.name}
            </p>
            <Settings
               onClick={handleOpenDialog}
               className="w-5 h-5 stroke-[2px] text-secondary hover:text-primary transition-colors shrink-0"
            />
         </div>
         <div className="flex justify-between">
            <div className={`flex gap-1 text-secondary hover:text-primary w-fit transition-colors duration-75 cursor-pointer sm:hidden items-center`}>
               <UsersRound className="w-5 h-auto" />
               <Link
                  to={project.clientId ? `../../clients/${project.clientId}` : ''}
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
                  <Briefcase className="w-4 h-4 mr-1 sm:mr-0" />
                  <p className="sm:hidden">Status:</p>
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
                  <Wallet className="w-4 h-4 mr-1 sm:mr-0" />
                  <p className="sm:hidden">Payment:</p>
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
