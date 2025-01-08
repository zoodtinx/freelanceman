import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from 'src/components/shared/ui/table-elements/Table';
import { Calendar, Client, Date, Plus  } from '@/components/shared/icons';

export default function ProjectEventTable() {
   return (
      <div className='flex flex-col gap-1'>
         <div className="flex items-center justify-between h-fit">
            <div className='flex items-center gap-1'>
            <Calendar className='w-[25px]' />
               <p className="text-lg leading-none">Upcoming Tasks</p>
            </div>
            <div className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center">
               <Plus className="aspect-square h-[15px] w-auto" />
            </div>
         </div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead className="w-1/2 border-r border-t">
                     <div className="flex items-center gap-1">
                        <Calendar className="aspect-square w-[18px] h-[18px]" />
                        <p className="leading-none">Event Name</p>
                     </div>
                  </TableHead>
                  <TableHead className="w-1/4 border-r border-t pl-2">
                     <div className="flex items-center gap-1">
                        <Client className="aspect-square w-[18px] h-[18px]" />
                        <p className="leading-none">Project</p>
                     </div>
                  </TableHead>
                  <TableHead className="w-1/ border-t pl-2">
                     <div className="flex items-center gap-1">
                        <Date className="aspect-square w-[18px] h-[18px]" />
                        <p className="leading-none">Date</p>
                     </div>
                  </TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               <TableRow>
                  <TableCell className="w-auto font-medium border-r truncate">
                     Launch Campaign Follow-Up Meeting
                  </TableCell>
                  <TableCell className="w-auto truncate border-r">
                     Dog Friendly House LaunchLaunchLaunchLaunchLaunchLaunch{' '}
                  </TableCell>
                  <TableCell className="w-auto">24 SEP</TableCell>
               </TableRow>
            </TableBody>
         </Table>
      </div>
   );
}
