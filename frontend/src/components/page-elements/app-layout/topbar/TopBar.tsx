import { Tabs,TabsTrigger, TabsList } from "@radix-ui/react-tabs";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
 } from "@/components/shared/ui/primitives/Popover"
import { Eclipse, Moon, Plus, Settings2, Sun, UserRoundPen } from "lucide-react";
import ProfileBar from './ProfileBar';
import Avatar from './Avatar';
import FreelanceManLogo from './Logo';
import { SunIcon, Calendar, CircleCheck } from 'lucide-react';
import { Separator } from "@/components/shared/ui/primitives/Separator";

export default function TopBar() {
   return (
      <header
         className={`flex flex-shrink-0 h-[70px] w-full items-center justify-between px-3
                     md:h-[82px]
                     sm:h-[62px] sm:px-3 sm:sticky sm:top-0 sm:z-50 sm:backdrop-blur sm:bg-opacity-60 sm:dark:bg-header-dark sm:dark:bg-opacity-60
                  `}
      >
         <FreelanceManLogo />
         <div className="flex gap-4 cursor-default items-center justify-between text-secondary text-md bg-foreground h-[37px] sm:h-[43px] w-auto rounded-full px-4 sm:hidden">
            <p>Monday, 19 December 2025</p>
            <div className="flex items-center gap-1">
               <CircleCheck className="h-5 w-5" />
               <p>5 tasks</p>
            </div>
            <div className="flex items-center gap-1">
               <Calendar className="h-5 w-5" />
               <p>2 events</p>
            </div>
         </div>
         <div className="h-[55px] items-center flex gap-2">
            <ProfileBar />
            <SettingsPopover />
         </div>
      </header>
   );
}

const SettingsPopover = () => {
   return (
      <Popover>
         <PopoverTrigger asChild>
            <div>
               <Avatar />
            </div>
         </PopoverTrigger>
         <PopoverContent className="w-[250px] bg-white flex flex-col rounded-xl p-[6px] cursor-default select-none">
            <div className="flex items-center gap-[5px] justify-between">
               <div className="flex items-center gap-[5px] pl-1">
                  <Eclipse className="h-4 w-4" />
                  <p>Appearance</p>
               </div>
               <Tabs className="w-[100px] p-1 bg-tertiary rounded-md text-secondary" defaultValue="dark">
                  <TabsList className="w-full flex">
                     <TabsTrigger value="light" className="flex justify-center w-1/2 text-base data-[state=active]:text-primary data-[state=active]:bg-foreground py-[2px] rounded-sm">
                        <Sun className="h-4 w-4" />
                     </TabsTrigger>
                     <TabsTrigger value="dark" className="flex justify-center w-1/2 text-base data-[state=active]:text-primary data-[state=active]:bg-foreground py-[2px] rounded-sm">
                        <Moon className="h-4 w-4" />
                     </TabsTrigger>
                  </TabsList>
               </Tabs>
            </div>
            <div className="flex items-center gap-[5px] justify-between hover:bg-background rounded-md transition-colors duration-75">
               <div className="flex items-center gap-[5px] pl-1 p-1">
                  <Settings2 className="h-4 w-4" />
                  <p>Edit Profile</p>
               </div>
            </div>
            <Separator />
            <div className="flex items-center gap-[5px] justify-between hover:bg-background rounded-md transition-colors duration-75">
               <div className="flex items-center gap-[5px] pl-1 p-1">
                  <UserRoundPen className="h-4 w-4" />
                  <p>Get Account</p>
               </div>
            </div>
         </PopoverContent>
      </Popover>
   );
}