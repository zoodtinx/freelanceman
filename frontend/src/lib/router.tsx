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
import ViewDocumentLayout from "@/components/page-elements/documents/ViewDocumentLayout";
import CreateDocumentPage from "@/components/page-elements/documents/CreateDocumentPage";
import QuickNotesPage from "@/routes/QuickNotesPage";
import AllClientsPage from "src/routes/AllClientPage";
import ClientPage from "@/routes/ClientPage";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
   },
   {
      path: "/home",
      element: <Home />,
      children: [
         {
            path: "",
            element: <Navigate to={'projects'} />,
         },
         {
            path: "projects",
            element: <AllProjectPage/>,
         },
         {
            path: "actions",
            element: <ActionPage/>
         },
         {
            path: "clients",
            children: [
               {
                  path: '',
                  element: <AllClientsPage/>,
               },
               {
                  path: ':clientId',
                  element: <ClientPage />
               }
            ]
         },
         {
            path: "partners",
            element: <PartnersPage />
         },
         {
            path: "files",
            element: <FilePage/>
         },
         {
            path: "documents",
            element: <DocumentPage />,
            children: [
               {
                  path: '',
                  element: <ViewDocumentLayout />,
               },
               {
                  path: 'create',
                  children: [
                     {
                        path: "",
                        element: <CreateDocumentPage />,
                     },
                     {
                        path: ":draftId",
                        element: <CreateDocumentPage />,
                     }
                  ]
               }
            ]
         },
         {
            path: "notes",
            element: <QuickNotesPage/>
         },
         {
            path: ":projectId",
            element: <ProjectPage />,
            children: [
               {
                  path: "",
                  element: <div>Hello</div>
               },
               {
                  path: "tasks",
                  element: <ProjectTasksPage />
               },
               {
                  path: "files",
               },
               {
                  path: "documents",
               },
               {
                  path: "materials",
               },
            ]
         },
      ],
   },
]);