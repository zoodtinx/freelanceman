import React from 'react';
import { FireExtinguisher, SatelliteDish, FileSpreadsheet } from 'lucide-react';
import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';

const projectPageContent = [
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center">No more juggling tools.</p>
            <p className="text-center font-semibold">It’s all here</p>
         </React.Fragment>
      ),
      subhead:
         'Tasks, events, files, contacts, notes and links. All in one clean, simple freelance workflow.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
];

const documentbuilderPageContent = [
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center">Generate Sharp,</p>
            <p className="text-center font-semibold">Ready-to-Send PDFs</p>
         </React.Fragment>
      ),
      subhead:
         'Create polished documents and export PDFs to share directly with clients. No extra tools required.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
];

const incomePageContent = [
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center font-semibold">Track Who's Paid</p>
            <p className="text-center">and Who Still Owes</p>
         </React.Fragment>
      ),
      subhead:
         'See incoming payments at a glance and spot unpaid clients easily. Stay on top of invoices without the stress.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center font-semibold">
               Create Professional Documents
            </p>
            <p className="text-center">in a Snap.</p>
         </React.Fragment>
      ),
      subhead:
         'Generate polished income and payment PDFs right in the app. Skip the templates. Just add your info.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
];

const filePageContent = [
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center">Your Files,</p>
            <p className="text-center">
               <span className="font-semibold">Easy to Find and Manage</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'Store project files, briefs, and assets neatly. Upload and search quickly. No more messy folders or lost versions.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center">
               <span className="font-semibold">Upload Files</span> or{' '}
               <span className="font-semibold">Attach Link</span>
            </p>
            <p className="text-center">Whatever Works.</p>
         </React.Fragment>
      ),
      subhead:
         'Add files from your device or drop in a link. Keep everything connected and easy to access.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
];

const partnersPageContent = [
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center">Your Go-To Crew,</p>
            <p className="text-center">
               <span className="font-semibold">Always Within Reach.</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'Track collaborators like editors or coders with ease. See how they connect to your projects. Know who did what.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
];

const allClientPageContent = [
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center">Keep Your Clients Close</p>
            <p className="text-center">
               and <span className="font-semibold">Easy to Manage.</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'View all your contacts in a clean list with company cards. Find people fast, track interactions and see client info.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
];

const actionPageContent = [
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center">Your Workday,</p>
            <p className="text-center">
               <span className="font-semibold">Organized</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'See tasks and events in one view. Add, edit, or check things off fast. From quick notes to big deadlines.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
];

const homePageContent = [
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center">Greetings, welcome to</p>
            <p className="text-center">
               <span className="font-semibold">FreelanceMan</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'Built for solo freelancers to manage tasks, clients, and documents. Work smarter, skip the clutter.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
   {
      icon: FileSpreadsheet,
      headline: (
         <React.Fragment>
            <p className="text-center">All a freelancer need</p>
            <p className="text-center">
               <span className="font-semibold">right here</span>.
            </p>
         </React.Fragment>
      ),
      subhead:
         'Built for solo freelancers to manage tasks, clients, and documents. Work smarter, skip the clutter.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508909/file/original-cdc99e039bfff050e5465d47b2dc9c07.png?resize=2048x1279&vertical=center',
   },
   {
      icon: FireExtinguisher,
      headline: (
         <React.Fragment>
            <p className="text-center">Work On Every Devices</p>
            <p className="text-center">
               with <span className="font-semibold">Responsive Design</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'Stay productive on any device with a design that adapts to your workflow, wherever you are.',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508633/file/original-d4697c30f104727ac37fe3ba5b314eb9.png?resize=2048x1536&vertical=center',
   },
   {
      icon: SatelliteDish,
      headline: (
         <React.Fragment>
            <p className="text-center">Full Stack Transparency,</p>
            <p className="text-center font-semibold">See Every Line of Code</p>
         </React.Fragment>
      ),
      subhead: 'Built with React, NestJS, Prisma & more View on GitHub',
      imageUrl:
         'https://cdn.dribbble.com/userupload/43508908/file/original-6621a7ae9181c659b3e7c0df1299b7c3.png?resize=2048x1280&vertical=center',
   },
];

export const welcomeDialogContent = {
   homePage: homePageContent,
   actionsPage: actionPageContent,
   allClientsPage: allClientPageContent,
   partnersPage: partnersPageContent,
   filesPage: filePageContent,
   incomePage: incomePageContent,
   documentBuilderPage: documentbuilderPageContent,
   projectPage: projectPageContent,
};
