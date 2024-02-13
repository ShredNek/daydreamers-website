import "../../../styles/vendor/tailwind.css";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { StockPresencePreferences } from "../../../types";
import { Fragment } from "react";
import CustomSwitch from "./CustomSwitch";
import { handleSwitch } from "../../../helper/componentHelpers"

const stockOptions = [
  {
    name: "In Stock",
    stateName: "inStockRequested"
  },
  {
    name: "Out Of Stock",
    stateName: "outOfStockRequested"
  },
];

interface SwitchBoxPopover {
  state: StockPresencePreferences;
  changeStockPreferenceState: (stock: StockPresencePreferences) => void
  openDirection: "left" | "right";
  compactStyle?: boolean;
}

export default function SwitchBoxPopover({ state, changeStockPreferenceState, openDirection, compactStyle }: SwitchBoxPopover) {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSwitch(e, state, changeStockPreferenceState)

  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                    ${open ? "" : "text-opacity-90"}
                    group inline-flex items-center rounded-md bg-daydreamer-blue px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Availability</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-50"}
                      ml-2 h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className={` ${openDirection === "left" ? "right-0" : openDirection === "right" ? "left-0" : null} absolute  z-10 mt-3 w-screen max-w-md transform px-4 sm:px-0`}>
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="bg-gray-50 p-4 flex flex-row gap-2 place-content-between">
                    <button className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out group hover:bg-daydreamer-orange focus:outline-none focus-visible:ring focus-visible:ring-daydreamer-orange focus-visible:ring-opacity-50">
                      <span className="flex items-center place-content-between">
                        <span className="text-sm font-bold text-gray-900 group-hover:text-white">
                          Reset
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {stockOptions.map((item) => (
                      <a
                        key={item.name}
                        id={item.name}
                        className={`${compactStyle ? null : "-my-3 -ml-3"} flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-daydreamer-orange focus-visible:ring-opacity-50`}
                      >
                        <div className="ml-4 flex flex-row">
                          <CustomSwitch className={"mr-4"} onClick={handleClick} id={item.stateName} enabled={state ? state[item.stateName as keyof StockPresencePreferences] : false} />
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
