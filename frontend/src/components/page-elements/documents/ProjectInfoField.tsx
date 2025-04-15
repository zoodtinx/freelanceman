import { TextInputForm, TextAreaForm } from 'src/components/shared/ui/form-field-elements';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SelectWithSearch } from 'src/components/shared/ui/form-field-elements';
import { useAllProjectsQuery, useProjectsQuery } from '@/lib/api/project-api';

const ProjectInfoField = ({ formMethods }:{ formMethods : UseFormReturn<SalesDocument>} ) => {
   const [searchTerm, setSearchTerm] = useState({})
   const [selectedProject, setSelectedProject] = useState({})
   const [projectData, setProjectData] = useState<Project | undefined>()
   const {data: projectList, isLoading} = useProjectsQuery(searchTerm)

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
         setValue('projectTitle', projectData.title);
         setValue('referenceNumber', projectData.id);
         setValue('projectDescription', projectData.note);
         setValue('selectedProjectClientId', projectData.clientId);
      }
   }, [projectData, setValue]);

   const projectSelection = projectList ? projectList.map((project) => {
      return (
         {value: project.id, label: project.title}
      )
   }) : []
   return (
      <fieldset className="flex flex-col grow rounded-xl border border-tertiary p-3 relative gap-3">
         <div className="flex flex-col">
            <div className="flex gap-2 peer order-2">
               <div className="peer flex-1">
                  <TextInputForm fieldName="number" label="Number" formMethods={formMethods} />
               </div>
               <div className="peer flex-1">
                  <TextInputForm fieldName="issuedAt" label="Issue date" formMethods={formMethods} />
               </div>
               <div className="peer flex-1">
                  <TextInputForm fieldName="currency" label="Currency" formMethods={formMethods} />
               </div>
            </div>
            <h2 className="text-lg text-secondary peer-focus-within:text-primary order-1">
               Quotation Info
            </h2>
         </div>
         <div className="flex flex-col grow">
            <div className="flex flex-col gap-2 peer order-2 h-full">
               <TextInputForm fieldName="projectTitle" label="Project Title" formMethods={formMethods} />
               <TextInputForm fieldName="referenceNumber" label="Reference Number" formMethods={formMethods} />
               <TextAreaForm fieldName="projectDescription" label="Project Details" formMethods={formMethods} />
            </div>
            <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
               <p>Project Info</p>
               <SelectWithSearch
                  selections={projectSelection}
                  placeholder='Select a project'
                  className="h-6 text-sm px-2 rounded-lg font-medium text-primary border border-primary max-w-[230px] truncate"
                  isLoading={isLoading}
                  handleSelect={populateProjectField}
                  handleSearch={searchName}
                  size='lg'
               />
            </div>
         </div>
      </fieldset>
   );
};

export default ProjectInfoField