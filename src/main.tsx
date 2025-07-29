import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/Home";
import PageNotFound from "./views/PageNotFound";
import Shows from "./views/Shows";
import GigView from "./views/GigView";
import Music from "./views/Music";
import About from "./views/About";
import ErrorBoundary from "./views/ErrorBoundary";
import Contact from "./views/Contact";
import Media from "./views/Media";
import Links from "./views/Links";

import "./styles/style.scss";

import { AppContextProvider } from "./utils/AppContext";

const views = [
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/links",
    element: <Links />,
  },
  {
    path: "/shows",
    element: <Shows />,
  },
  {
    path: "/shows/:id",
    element: <Shows />,
  },
  {
    path: "/music",
    element: <Music />,
  },
  {
    path: "/music/:songSlug",
    element: <Music />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/media",
    element: <Media />,
  },
];

const router = createBrowserRouter(
  views.map((view) => ({
    ...view,
    element:
      view.path !== "/" ? (
        <ErrorBoundary>{view.element}</ErrorBoundary>
      ) : (
        view.element
      ),
  })),
);

const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
