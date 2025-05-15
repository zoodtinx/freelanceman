import EventSection from 'src/components/page-elements/actions/EventSection';
import TasksSection from 'src/components/page-elements/actions/TaskSection';

export default function ActionPage() {
   return (
      <section className="w-full h-full flex gap-2 sm:flex-col">
         <div className="flex flex-col w-1/2 rounded-[20px] bg-foreground sm:w-full grow h-full shadow-md overflow-hidden">
            <TasksSection />
         </div>
         <div className="flex flex-col w-1/2 rounded-[20px] bg-foreground sm:w-full grow h-full shadow-md overflow-hidden">
            <EventSection />
         </div>
      </section>
   );
}
