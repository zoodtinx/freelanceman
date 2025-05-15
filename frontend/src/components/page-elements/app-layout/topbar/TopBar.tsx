import {
   Calendar,
   CircleCheck,
   Loader2,
} from 'lucide-react';
import FreelanceManLogo from './Logo';
import { useNavigate } from 'react-router-dom';
import { useTasksQuery } from '@/lib/api/task-api';
import { useEventsQuery } from '@/lib/api/event-api';
import { formatDate } from '@/lib/helper/formatDateTime';
import { UseQueryResult } from '@tanstack/react-query';
import { EventListPayload } from 'freelanceman-common';

export const mockUser = {
   id: 'id_00458_59',
   name: 'Alice Morgan',
   specialization: ['Graphic Design', 'Branding', 'Illustration'],
   bio: 'Creative graphic designer with a passion for visual storytelling and brand identity.',
   email: 'alicemorgan@example.com',
   phoneNumber: '+1987654321',
   address: '456 Creative Avenue, Los Angeles, CA, USA',
   taxId: '1103300137575',
   avatarUrl: 'https://example.com/avatar-alice.jpg',
   settings: {
      theme: 'light',
   },
   pinnedProjects: [],
   createdAt: new Date('2023-06-15T09:30:00Z'),
   updatedAt: new Date(),
};

export default function TopBar() {
   const date = new Date().toISOString();
   const formattedDate = formatDate(date, 'FULL');

   const eventQueryResult = useEventsQuery({ status: 'scheduled' });
   const taskQueryResult = useTasksQuery({ status: 'pending' });

   return (
      <header
         className={`flex flex-shrink-0 h-[70px] w-full items-center justify-between
                     md:h-[82px] rounded-xl
                     sm:h-[62px] sm:px-3 sm:sticky sm:top-0 sm:z-50 sm:backdrop-blur sm:bg-opacity-60 sm:dark:bg-header-dark sm:dark:bg-opacity-60
                  `}
      >
         <div className="flex gap-4 cursor-default items-center justify-between text-secondary text-md bg-quaternary h-[37px] sm:h-[43px] w-auto rounded-full px-6 sm:hidden">
            <p>{formattedDate}</p>
            <CountDisplay
               icon={CircleCheck}
               label="Task"
               queryResult={taskQueryResult}
            />
            <CountDisplay
               icon={Calendar}
               label="Event"
               queryResult={eventQueryResult}
            />
         </div>
         <FreelanceManLogo />
      </header>
   );
}

const CountDisplay = ({
   queryResult,
   icon: Icon,
   label,
}: {
   queryResult: UseQueryResult<EventListPayload>;
   icon: React.ElementType;
   label: string;
}) => {
   const { data, isLoading } = queryResult;
   const navigate = useNavigate();

   if (isLoading) {
      return <Loader2 className="animate-spin h-5 w-5" />;
   }

   return (
      <p
         onClick={() => navigate('/home/actions')}
         className="flex gap-1 items-center select-none cursor-pointer hover:text-primary transition-colors duration-100"
      >
         <Icon className="h-5 w-5" />
         <span>{data?.items?.length || '0'}</span>
         <span>{(data?.items?.length || 0) <= 1 ? label : `${label}s`}</span>
      </p>
   );
};