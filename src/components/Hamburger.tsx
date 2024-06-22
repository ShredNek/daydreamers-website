import { useState } from "react"
import { returnNavItems } from "../helper"
import { Dispatch, SetStateAction } from "react";
import { ComponentLoadingStatus } from "../types";

interface Hamburger {
  linkToDisable?: string,
  transitionOnNavItemClick?: Dispatch<SetStateAction<ComponentLoadingStatus>>
}

export default function Hamburger({ linkToDisable, transitionOnNavItemClick }: Hamburger) {
  const [buttonOpen, setButtonOpen] = useState(false)

  const handleOnClick = () => {
    if (transitionOnNavItemClick) transitionOnNavItemClick('transitioning static')
    setButtonOpen(false)
  }

  return (
    <div className="hamburger-parent">
      <button onClick={() => setButtonOpen(buttonOpen ? false : true)} aria-controls="primary-navigation" aria-expanded={buttonOpen}>
        <svg fill="none" className="hamburger" viewBox="-10 -10 120 120" >
          <path className="line" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70">
          </path>
        </svg>
      </button>
      <div className="hamburger-links">
        <ul>{returnNavItems(handleOnClick, linkToDisable)}</ul>
      </div>
      <div className="hamburger-overlay" />
    </div>
  )
}
