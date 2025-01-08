import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/helper/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shared/ui/primitives/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shared/ui/primitives/Popover'

type SelectProps = Omit<
   React.ComponentPropsWithoutRef<typeof Popover>,
   'children'
> & {
   selectContents: { value: string; label: string; }[];
   className?: string;
   onValueChange: (value: string) => void;
   value: string;
   placeholder?: string;
   isWithIcon?: boolean;
   size?: 'sm' | 'md' | 'lg' | 'xl'
};

const SelectWithSearch: React.FC<SelectProps> = ({
  selectContents,
  className = "w-[200px] border border-gray-300 rounded-md font-normal py-1 px-2 items-center",
  onValueChange,
  value,
  placeholder = 'Select',
  isWithIcon = true,
}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn("flex justify-between", className)}
        >
          {value
            ? selectContents.find((selection) => selection.value === value)?.label
            : placeholder}
          {isWithIcon && <ChevronDown className="w-4 h-4" />}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {selectContents.map((selection) => (
                <CommandItem
                  key={selection.value}
                  value={selection.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <p className="truncate">{selection.label}</p>
                  {/* <Check
                    className={cn(
                      "ml-auto",
                      value === selection.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { SelectWithSearch };