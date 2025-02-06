import { LinkIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddButton from '@/components/shared/ui/AddButton';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from '@/components/shared/ui/form-field-elements/TextInputForm';
import { CleanTextInput } from '@/components/shared/ui/primitives/CleanTextInput';

const ProjectLinkSection: React.FC = () => {
   const [mode, setMode] = useState<'view' | 'add'>('view');

   const links = [
      'https://www.example.com/path/to/resource/1',
      'https://www.anotherexample.com/path/to/resource/2',
      'https://www.yetanotherexample.com/path/to/resource/3',
   ];

   return (
      <>
         <div className="flex justify-between items-center pl-3 pr-2">
            <p className="flex items-center h-9 text-md gap-1">
               <LinkIcon className="w-4 h-4" />
               Links
            </p>
            <AddButton onClick={() => setMode('add')} />
         </div>
         <div className="w-full border-[0.5px] border-quaternary" />
         <div className="flex flex-col gap-1 w-full pt-2">
            {mode === 'add' && <NewLinkField setMode={setMode} />}
            <LinkItems links={links} />
         </div>
      </>
   );
};

interface NewLinkFieldProps {
   setMode: (mode: 'view' | 'add') => void;
}

const NewLinkField: React.FC<NewLinkFieldProps> = ({ setMode }) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const [error, setError] = useState(false);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
         ) {
            setMode('view');
         }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            setMode('view');
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
         document.removeEventListener('keydown', handleKeyDown);
      };
   }, [setMode]);

   const addLink = (link: string) => {
      if (isValidUrl(link)) {
         console.log(link);
         setError(false);
      } else {
         setError(true);
      }
   };

   const isValidUrl = (url: string) => {
      try {
         new URL(url);
         return true;
      } catch {
         return false;
      }
   };

   return (
      <div
         ref={containerRef}
         className="flex flex-col gap-[0.5px] px-2 overflow-hidden"
      >
         <div className="flex border border-primary p-1 rounded-lg px-2 items-center gap-2 peer">
            <CleanTextInput
               className="grow"
               ref={inputRef}
               onChange={() => setError(false)}
               onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputRef.current) {
                     addLink(inputRef.current.value.trim());
                  }
               }}
            />
            <XIcon
               className="w-4 h-4 text-primary cursor-pointer"
               onClick={() => setMode('view')}
            />
         </div>
         {error && (
            <p className="text-freelanceman-red text-sm font-semibold animate-shake">
               Incorrect URL format
            </p>
         )}
      </div>
   );
};

const LinkItems = ({ links }: { links: string[] }) => {
   const formatLink = (link: string) => {
      return link.replace(/^https?:\/\/(www\.)?/, '');
   };

   const deleteLink = (index: number) => {
      console.log(index);
   };

   const linkItems = links.map((link, index) => {
      const formattedLink = formatLink(link);
      return (
         <button
            key={link}
            className="flex bg-background p-1 rounded-lg px-2 items-center gap-2"
         >
            <Link to={link} className="text-left grow truncate text-sm">
               {formattedLink}
            </Link>
            <XIcon
               className="w-4 h-4 text-secondary"
               onClick={() => deleteLink(index)}
            />
         </button>
      );
   });

   return (
      <div className="flex flex-col gap-1 px-2 overflow-hidden">
         {linkItems}
      </div>
   );
};

export default ProjectLinkSection;
