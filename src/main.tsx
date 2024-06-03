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
import Gigs from "./views/Gigs";
import GigView from "./views/GigView";
import Music from "./views/Music";
import MusicView from "./views/MusicView";
import Lyrics from "./views/Lyrics";
import About from "./views/About";
import ErrorBoundary from "./views/ErrorBoundary";

import "./styles/style.scss";

import { AppContextProvider } from "./utils/AppContext";

const views = [{
  path: "/",
  element: <Home />,
  errorElement: <PageNotFound />,
},
{
  path: "/merch",
  element: <Merch />,

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
},
{
  path: "/gig/:id",
  element: <GigView />
},
{
  path: "/music",
  element: <Music />
},
{
  path: "/music/:songCollectionName",
  element: <MusicView />
},
{
  path: "/music/:songCollectionName/lyrics/:trackName",
  element: <Lyrics />
},
{
  path: "/about",
  element: <About />
}
]

const router = createBrowserRouter(
  views.map(view => ({
    ...view,
    element: view.path !== "/" ? <ErrorBoundary>{view.element}</ErrorBoundary> : view.element,
  }))
);

const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </ErrorBoundary>
    </React.StrictMode >
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);