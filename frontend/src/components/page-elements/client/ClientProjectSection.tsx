import { Building2, EllipsisVertical, FolderClock } from 'lucide-react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, { useState } from 'react';
import { Switch } from '@/components/shared/ui/primitives/Switch';
import { formatDate } from '@/lib/helper/formatDateTime';
import { Link } from 'react-router-dom';
import { useAllProjectsQuery } from '@/lib/api/project-api';
import { Project, ProjectSearchOption } from '@types';
import { cn } from '@/lib/helper/utils';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';

const ClientProjectSection: React.FC<ClientSectionProps> = ({
   clientData,
   isLoading: clientIsLoading
}) => {
   const [projectFilter, setProjectFilter] = useState<ProjectSearchOption>({
      clientId: clientData?.id
   })
   
   const { data: projectsData, isLoading: projectIsLoading } = useAllProjectsQuery(projectFilter)

   if (clientIsLoading && projectIsLoading) {
      return 'Loading';
   }

   const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      setProjectFilter((prevFilter) => ({
         ...prevFilter,
         title: searchValue
      }));
   };

   const handleToggleActive = (value: boolean) => {
      let status
      if (value === true) {
         status = 'active'
      } else {
         status = ''
      }
      setProjectFilter((prevFilter) => ({
         ...prevFilter,
         projectStatus: status
      }));
   }

   return (
      <div
         className={`flex flex-col w-full sm:w-full gap-[6px] grow p-4 pt-2
            bg-foreground rounded-[20px] overflow-hidden shadow-md`}
      >
         <div className="flex justify-between">
            <div className="flex items-center h-[40px] justify-between w-full">
               <div className="flex gap-1 items-center">
                  <Building2 className="w-[28px] h-auto mt-1" />
                  <p className="text-xl pt-1 leading-none mr-2">
                     {clientData.name}
                  </p>
               </div>
               <EllipsisVertical className="w-5 h-5 text-secondary" />
            </div>
         </div>
         <div className="flex justify-between items-center">
            <SearchBox
               className="border rounded-full h-7 w-[250px]"
               onChange={handleSearchInput}
            />
            <div className="flex">
               <div className="flex gap-1">
                  <p>Active</p>
                  <Switch onCheckedChange={handleToggleActive} />
               </div>
            </div>
         </div>
         <ProjectList
            projectsData={projectsData}
            loadingState={projectIsLoading}
            className="pt-1"
         />
      </div>
   );
};

interface ProjectListProps {
   projectsData: Project[],
   loadingState: boolean,
   className: string
}

const ProjectList: React.FC<ProjectListProps> = ({projectsData, loadingState, className}) => {
   if (loadingState) {
      return 'Loading...'
   }
   
   const projectListItems = projectsData.map((project) => {
      return (
         <ProjectTab project={project} key={project.id} />
      )
   })

   return (
      <div className={cn('flex flex-col gap-1', className)}>
         {projectListItems}
      </div>
   )
}

const ProjectTab: React.FC<{ project: Project }> = ({ project }) => {
   const formattedDateModified = formatDate(project.modifiedAt, 'LONG');

   return (
      <Link
         to={`../../projects/${project.id}`}
         style={{ backgroundColor: project.themeColor, borderColor: project.themeColor }}
         className={`flex rounded-[15px] h-[40px] relative transition-colors
            hover:border-primary border group overflow-hidden cursor-default`}
      >
         <div className="z-10 flex items-center px-3 justify-between w-full text-[#333333]">
            <p className="font-medium max-w-[700px] text-md truncate cursor-default">
               {project.title}
            </p>
            <div className="flex items-center gap-2 text-freelanceman-darkgrey">
               <FolderClock className="w-4 h-4" />
               <p>{formattedDateModified}</p>
            </div>
         </div>
         <div className='absolute opacity-30 group-hover:opacity-65 w-full h-full bg-gradient-to-r from-white to-transparent transition-opacity'></div>
      </Link>
   );
};

export default ClientProjectSection;
