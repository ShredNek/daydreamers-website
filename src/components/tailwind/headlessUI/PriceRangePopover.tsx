import "../../../styles/vendor/tailwind.css";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import PriceInput from "./PriceInput";
import { MerchReqParams } from "../../../types";
import { onInputChange } from "../../../helper/componentHelpers";

type CustomPriceRangePopover = {
  merchReqState: MerchReqParams
  onMerchReqChange: React.Dispatch<React.SetStateAction<MerchReqParams>>
}

export default function CustomPriceRangePopover({ merchReqState, onMerchReqChange }: CustomPriceRangePopover) {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, merchReqState, onMerchReqChange)

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
              <span>Price</span>
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
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="bg-gray-50 p-4 flex flex-row gap-2 place-content-between">
                    <button
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out group hover:bg-daydreamer-orange focus:outline-none focus-visible:ring focus-visible:ring-daydreamer-orange focus-visible:ring-opacity-50"
                      onClick={() => { onMerchReqChange({ ...merchReqState, priceFrom: "", priceTo: "" }) }}
                    >
                      <span className="flex items-center place-content-between">
                        <span className="text-sm font-bold text-gray-900 group-hover:text-white">
                          Reset
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="relative grid gap-8 bg-white p-5 pl-7 grid-cols-2">
                    <PriceInput placeholder="from" onChange={onChange} id={"priceFrom"} currState={merchReqState.priceFrom} />
                    <PriceInput placeholder="to" onChange={onChange} id={"priceTo"} currState={merchReqState.priceTo} />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
