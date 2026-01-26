import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "@/Pages/Home/Home";
import ProjectDetail from "@/Pages/ProjectDetail/ProjectDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // errorElement: <ErrorPage/>,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/projects/:id",
        element: <ProjectDetail />,
      },
    ],
  },
]);
