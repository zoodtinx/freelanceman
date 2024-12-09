import { createBrowserRouter } from "react-router-dom";
import Home from "../routes/HomePage";
import ProjectPage from "@/routes/ProjectPage";
import ActionPage from "@/routes/ActionPage";
import AllProjectPage from "@/routes/AllProjectPage";
import ProjectTasksPage from "@/routes/ProjectTaskPage";
import { Navigate } from "react-router-dom";

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
            element: <ActionPage/>
         },
         {
            path: "files",
            element: <ActionPage/>
         },
         {
            path: "documents",
            element: <ActionPage/>
         },
         {
            path: "notes",
            element: <ActionPage/>
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