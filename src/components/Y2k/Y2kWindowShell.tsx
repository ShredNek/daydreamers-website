import { useNavigate } from "react-router-dom";
import "../../styles/components/_y2k-window.scss";

type Y2kWindowShellComponent = {
  children?: React.ReactNode;
  navText: string;
  closeButtonRedirect: string;
  className?: string;
  isModal?: boolean;
};

export default function Y2kWindowShell({
  className,
  children,
  navText,
  isModal,
  closeButtonRedirect,
}: Y2kWindowShellComponent) {
  const navigate = useNavigate();

  return (
    <div
      className={`window-viewer-container ${className ?? ""} ${isModal ? "modal" : ""}`}>
      <div className="window-nav-header">
        <p>{navText}</p>
        <div className="window-action-buttons">
          <button>?</button>
          <button
            onClick={() => {
              navigate(closeButtonRedirect);
            }}>
            X
          </button>
        </div>
      </div>
      <div className="window-children">{children}</div>
    </div>
  );
}
