export const useThemedFavicon = () =>
	function getThemedFavicon() {
		const isDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const favicon =
			document.head.querySelector<HTMLLinkElement>("[href*=favicon]");

		if (!favicon) {
			return;
		}

		if (isDarkMode) {
			favicon.href = "/favicon-dark.png";
		} else {
			favicon.href = "/favicon-light.png";
		}
	};
