import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./views/About.tsx";
import Contact from "./views/Contact.tsx";
import ErrorBoundary from "./views/ErrorBoundary.tsx";
import Home from "./views/Home.tsx";
import Links from "./views/Links.tsx";
import Media from "./views/Media.tsx";
import Music from "./views/Music.tsx";
import PageNotFound from "./views/PageNotFound.tsx";
import Shows from "./views/Shows.tsx";

import "./styles/style.scss";

import React from "react";
import { createRoot } from "react-dom/client";
import SiteWrapper from "./SiteWrapper.tsx";
import { AppContextProvider } from "./utils/AppContext.tsx";
import { Sandbox } from "./views/Sandbox.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <SiteWrapper />,
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
			{ path: "/sandbox", element: <Sandbox /> },
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
