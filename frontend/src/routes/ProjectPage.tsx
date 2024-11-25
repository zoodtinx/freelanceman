import { mockProjects } from '@/lib/mock/projects';
import { Client, Dots } from '@/components/shared/icons';
import ProjectSideBar from '@/components/pages/project/ProjectSideBar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
   useActiveproject,
   useProjectList,
   useGetProjectQuery,
} from '@/lib/redux/hooks';
import { useEffect } from 'react';
import { redirect } from 'react-router-dom';

export default function ProjectPage() {
   const { data, isSuccess } = useGetProjectQuery('/');
   const { setActiveProject } = useActiveproject();
   const url = useLocation().pathname;

   useEffect(() => {
      if (isSuccess && data) {
         setActiveProject(data);
      }
   }, [isSuccess, data, setActiveProject]);

   const { project } = useActiveproject();

   if (!project) {
      return <div>Loading...</div>; 
   }

   if (url !== `/home/${project.id}/tasks`) {
      redirect(`/home/${project.id}/tasks`); 
   }

   return (
      <section className="w-full h-full">
         <div className="flex flex-col rounded-[30px] bg-foreground p-4 pt-6 sm:w-full grow h-full gap-3">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-2xl font-medium">{project.name}</p>
                  <div
                     className="flex h-fit items-center gap-[5px] w-fit cursor-pointer"
                     style={{ color: project.color }}
                  >
                     <Client className="w-[20px] h-auto" />
                     <p>{project.client}</p>
                  </div>
               </div>
               <div>
                  <Dots className="text-secondary w-[25px] h-auto" />
               </div>
            </div>
            <div className="flex grow gap-4">
               <div className="flex grow">
                  <Outlet />
               </div>
               <ProjectSideBar />
            </div>
         </div>
      </section>
   );
}
