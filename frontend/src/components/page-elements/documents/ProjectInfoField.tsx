import {
   TextInputForm,
   TextAreaForm,
   Label,
   DatePickerForm,
} from 'src/components/shared/ui/form-field-elements';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SelectWithSearch } from 'src/components/shared/ui/form-field-elements';
import { useProjectsQuery } from '@/lib/api/project-api';
import { ProjectPayload, SalesDocumentPayload } from 'freelanceman-common';
import { Calendar } from 'lucide-react';

const ProjectInfoField = ({
   formMethods,
}: {
   formMethods: UseFormReturn<SalesDocumentPayload>;
}) => {
   const [searchTerm, setSearchTerm] = useState({});
   const [selectedProject, setSelectedProject] = useState<string>();
   const [projectData, setProjectData] = useState<ProjectPayload | undefined>();
   const { data: projectList, isLoading } = useProjectsQuery(searchTerm);

   const { setValue } = formMethods;

   const searchName = (value: string) => {
      setSearchTerm({ name: value });
   };

   const populateProjectField = (value: string) => {
      setSelectedProject(value);
      const selectedProjectData = projectList?.find(
         (project: any) => project.id === value
      );
      setProjectData(selectedProjectData);
   };

   useEffect(() => {
      if (projectData) {
         setValue('projectId', projectData.id);
         setValue('title', projectData.title);
         setValue('referenceNumber', projectData.id);
         setValue('projectDescription', projectData.note || '');
         setValue('selectedProjectClientId', projectData.clientId);
      }
   }, [projectData, setValue]);

   const projectSelection = projectList
      ? projectList.map((project: ProjectPayload) => {
           return { value: project.id, label: project.title };
        })
      : [];
   return (
      <fieldset className="flex flex-col grow rounded-xl border border-tertiary p-3 relative gap-3">
         <div className="flex flex-col">
            <div className="flex gap-2 peer order-2">
               <div className="peer flex-1">
                  <Label className="pb-0">Document Number</Label>
                  <TextInputForm fieldName="number" formMethods={formMethods} />
               </div>
               <div className="peer flex-1">
                  <Label className="pb-0">Currency</Label>
                  <TextInputForm
                     fieldName="currency"
                     formMethods={formMethods}
                  />
               </div>
               <div className="peer flex-1">
                  <Label className="pb-0">Issue date</Label>
                  <div className='flex gap-1 items-center'>
                     <Calendar className='w-5 h-5 text-secondary' />
                     <DatePickerForm
                        fieldName="issuedAt"
                        formMethods={formMethods}
                        className='items-center text-md font-normal'
                     />
                  </div>
               </div>
            </div>
            <h2 className="text-lg text-secondary peer-focus-within:text-primary order-1">
               Quotation Info
            </h2>
         </div>
         <div className="flex flex-col grow">
            <div className="flex flex-col  peer order-2 gap-2 grow">
               <div>
                  <Label className="pb-0">Project Title</Label>
                  <TextInputForm fieldName="title" formMethods={formMethods} />
               </div>
               <div>
                  <Label className="pb-0">Reference Number</Label>
                  <TextInputForm
                     fieldName="referenceNumber"
                     formMethods={formMethods}
                  />
               </div>
               <div className="flex flex-col grow">
                  <Label className="pb-0">Project Details</Label>
                  <TextAreaForm
                     fieldName="projectDescription"
                     formMethods={formMethods}
                     className="resize-none grow"
                  />
               </div>
            </div>
            <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
               <p>Project Info</p>
               <SelectWithSearch
                  selections={projectSelection}
                  placeholder="Select a project"
                  type="project"
                  value={selectedProject}
                  className="h-6 text-sm px-2 rounded-lg font-medium text-primary border border-primary max-w-[230px] truncate"
                  isLoading={isLoading}
                  handleSelect={populateProjectField}
                  handleSearch={searchName}
                  size="lg"
               />
            </div>
         </div>
      </fieldset>
   );
};

export default ProjectInfoField;
