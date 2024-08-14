import { createRoot } from "react-dom/client";
import Demo from "./Demo/Demo.tsx";
import Develop from "./Develop/Develop.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Develop />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
