import React, { useState } from "react";
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
import Gigs from "./views/Gigs";

import "./styles/style.scss";

import { AppContextProvider } from "./utils/AppContext";

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
  },
  {
    path: "/gigs",
    element: <Gigs />
  }
]);

const App = () => {
  return (
    <React.StrictMode>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);