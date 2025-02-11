import { createBrowserRouter } from "react-router-dom";
import Home from "../routes/HomePage";
import ProjectPage from "@/routes/ProjectPage";
import ActionPage from "@/routes/ActionPage";
import AllProjectPage from "@/routes/AllProjectPage";
import ProjectTasksPage from "@/routes/ProjectTaskPage";
import { Navigate } from "react-router-dom";
import PartnersPage from "@/routes/PartnersPage";
import FilePage from "@/routes/FilePage";
import DocumentPage from "@/routes/DocumentPage";
import QuickNotesPage from "@/routes/QuickNotesPage";
import AllClientsPage from "src/routes/AllClientPage";
import ClientPage from "@/routes/ClientPage";
import DocumentPageCreateMode from "src/components/page-elements/documents/DocumentPageCreateMode";
import DocumentPageViewMode from "src/components/page-elements/documents/DocumentPageViewMode";
import DocumentPageLayout from "@/components/page-elements/documents/DocumentPageLayout";

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Navigate to={'home/projects'} />,
   },
   {
      path: '/home',
      element: <Home />,
      children: [
         {
            path: '',
            element: <Navigate to={'projects'} />,
         },
         {
            path: 'projects',
            children: [
               {
                  path: '',
                  element: <AllProjectPage />,
               },
               {
                  path: ':projectId',
                  element: <ProjectPage />,
               },
            ],
         },
         {
            path: 'actions',
            element: <ActionPage />,
         },
         {
            path: 'clients',
            children: [
               {
                  path: '',
                  element: <AllClientsPage />,
               },
               {
                  path: ':clientId',
                  element: <ClientPage />,
               },
            ],
         },
         {
            path: 'partners',
            element: <PartnersPage />,
         },
         {
            path: 'files',
            element: <FilePage />,
         },
         {
            path: 'documents',
            element: <DocumentPage />,
            children: [
               {
                  path: '',
                  element: <DocumentPageLayout />,
               },
               {
                  path: 'create',
                  children: [
                     {
                        path: '',
                        element: <DocumentPageCreateMode />,
                     },
                     {
                        path: ':draftId',
                        element: <DocumentPageCreateMode />,
                     },
                  ],
               },
            ],
         },
         {
            path: 'notes',
            element: <QuickNotesPage />,
         },
         {
            path: ':projectId',
            element: <ProjectPage />,
            children: [
               {
                  path: '',
                  element: <div>Hello</div>,
               },
               {
                  path: 'tasks',
                  element: <ProjectTasksPage />,
               },
               {
                  path: 'files',
               },
               {
                  path: 'documents',
               },
               {
                  path: 'materials',
               },
            ],
         },
      ],
   },
]);