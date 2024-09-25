import { useTranslation } from 'react-i18next';
import PinnedProjectTab from './PinnedProjectTab';
import { Pin } from '@/components/icons';

const project = {
   name: 'Sansiri Dog Freindly House Launch Campaign Sansiri Dog Freindly House Launch Campaign',
};

export default function PinnedProjects() {
   const { t } = useTranslation();

   return (
      <div className="flex flex-col md:hidden">
         <div className="flex items-center px-3 pb-2 gap-1 w-full text-secondary">
            <Pin width={16} height={16} />
            <p className="text-sub">{t('pinnedProjects')}</p>
         </div>
         <PinnedProjectTab project={project} />
      </div>
   );
}
