import { ExternalLink, LinkIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddButton from '@/components/shared/ui/AddButton';
import React, { useState } from 'react';
import { ProjectFindOneResponse, ProjectLink } from 'freelanceman-common';
import {
   Label,
   TextInputForm,
} from '@/components/shared/ui/form-field-elements';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/shared/ui/primitives/Button';
import { useEditProject } from '@/lib/api/project-api';
import { toast } from 'sonner';
import { NoDataPlaceHolder } from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';

const ProjectLinkSection: React.FC<{ project: ProjectFindOneResponse }> = ({
   project,
}) => {
   const [mode, setMode] = useState<'view' | 'add'>('view');

   const editProject = useEditProject();

   const handleDeleteLink = (index: number) => {
      const updatedLinks = [...(project.links || [])];
      updatedLinks.splice(index, 1);
      toast.loading('Deleting link...');
      editProject.mutate({
         id: project.id,
         links: updatedLinks,
      });
   };

   return (
      <div className="flex flex-col w-full h-full">
         <div className="flex justify-between items-center pl-3 pr-2 lg:font-normal">
            <p className="flex items-center h-9 text-md gap-1">
               <LinkIcon className="w-4 h-4" />
               Links
            </p>
            <AddButton className="w-7 h-7" onClick={() => setMode('add')} />
         </div>
         <div className="w-full border-[0.5px] border-quaternary" />
         {mode === 'view' && !project.links.length ? (
            <NoDataPlaceHolder
               className="sm:pb-0 h-full"
               addFn={() => setMode('add')}
            >
               Add Link
            </NoDataPlaceHolder>
         ) : (
            <ScrollArea className="h-full">
               <div className="flex flex-col gap-1 w-full p-2 relative justify-center h-full">
                  {mode === 'add' ? (
                     <NewLinkField setMode={setMode} project={project} />
                  ) : (
                     <LinkItems
                        links={project.links}
                        onDelete={handleDeleteLink}
                     />
                  )}
               </div>
            </ScrollArea>
         )}
      </div>
   );
};

interface NewLinkFieldProps {
   setMode: (mode: 'view' | 'add') => void;
   project: ProjectFindOneResponse;
}

const NewLinkField: React.FC<NewLinkFieldProps> = ({ setMode, project }) => {
   const formMethods = useForm({
      defaultValues: {
         label: '',
         url: '',
      },
   });
   const { handleSubmit, setError } = formMethods;

   const editProject = useEditProject();

   const isValidUrl = (url: string) => {
      try {
         new URL(url);
         return true;
      } catch {
         return false;
      }
   };

   const submitLink = (data: any) => {
      const url = data.url;
      if (!isValidUrl(url)) {
         setError('url', {
            message: 'Invalid URL',
         });
         return;
      }
      toast.loading('Adding link...')
      editProject.mutate({
         id: project.id,
         links: project.links ? [...project.links, data] : [data],
      });
      setMode('view');
   };

   const handleDiscard = (e: React.MouseEvent) => {
      e.preventDefault();
      setMode('view');
   };

   return (
      <form
         className="flex flex-col w-full bg-background gap-1 p-2 border border-tertiary rounded-xl "
         onSubmit={handleSubmit(submitLink)}
      >
         <div className="flex flex-col">
            <Label>Label</Label>
            <TextInputForm
               fieldName="label"
               formMethods={formMethods}
               errorMessage="Please specify label"
               className="bg-foreground"
               required
            />
         </div>
         <div className="flex flex-col">
            <Label>URL</Label>
            <TextInputForm
               fieldName="url"
               formMethods={formMethods}
               errorMessage="Please specify url"
               className="bg-foreground"
               required
            />
         </div>
         <div className="flex gap-1 pt-1 justify-between">
            <Button
               className="w-1/3"
               size={'sm'}
               variant={'destructiveOutline'}
               onClick={handleDiscard}
            >
               Discard
            </Button>
            <Button className="w-1/3" size={'sm'} variant={'default'}>
               Add
            </Button>
         </div>
      </form>
   );
};

const LinkItems: React.FC<{
   links: ProjectLink[];
   onDelete: (index: number) => void;
}> = ({ links, onDelete }) => {
   return (
         <div className="flex flex-col gap-1 w-full">
            {links.map((link, index) => (
               <button
                  key={index}
                  className="flex bg-background p-1 rounded-lg items-center gap-2"
               >
                  <Link
                     to={link.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex gap-1 grow"
                  >
                     <ExternalLink className="w-4 h-4 text-secondary" />
                     <p className='text-left grow truncate text-sm line-clamp-1 w-[50px]'>{link.label}</p>
                  </Link>
                  <XIcon
                     className="w-4 h-4 text-secondary"
                     onClick={() => onDelete(index)}
                  />
               </button>
            ))}
         </div>
   );
};

export default ProjectLinkSection;
