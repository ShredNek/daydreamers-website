export const useThemedFavicon = () =>
	function getThemedFavicon() {
		const isDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const favicon = document.querySelector<HTMLAnchorElement>("#favicon");

		if (!favicon) {
			return console.warn("could not dynamically set favicon");
		}

		if (isDarkMode) {
			favicon.href = "/favicon-dark.png";
		} else {
			favicon.href = "/favicon-light.png";
		}
	};
