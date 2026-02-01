import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "@/Pages/Home/Home";
import ProjectDetail from "@/Pages/ProjectDetail/ProjectDetail";
import About from "@/Pages/About/About";
import Testimonial from "@/Pages/Testimonial/Testimonial";

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
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/testimonial",
        element: <Testimonial />,
      },
    ],
  },
]);
