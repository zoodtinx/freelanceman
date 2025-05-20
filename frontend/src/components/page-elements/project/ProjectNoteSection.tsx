import { useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { StickyNote } from 'lucide-react'; // Assuming you're using Lucide icons
import { ProjectPayload } from 'freelanceman-common';
import { useEditProject } from '@/lib/api/project-api';
import { toast } from 'sonner';

const ProjectNoteSection: React.FC<{ project: ProjectPayload }> = ({ project }) => {
   const [note, setNote] = useState(project.note);

   const editProject = useEditProject({
      errorCallback() {
         toast.error('Error adding note');
      },
      optimisticUpdate: {
         enable: true,
         key: ['project', project.id],
         type: 'edit',
      },
   });

   const debouncedUpdateNote = useMemo(
      () =>
         debounce((newNote: string) => {
            editProject.mutate({
               id: project.id,
               note: newNote,
            });
         }, 1000),
      [editProject, project.id]
   );

   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newNote = e.target.value;
      setNote(newNote);
      debouncedUpdateNote(newNote); 
   };

   return (
      <div className='flex flex-col w-full'>
         <p className="flex items-center h-9 text-md gap-1 px-4">
            <StickyNote className="w-4 h-4" />
            Notes
         </p>
         <div className="w-full border-[0.5px] border-quaternary" />
         <textarea
            className="flex text-primary border-0 grow px-4 py-3 resize-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent placeholder:text-secondary"
            placeholder='Add note for quick reminder or more.'
            value={note}
            onChange={handleChange}
         />
      </div>
   );
};


export default ProjectNoteSection;
