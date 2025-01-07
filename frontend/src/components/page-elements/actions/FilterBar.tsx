import { Checkbox } from '../../shared/ui/primitives/CheckBox';

export default function FilterBar() {
   return (
      <div className="flex items-center justify-between pb-2">
         <div className="flex items-center gap-1">
            <p className="text-sm font-me">filter</p>
            <div className="h-[25px] w-fit px-2 flex align-middle text-center rounded-lg border border-secondary">
               <p className="text-sm">current</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
               <p className="text-sm">group</p>
               <Checkbox className="h-[25px] w-[25px] rounded-lg border-secondary" />
            </div>
            <div className="flex items-center gap-1">
               <p className="text-sm">sort by</p>
               <div className="h-[25px] w-fit px-2 flex align-middle text-center rounded-lg border border-secondary">
                  <p className="text-sm">date</p>
               </div>
            </div>
         </div>
      </div>
   );
}
