import { LinkIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddButton from '@/components/shared/ui/AddButton';
import React, { useEffect, useRef, useState } from 'react';
import { CleanTextInput } from '@/components/shared/ui/primitives/CleanTextInput';
import { Project } from '@types';

const ProjectLinkSection: React.FC<{ project: Project }> = ({ project }) => {
  const [mode, setMode] = useState<'view' | 'add'>('view');
  const [links, setLinks] = useState<string[]>(project.links ?? []);

  const handleAddLink = (link: string) => {
    console.log('Added:', link);
    setLinks((prev) => [...prev, link]);
  };

  const handleDeleteLink = (index: number) => {
    console.log('Deleted index:', index);
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
     <div className="flex flex-col w-full">
        <div className="flex justify-between items-center pl-3 pr-2">
           <p className="flex items-center h-9 text-md gap-1">
              <LinkIcon className="w-4 h-4" />
              Links
           </p>
           <AddButton onClick={() => setMode('add')} />
        </div>
        <div className="w-full border-[0.5px] border-quaternary" />
        <div className="flex flex-col gap-1 w-full pt-2">
           {mode === 'add' && (
              <NewLinkField setMode={setMode} onSubmit={handleAddLink} />
           )}
           <LinkItems links={links} onDelete={handleDeleteLink} />
        </div>
     </div>
  );
};

interface NewLinkFieldProps {
  setMode: (mode: 'view' | 'add') => void;
  onSubmit: (link: string) => void;
}

const NewLinkField: React.FC<NewLinkFieldProps> = ({ setMode, onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMode('view');
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMode('view');
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setMode]);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const submit = () => {
    if (!inputRef.current) return;
    const value = inputRef.current.value.trim();
    if (isValidUrl(value)) {
      setError(false);
      onSubmit(value);
      setMode('view');
    } else {
      setError(true);
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-[0.5px] px-2 overflow-hidden">
      <div className="flex border border-primary p-1 rounded-lg px-2 items-center gap-2 peer">
        <CleanTextInput
          className="grow"
          ref={inputRef}
          onChange={() => setError(false)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />
        <XIcon className="w-4 h-4 text-primary cursor-pointer" onClick={() => setMode('view')} />
      </div>
      {error && (
        <p className="text-freelanceman-red text-sm font-semibold animate-shake">
          Incorrect URL format
        </p>
      )}
    </div>
  );
};

const LinkItems: React.FC<{ links: string[]; onDelete: (index: number) => void }> = ({
  links,
  onDelete,
}) => {
  const formatLink = (link: string) => link.replace(/^https?:\/\/(www\.)?/, '');

  return (
    <div className="flex flex-col gap-1 px-2 overflow-hidden">
      {links.map((link, index) => (
        <button
          key={link}
          className="flex bg-background p-1 rounded-lg px-2 items-center gap-2"
        >
          <Link to={link} className="text-left grow truncate text-sm">
            {formatLink(link)}
          </Link>
          <XIcon className="w-4 h-4 text-secondary" onClick={() => onDelete(index)} />
        </button>
      ))}
    </div>
  );
};

export default ProjectLinkSection;
