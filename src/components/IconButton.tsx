import { ReactNode } from "react";

interface IconButton {
  onClick?: () => void;
  Icon?: ReactNode;
}

export default function IconButton({ onClick, Icon }: IconButton) {
  return (
    <button onClick={onClick} className={`h-10 w-10 text-black`}>
      {Icon}
    </button>
  );
}
