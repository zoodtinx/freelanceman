import { ProjectsViewProvider } from '@/lib/context/ProjectsViewContext';
import ProjectsLayout from '@/components/pages/all-project/ProjectsLayout';

export default function AllProjectPage() {

   return (
      <ProjectsViewProvider>
         <ProjectsLayout />
      </ProjectsViewProvider>
   );
}
