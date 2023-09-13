import { ReactNode } from "react";

interface IconButton {
  onClick: () => void;
  icon: ReactNode;
}

export default function IconButton({ onClick, icon }: IconButton) {
  return (
    <a onClick={onClick}>{icon}</a>
  )
}
