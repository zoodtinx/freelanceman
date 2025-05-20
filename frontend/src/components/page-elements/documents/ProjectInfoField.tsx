import {
   TextInputForm,
   TextAreaForm,
   Label,
   DatePickerForm,
} from 'src/components/shared/ui/form-field-elements';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useProjectsQuery } from '@/lib/api/project-api';
import { ProjectPayload, SalesDocumentPayload } from 'freelanceman-common';
import { capitalizeFirstChar } from '@/components/shared/ui/helpers/Helpers';
import { cn } from '@/lib/helper/utils';

const ProjectInfoField = ({
   formMethods,
}: {
   formMethods: UseFormReturn<SalesDocumentPayload>;
}) => {
   const [searchTerm, setSearchTerm] = useState({});
   const [selectedProject, setSelectedProject] = useState<string>();
   const [projectData, setProjectData] = useState<ProjectPayload | undefined>();
   const { data: projectList, isLoading } = useProjectsQuery(searchTerm);

   const {
      setValue,
      formState: { errors },
   } = formMethods;

   useEffect(() => {
      if (projectData) {
         setValue('projectId', projectData.id);
         setValue('title', projectData.title);
         setValue('referenceNumber', projectData.id);
         setValue('projectDescription', projectData.note || '');
         setValue('selectedProjectClientId', projectData.clientId);
      }
   }, [projectData, setValue]);

   const error = errors.projectTitle;

   return (
      <fieldset
         className={cn(
            'flex flex-1 flex-col grow rounded-xl border border-tertiary p-3 relative gap-3',
            error && 'border-general-red'
         )}
      >
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
                  <div className="flex gap-1 items-center">
                     <DatePickerForm
                        fieldName="issuedAt"
                        formMethods={formMethods}
                        className="items-center text-md font-normal"
                     />
                  </div>
               </div>
            </div>
            <h2 className="text-lg text-secondary peer-focus-within:text-primary order-1">
               {capitalizeFirstChar(formMethods.getValues('category'))} Info
            </h2>
         </div>
         <div className="flex flex-col grow">
            <div className="flex flex-col  peer order-2 gap-2 grow">
               <div>
                  <Label className="pb-0">Project Title</Label>
                  <TextInputForm
                     fieldName="projectTitle"
                     required
                     errorMessage="Please enter a project title"
                     formMethods={formMethods}
                  />
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
         </div>
      </fieldset>
   );
};

export default ProjectInfoField;
