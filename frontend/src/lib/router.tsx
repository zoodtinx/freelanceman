import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../routes/HomePage";
import ProjectPage from "@/routes/ProjectPage";
import ActionPage from "@/routes/ActionPage";
import AllProjectPage from "@/routes/AllProjectPage";
import ProjectTasksPage from "@/routes/ProjectTaskPage";
import PartnersPage from "@/routes/PartnersPage";
import FilePage from "@/routes/FilePage";
import QuickNotesPage from "@/routes/QuickNotesPage";
import AllClientsPage from "src/routes/AllClientPage";
import ClientPage from "@/routes/ClientPage";
import IncomePage from "src/routes/IncomePage";
import SalesDocumentBuilderPage from "src/components/page-elements/documents/DocumentPageCreateMode";
import LoginPage from "@/routes/LoginPage";

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Navigate to={'home/projects'} />,
   },
   {
      path: '/login',
      element: <LoginPage />,
   },
   {
      path: '/register',
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
            path: 'income',
            children: [
               {
                  path: '',
                  element: <IncomePage />,
               },
               {
                  path: 'document',
                  children: [
                     {
                        path: '',
                        element: <SalesDocumentBuilderPage />,
                     },
                     {
                        path: ':id',
                        element: <SalesDocumentBuilderPage />,
                     },
                     {
                        path: 'quotation',
                        element: <SalesDocumentBuilderPage />,
                     },
                     {
                        path: 'invoice',
                        element: <SalesDocumentBuilderPage />,
                     },
                     {
                        path: 'receipt',
                        element: <SalesDocumentBuilderPage />,
                     }
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