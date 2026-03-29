import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import type { ComponentLoadingStatus } from "../types/index.ts";
import { FADE_SPEED } from "../utils/globals.ts";

export default function useRedirect() {
	const navigate = useNavigate();

	const handleRedirect = (
		linkTo: string,
		transitionOnNavItemClick?: Dispatch<SetStateAction<ComponentLoadingStatus>>,
	): void => {
		if (transitionOnNavItemClick)
			transitionOnNavItemClick("transitioning static");
		setTimeout(() => navigate(linkTo), FADE_SPEED);
	};

	return { handleRedirect };
}
