import { createBrowserRouter } from "react-router-dom";
import Home from "../routes/Home";
import Actions from "@/routes/Actions";

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
            path: "actions",
            element: <Actions/>
         },
      ],
   },
]);