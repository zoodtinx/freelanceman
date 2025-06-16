import React from 'react';
import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';
import SvgHomePage2 from '@/components/shared/icons/welcome-card-icons/HomePage2';
import SvgHomePage3 from '@/components/shared/icons/welcome-card-icons/HomePage3';
import SvgHomePage4 from '@/components/shared/icons/welcome-card-icons/HomePage4';
import SvgActionsPage1 from '@/components/shared/icons/welcome-card-icons/ActionsPage1';
import SvgAllClientPage1 from '@/components/shared/icons/welcome-card-icons/AllClientPage1';
import SvgPartnersPage1 from '@/components/shared/icons/welcome-card-icons/PartnersPage1';
import SvgFilesPage1 from '@/components/shared/icons/welcome-card-icons/FilesPage1';
import SvgFilesPage2 from '@/components/shared/icons/welcome-card-icons/FilesPage2';
import SvgIncomePage1 from '@/components/shared/icons/welcome-card-icons/IncomePage1';
import SvgIncomePage2 from '@/components/shared/icons/welcome-card-icons/IncomePage2';
import SvgDocumentGenerationPage1 from '@/components/shared/icons/welcome-card-icons/DocumentGenerationPage1';
import SvgProjectPage1 from '@/components/shared/icons/welcome-card-icons/ProjectPage1';

const projectPageContent = [
   {
      icon: SvgProjectPage1,
      headline: (
         <React.Fragment>
            <p className="text-center">Your Entire Project</p>
            <p className="text-center font-semibold">In One Place.</p>
         </React.Fragment>
      ),
      subhead:
         'Tasks, events, files, contacts, notes and links. All in one clean, simple freelance workflow.',
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/project-page-1.jpg?updatedAt=1749714476968`,
   },
];

const documentbuilderPageContent = [
   {
      icon: SvgDocumentGenerationPage1,
      headline: (
         <React.Fragment>
            <p className="text-center">Fill a Template, Hit Generate,</p>
            <p className="text-center font-semibold">Get Instant PDFs.</p>
         </React.Fragment>
      ),
      subhead:
         'Create polished documents and export PDFs to share directly with clients. No extra tools required.',
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/docbuilder-page-1.jpg?updatedAt=1749714476968`,
   },
];

const incomePageContent = [
   {
      icon: SvgIncomePage1,
      headline: (
         <React.Fragment>
            <p className="text-center font-semibold">See Who's Paid</p>
            <p className="text-center">and Who's Not.</p>
         </React.Fragment>
      ),
      subhead:
         'See incoming payments at a glance and spot unpaid clients easily. Stay on top of invoices without the stress.',
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/income-page-1.jpg?updatedAt=1749714476968`,
   },
   {
      icon: SvgIncomePage2,
      headline: (
         <React.Fragment>
            <p className="text-center font-semibold">
               Quotation, Invoice, Receipt
            </p>
            <p className="text-center">Create Them All Here.</p>
         </React.Fragment>
      ),
      subhead:
         'Generate polished income and payment PDFs right in the app. Skip the templates. Just add your info.',
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/income-page-2.jpg?updatedAt=1749714476968`,
   },
];

const filePageContent = [
   {
      icon: SvgFilesPage1,
      headline: (
         <React.Fragment>
            <p className="text-center">All Your Files</p>
            <p className="text-center">
               <span className="font-semibold">In One Tidy Spot.</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'Store project files, briefs, and assets neatly. Upload and search quickly. No more messy folders or lost versions.',
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/files-page-1.jpg?updatedAt=1749714476968`,
   },
   {
      icon: SvgFilesPage2,
      headline: (
         <React.Fragment>
            <p className="text-center">
               <span className="font-semibold">Upload</span> or{' '}
               <span className="font-semibold">Attach Link</span>
            </p>
            <p className="text-center">Whatever Works.</p>
         </React.Fragment>
      ),
      subhead:
         'Add files from your device or drop in a link. Keep everything connected and easy to access.',
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/files-page-2.jpg?updatedAt=1749714476968`,
   },
];

const partnersPageContent = [
   {
      icon: SvgPartnersPage1,
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
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/partner-page-1.jpg?updatedAt=1749714476968`,
   },
];

const allClientPageContent = [
   {
      icon: SvgAllClientPage1,
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
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/allclient-page-1.jpg?updatedAt=1749714476968`,
   },
];

const actionPageContent = [
   {
      icon: SvgActionsPage1,
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
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/action-page-1.jpg?updatedAt=1749714476968`,
   },
];

const homePageContent = [
   {
      icon: SvgFreelancemanIcon,
      headline: (
         <React.Fragment>
            <p className="text-center">Hello, Welcome to</p>
            <p className="text-center">
               <span className="font-semibold">FreelanceMan</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'Built for solo freelancers to manage tasks, clients, and documents. Work smarter, skip the clutter.',
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/home-page-1.jpg?updatedAt=1749714476968`,
   },
   {
      icon: SvgHomePage2,
      headline: (
         <React.Fragment>
            <p className="text-center">Freelancing is Chaotic,</p>
            <p className="text-center">
               <span className="font-semibold">We made it simple.</span>
               {/* {' '}
               makes it simple. */}
            </p>
         </React.Fragment>
      ),
      subhead:
         'Built for solo freelancers to manage tasks, clients, and documents. Work smarter, skip the clutter.',
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/home-page-2.jpg?updatedAt=1749714476968`,
   },
   {
      icon: SvgHomePage3,
      headline: (
         <React.Fragment>
            <p className="text-center">Made for Every Screen</p>
            <p className="text-center">
               with <span className="font-semibold">Responsive Design</span>
            </p>
         </React.Fragment>
      ),
      subhead:
         'Stay productive on any device with a design that adapts to your workflow, wherever you are.',
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/home-page-3.jpg?updatedAt=1749714476968`,
   },
   {
      icon: SvgHomePage4,
      headline: (
         <React.Fragment>
            <p className="text-center">Explore Every Features,</p>
            <p className="text-center font-semibold">See Every Line of Code</p>
         </React.Fragment>
      ),
      subhead: 'Built with React, NestJS, Prisma & more View on GitHub',
      imageUrl: `${import.meta.env.VITE_IMAGE_URL_ENDPOINT}/home-page-4.jpg?updatedAt=1749714476968`,
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
