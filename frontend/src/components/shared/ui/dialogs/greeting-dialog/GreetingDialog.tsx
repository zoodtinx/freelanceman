import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DialogDescription,
   DialogFooter,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';

export function GreetingDialog() {
   return (
      <Dialog open={false}>
         <DialogTrigger asChild>
            <Button variant="outline" className='hidden'>Edit Profile</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] h-[800px] w-[550px]">
            <div className='bg-foreground flex justify-center items-center'>
               Wolcome to Freelance Man
            </div>
         </DialogContent>
      </Dialog>
   );
}
