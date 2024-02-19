import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./views/Home";
import PageNotFound from "./views/PageNotFound";
import Merch from "./views/Merch";
import MerchItem from "./views/MerchItem";
import Cart from "./views/Cart";

import "./styles/style.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />
  },
  {
    path: "/merch",
    element: <Merch />
  },
  {
    path: "/merch/:id",
    element: <MerchItem />
  },
  {
    path: "/merch/cart",
    element: <Cart />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
