import { getIcon, formatCategory } from 'src/components/shared/ui/helpers/Helpers';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { formatDate } from '@/lib/helper/formatDateTime';
import { formatBytes } from '@/lib/helper/formatFile';
import { FilePayload } from '@schemas';


export const FileListItem: React.FC<{data: FilePayload}> = ({ data, color }) => {
   const formattedDate = formatDate(data.createdAt, 'LONG')
   const formattedSize = formatBytes(data.size) || ''
   const formattedCategory = formatCategory(data.category)
   const icon = getIcon(data.type, color)

   return (
      <div className="flex flex-col px-2 w-full bg-transparent hover:bg-quaternary transition-colors duration-100">
         <div className='flex justify-between py-2 grow items-center'>
            <div className='flex gap-1 items-center'>
               <div className='flex w-4 h-4 items-center'>{icon}</div>
               <p>{data.name}</p>
            </div>
            <div className='flex gap-5'>
               <p className='text-sm text-secondary'>{formattedCategory}</p>
               <p className='text-sm text-secondary'>{formattedDate}</p>
               <p className='text-sm text-secondary'>{formattedSize}</p>
            </div>
         </div>
         <Separator className="bg-quaternary h-[1px]" />
      </div>
   );
};
