import { cn } from '@/lib/helper/utils';
import { useEffect, useRef } from 'react';

interface TaskBarProps {
   selectedCount: number;
   onDeselectAll: () => void;
   onDelete: () => void;
   onMarkComplete?: () => void; 
   className: string
}

const FileTaskBar = ({
   selectedCount,
   onDeselectAll,
   onDelete,
   className
}: TaskBarProps): JSX.Element | null => {
   const taskBarRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            taskBarRef.current &&
            !taskBarRef.current.contains(event.target as Node)
         ) {
            onDeselectAll();
         }
      };

      const handleEscapeKey = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            onDeselectAll();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
         document.removeEventListener('keydown', handleEscapeKey);
      };
   }, [onDeselectAll]);

   if (selectedCount === 0) {
      return null;
   }

   return (
      <div
         className={cn(
            'border rounded-full w-fit h-7 absolute bg-foreground shadow-md flex items-center cursor-default overflow-hidden select-none',
            className
         )}
         ref={taskBarRef}
      >
         <TaskBarItem onClick={onDeselectAll} className="text-blue-500">
            {selectedCount} selected
         </TaskBarItem>
         <div className="border-[0.5px] h-full"></div>
         <TaskBarItem onClick={onDelete} className="text-red-500">
            Delete
         </TaskBarItem>
      </div>
   );
};

FileTaskBar.displayName = 'TaskBar';

interface TaskBarItemProps {
   className?: string;
   children: React.ReactNode;
   onClick: () => void;
}

const TaskBarItem: React.FC<TaskBarItemProps> = ({
   className = '',
   children,
   onClick,
}) => (
   <div
      onClick={onClick}
      className={`flex p-2 h-full items-center hover:bg-tertiary transition-colors duration-75 ${className}`}
   >
      <p>{children}</p>
   </div>
);

export default FileTaskBar;