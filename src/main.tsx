import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./views/Home";
import "./styles/index.scss";
import PageNotFound from "./views/PageNotFound";
import Merch from "./views/Merch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />
  },
  // ! I am not done with this yet, hence why it's been deactivated
  // {
  //   path: "/merch",
  //   element: <Merch />
  // }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
