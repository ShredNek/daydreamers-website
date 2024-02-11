import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import "../styles/views/_merch.scss";

export default function GeneralError() {
  return (
    <div className="collection-notice error">
      <ExclamationTriangleIcon />
      <p>There was an error. Please refresh and try again.</p>
    </div>
  )
}
