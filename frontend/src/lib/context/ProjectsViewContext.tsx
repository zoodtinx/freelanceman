import { useContext, createContext, useState, useEffect } from 'react';
import type { Project } from '@types';
import type {
   Filter,
   ProjectsViewContextType,
   FilterType,
   StatusMap,
} from './ProjectViewContextTypes';

const useProjectsView = () => {
   const [projects, setProjects] = useState<Project[]>([]);
   const [filteredProject, setFilteredProject] = useState<Project[]>([]);
   const [viewMode, setViewMode] = useState('grid');
   const [clientList, setClientList] = useState<string[]>([]);
   const [currentFilter, setCurrentFilter] = useState<Filter>({
      projectStatus: 'active',
      paymentStatus: 'all',
      viewMode: 'grid',
      sortBy: 'dateModified',
      sortOrder: 'asc',
      searchTerm: '',
      client: 'all',
   });

   
   const [isTaskDialogOpen, setIsTaskDialogOpen] = useState({
      isOpen: false,
      id: ''
   });
   const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState({
      isOpen: false,
      id: ''
   });

   const setFilter = (type: FilterType, status: StatusMap[FilterType]) => {
      setCurrentFilter((prev) => ({
         ...prev,
         [type]: status,
      }));
   };

   const logger = (projects: Project[]) => {
      setProjects(projects);
   };

   useEffect(() => {
      const filterProject = (filter: Filter) => {
         const {
            projectStatus,
            paymentStatus,
            client,
            sortBy,
            sortOrder,
            searchTerm,
         } = filter;
         const filtered = projects.filter((project) => {
            const isProjectStatusMatch =
               projectStatus === 'all' ||
               project.projectStatus === projectStatus;
            const isPaymentStatusMatch =
               paymentStatus === 'all' ||
               project.paymentStatus === paymentStatus;
            const isClientMatch =
               client === 'all' ||
               project.client.toLowerCase().includes(client.toLowerCase());
            const isSearchMatch =
               searchTerm === '' ||
               project.name.toLowerCase().includes(searchTerm.toLowerCase());
            return (
               isProjectStatusMatch &&
               isPaymentStatusMatch &&
               isClientMatch &&
               isSearchMatch
            );
         });

         filtered.sort((a, b) => {
            if (sortBy === 'dateModified') {
               return sortOrder === 'asc'
                  ? new Date(a.dateModified).getTime() -
                       new Date(b.dateModified).getTime()
                  : new Date(b.dateModified).getTime() -
                       new Date(a.dateModified).getTime();
            } else if (sortBy === 'dateCreated') {
               return sortOrder === 'asc'
                  ? new Date(a.dateCreated).getTime() -
                       new Date(b.dateCreated).getTime()
                  : new Date(b.dateCreated).getTime() -
                       new Date(a.dateCreated).getTime();
            } else if (sortBy === 'name') {
               return sortOrder === 'asc'
                  ? a.name.localeCompare(b.name)
                  : b.name.localeCompare(a.name);
            }
            return 0;
         });
         setFilteredProject(filtered);
      };
      filterProject(currentFilter);
   }, [currentFilter, projects]);

   useEffect(() => {
      const clientList = projects.map((project) => project.client);
      setClientList([...new Set(clientList)]);
   }, [projects]);

   return {
      projects: filteredProject,
      setProjects: logger,
      viewMode,
      currentFilter,
      setViewMode,
      setFilter,
      clientList,
      isTaskDialogOpen,
      setIsTaskDialogOpen,
      isSettingsDialogOpen,
      setIsSettingsDialogOpen,
   };
};

const ProjectsViewContext = createContext<ProjectsViewContextType>();

export const ProjectsViewProvider = ({ children }) => {
   const {
      currentFilter,
      projects,
      setFilter,
      setProjects,
      setViewMode,
      viewMode,
      clientList,
      isTaskDialogOpen,
      setIsTaskDialogOpen,
      isSettingsDialogOpen,
      setIsSettingsDialogOpen,
   } = useProjectsView();

   return (
      <ProjectsViewContext.Provider
         value={{
            currentFilter,
            projects,
            setFilter,
            setProjects,
            setViewMode,
            viewMode,
            clientList,
            isTaskDialogOpen,
            setIsTaskDialogOpen,
            isSettingsDialogOpen,
            setIsSettingsDialogOpen,
         }}
      >
         {children}
      </ProjectsViewContext.Provider>
   );
};

export const useProjectsViewContext = () => {
   const context = useContext(ProjectsViewContext);
   if (!context) {
      throw new Error(
         'useProjectsViewContext must be used within a ProjectViewProvider'
      );
   }
   return context;
};
