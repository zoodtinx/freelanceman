import { TextInput, TextAreaInput } from '@/components/shared/ui/form-field-elements/TextInput';
import { Project, SalesDocument } from '@types';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SelectWithApiSearch } from '@/components/shared/ui/SelectWithApiSearch';
import { useAllProjectsQuery } from '@/lib/api/project-api';

const ProjectInfoField = ({ formMethods }:{ formMethods : UseFormReturn<SalesDocument>} ) => {
   const [searchTerm, setSearchTerm] = useState({})
   const [selectedProject, setSelectedProject] = useState({})
   const [projectData, setProjectData] = useState<Project | undefined>()
   const {data: projectList, isLoading} = useAllProjectsQuery(searchTerm)

   const { setValue } = formMethods;

   const searchName = (value: string) => {
      setSearchTerm({ name: value });
   };

   const populateProjectField = (value: string) => {
      setSelectedProject(value)
      const selectedProjectData = projectList?.find((project) => project.id === value)
      setProjectData(selectedProjectData)
   }

   useEffect(() => {
      if (projectData) {
         setValue('projectId', projectData.id);
         setValue('projectTitle', projectData.name);
         setValue('referenceNumber', projectData.id);
         setValue('projectDescription', projectData.detail);
         setValue('selectedProjectClientId', projectData.clientId);
      }
   }, [projectData, setValue]);

   const projectSelection = projectList ? projectList.map((project) => {
      return (
         {value: project.id, label: project.name}
      )
   }) : []
   return (
      <fieldset className="flex flex-col grow rounded-xl border border-tertiary p-3 relative gap-3">
         <div className="flex flex-col">
            <div className="flex gap-2 peer order-2">
               <div className="peer flex-1">
                  <TextInput fieldName="number" label="Number" formMethods={formMethods} />
               </div>
               <div className="peer flex-1">
                  <TextInput fieldName="issuedAt" label="Issue date" formMethods={formMethods} />
               </div>
               <div className="peer flex-1">
                  <TextInput fieldName="currency" label="Currency" formMethods={formMethods} />
               </div>
            </div>
            <h2 className="text-lg text-secondary peer-focus-within:text-primary order-1">
               Quotation Info
            </h2>
         </div>
         <div className="flex flex-col grow">
            <div className="flex flex-col gap-2 peer order-2 h-full">
               <TextInput fieldName="projectTitle" label="Project Title" formMethods={formMethods} />
               <TextInput fieldName="referenceNumber" label="Reference Number" formMethods={formMethods} />
               <TextAreaInput fieldName="projectDescription" label="Project Details" formMethods={formMethods} />
            </div>
            <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
               <p>Project Info</p>
               <SelectWithApiSearch
                  selectContents={projectSelection}
                  placeholder='Select a project'
                  className="h-6 text-sm px-2 rounded-lg font-medium text-primary border border-primary max-w-[230px] truncate"
                  isLoading={isLoading}
                  onValueChange={populateProjectField}
                  onInputChange={searchName}
                  size='lg'
               />
            </div>
         </div>
      </fieldset>
   );
};

export default ProjectInfoField