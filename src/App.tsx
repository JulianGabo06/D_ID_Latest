import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./style.css";
import Demo from "./Demo/Demo.tsx";
import Develop from "./Develop/Develop.tsx";

function App() {
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
  return <RouterProvider router={router} />;
}

export default App;
