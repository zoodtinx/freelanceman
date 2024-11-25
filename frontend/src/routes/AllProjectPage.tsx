import { ProjectsViewProvider } from '@/lib/helper/ProjectsViewContext';
import ProjectsLayout from '@/components/pages/all-project/ProjectsLayout';

export default function AllProjectPage() {

   return (
      <ProjectsViewProvider>
         <ProjectsLayout />
      </ProjectsViewProvider>
   );
}
