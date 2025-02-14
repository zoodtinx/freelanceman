import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { Separator } from '@radix-ui/react-separator';
import { cn } from '@/lib/helper/utils';
import { SelectedItemProps } from 'src/lib/types/selector-dialog.types';

const SelectorListItem: React.FC<SelectedItemProps> = ({
   data,
   isSelected,
   onCheckedChange,
}) => {
   return (
      <div className="grid cursor-default" onClick={onCheckedChange}>
         <div className="grid grid-cols-[auto_1fr] grid-rows-2 px-2 py-1 gap-x-2 items-center bg-transparent transition-colors duration-75 hover:bg-tertiary">
            <Checkbox
               className={cn('h-[14px] w-[14px] transition-all duration-150')}
               checked={isSelected}
               onCheckedChange={onCheckedChange}
            />
            <p className="text-base">{data.value}</p>
            <div></div>
            <p className="text-sm text-secondary">{data.detail}</p>
         </div>
         <Separator className="bg-tertiary h-[1px]" />
      </div>
   );
};

export default SelectorListItem