import { useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { StickyNote } from 'lucide-react'; // Assuming you're using Lucide icons
import { Project } from '@types';

const ProjectNoteSection: React.FC<{ project: Project }> = ({ project }) => {
   const [note, setNote] = useState(project.note);

   // Memoize the debounced function
   const debouncedSetNote = useMemo(
      () =>
         debounce((value: string) => {
            setNote(value);
            console.log('Note updated:', value); // Logs only after debounce delay
         }, 300),
      []
   );

   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      debouncedSetNote(e.target.value);
   };

   return (
      <div className='flex flex-col w-full'>
         <p className="flex items-center h-9 text-md gap-1 px-4">
            <StickyNote className="w-4 h-4" />
            Notes
         </p>
         <div className="w-full border-[0.5px] border-quaternary" />
         <textarea
            className="flex text-primary border-0 grow px-4 py-3 resize-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent"
            defaultValue={note}
            onChange={handleChange}
         />
      </div>
   );
};

export default ProjectNoteSection;
