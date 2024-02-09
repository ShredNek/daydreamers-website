// import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import "../styles/components/_general-error.scss"

export default function GeneralError() {
  return (
    <div className="general-error">
      <ExclamationTriangleIcon />
      <p>There was an error. Please refresh and try again.</p>
    </div>
  )
}
