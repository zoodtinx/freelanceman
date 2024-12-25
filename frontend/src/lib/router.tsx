import { createBrowserRouter } from "react-router-dom";
import Home from "../routes/HomePage";
import ProjectPage from "@/routes/ProjectPage";
import ActionPage from "@/routes/ActionPage";
import AllProjectPage from "@/routes/AllProjectPage";
import ClientsPage from "@/routes/ClientPage";
import ProjectTasksPage from "@/routes/ProjectTaskPage";
import { Navigate } from "react-router-dom";
import ClientColumn from "@/components/pages/clients/ClientColumn";

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Home />,
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
            element: <AllProjectPage />,
         },
         {
            path: 'actions',
            element: <ActionPage />,
         },
         {
            path: 'contacts',
            element: <ClientsPage />,
            children: [
               {
                  path: '',
                  element: <Navigate to={'clients'} />,
               },
               {
                  path: 'clients',
                  element: <ClientColumn/>,
               },
               {
                  path: 'partners',
                  element: <div>Partner</div>,
               },
            ],
         },
         {
            path: 'files',
            element: <ActionPage />,
         },
         {
            path: 'documents',
            element: <ActionPage />,
         },
         {
            path: 'notes',
            element: <ActionPage />,
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