import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./views/About";
import Contact from "./views/Contact";
import ErrorBoundary from "./views/ErrorBoundary";
import Home from "./views/Home";
import Links from "./views/Links";
import Media from "./views/Media";
import Music from "./views/Music";
import PageNotFound from "./views/PageNotFound";
import Shows from "./views/Shows";

import "./styles/style.scss";

import React from "react";
import { createRoot } from "react-dom/client";
import SiteWrapper from "./SiteWrapper";
import { AppContextProvider } from "./utils/AppContext";

// const views = [
// 	{
// 		path: "/",
// 		element: <Home />,
// 		errorElement: <PageNotFound />,
// 	},
// 	{
// 		path: "/links",
// 		element: <Links />,
// 	},
// 	{
// 		path: "/shows",
// 		element: <Shows />,
// 	},
// 	{
// 		path: "/shows/:showSlug",
// 		element: <Shows />,
// 	},
// 	{
// 		path: "/music",
// 		element: <Music />,
// 	},
// 	{
// 		path: "/music/:songSlug",
// 		element: <Music />,
// 	},
// 	{
// 		path: "/about",
// 		element: <About />,
// 	},
// 	{
// 		path: "/contact",
// 		element: <Contact />,
// 	},
// 	{
// 		path: "/media",
// 		element: <Media />,
// 	},
// ];

// const router = createBrowserRouter(
// 	views.map((view) => ({
// 		...view,
// 		element:
// 			view.path !== "/" ? (
// 				<ErrorBoundary>{view.element}</ErrorBoundary>
// 			) : (
// 				<SiteWrapper>{view.element}</SiteWrapper>
// 			),
// 	})),
// );

const router = createBrowserRouter([
	{
		path: "/",
		element: <SiteWrapper />, // This wraps all child routes
		errorElement: <PageNotFound />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/links", element: <Links /> },
			{ path: "/shows", element: <Shows /> },
			{ path: "/shows/:showSlug", element: <Shows /> },
			{ path: "/music", element: <Music /> },
			{ path: "/music/:songSlug", element: <Music /> },
			{ path: "/about", element: <About /> },
			{ path: "/contact", element: <Contact /> },
			{ path: "/media", element: <Media /> },
		],
	},
]);

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

// biome-ignore lint/style/noNonNullAssertion: this is never null
createRoot(document.getElementById("root")!).render(<App />);
