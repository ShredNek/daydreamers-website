import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function GeneralError() {
  return (
    <div className="collection-notice not-found">
      <MagnifyingGlassIcon />
      <p>We could not find what you were looking for. Please revise your search parameters and try again.</p>
    </div>
  )
}
