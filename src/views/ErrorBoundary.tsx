import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import Motivation from "../assets/images/misc/HQ_FoundBug.png";
import LQ_Motivation from "../assets/images/misc/LQ_FoundBug.png";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Error Boundary caught an error:", error, errorInfo);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return (
				<section id="page-not-found">
					<div id="site-backdrop" />
					<h1>500 ERROR</h1>
					<LazyImage
						lowQualitySrc={LQ_Motivation}
						highQualitySrc={Motivation}
						alt="All four day dreamers cheering you on, to help motivate your search for the right page"
					/>
					<p>
						Hey bub. Looks like this page is unaccessible right now.{" "}
						<Link to={"/"} className="link orange-reroute">
							Click me to come home.
						</Link>
					</p>
					<br />
					<p>
						<strong>This page may be under maintenance,</strong> or has been
						shutdown by mutant monkeys via a sophisticated cyber attack. Either
						way, we're sorry to inconvenience you!
					</p>
					<br />
					<p>
						Please email us at
						<strong className="email"> daydreamersmusic2015@gmail.com</strong>{" "}
						reporting this error description:
					</p>
					<br />
					<pre>
						{JSON.stringify(
							{
								timestamp: new Date().toLocaleString(),
								userAgent: navigator.userAgent,
								errorMessage: this.state.error
									? this.state.error.message
									: null,
								stackTrace: this.state.error ? this.state.error.stack : null,
							},
							null,
							2,
						)}
					</pre>
				</section>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
