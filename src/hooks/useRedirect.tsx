import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { FADE_SPEED } from "../utils/globals";
import { ComponentLoadingStatus } from "../types";

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
