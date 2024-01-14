import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import PriceInput from "./PriceInput";
import Switch from "./Switch";
import { onInputChange, handleSwitch } from "../../../helper/componentHelpers";

import { ExtraSearchPreference, MerchReqParams, SearchPreference, SortType, StockPresencePreferences } from "../../../types";

interface Dropdown {
  mainOptions: SearchPreference[];
  merchReqState: MerchReqParams,
  onMerchReqChange: React.Dispatch<React.SetStateAction<MerchReqParams>>
  extraOptions?: ExtraSearchPreference[]
  openToRight?: boolean;
  className?: string;
}

export default function Dropdown({ mainOptions, merchReqState, onMerchReqChange, extraOptions, openToRight, className }: Dropdown) {
  const [selectedOption, setSelectedOption] = useState<SortType | null>(null)

  const onSwitchClick = (e: React.MouseEvent<HTMLButtonElement>, stockPreferences: StockPresencePreferences) => {
    const setNewState = (stockPreferences: StockPresencePreferences): void => {
      onMerchReqChange({ ...merchReqState, stockPreferences })
    }

    handleSwitch(e, stockPreferences, setNewState)
  }

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>, sortBy: SortType) => {
    e.preventDefault()

    // ? If we've clicked an option that has is not selected, select it
    if (sortBy !== selectedOption) {
      setSelectedOption(sortBy);
      onMerchReqChange({ ...merchReqState, sortBy })
      // ? If we've clicked an option that has already been selected, deselect the option
    } else {
      setSelectedOption(null);
      onMerchReqChange({ ...merchReqState, sortBy: null })
    }

  }

  const isEnabled: (stockOption: string) => boolean = (stockOption) => {
    const stockOptionKey = stockOption as keyof StockPresencePreferences;
    if (merchReqState.stockPreferences[stockOptionKey] !== undefined) {
      return merchReqState.stockPreferences[stockOptionKey];
    } else {
      console.log("Warning: stockOption not a keyof StockPresencePreferences")
      return false;
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, merchReqState, onMerchReqChange)

  return (
    <div className={className}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-daydreamer-blue px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30">
            Options
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-white"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`${openToRight === true ? "left-0" : "right-0"
              } z-10 absolute max-[500px]:inset-x-0 max-[500px]:mx-auto  mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >

            {/* // ? Main preference */}
            {mainOptions ? mainOptions.map((option, index) => {
              return (
                <div key={`${option}-${index}`}>
                  <Menu.Item >
                    {({ active }) => (
                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOptionClick(e, option.camelCaseName)}
                        className={`
                        ${active
                            ? "bg-daydreamer-orange text-white"
                            : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {option.name}
                        {selectedOption === option.camelCaseName
                          ? <CheckIcon className="ml-2 h-5 w-5 " />
                          : null}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              );
            }) : null}

            {/* // ? Extra options */}
            {extraOptions ? extraOptions.map((option, index) => {

              if (option.componentType === "switch" && option.stockPresencePreference) {
                return (
                  <div key={`${option}-${index}`}>
                    <Menu.Item >
                      <a className=" -ml-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-daydreamer-orange focus-visible:ring-opacity-50">
                        <div className="ml-4 flex flex-row">
                          <Switch
                            id={Object.keys(option.stockPresencePreference)[index - 1]}
                            className={"mr-4"}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSwitchClick(e, merchReqState.stockPreferences)}
                            enabled={isEnabled(Object.keys(option.stockPresencePreference)[index - 1])}
                          />
                          <p className="text-sm font-medium text-gray-900">
                            {option.name}
                          </p>
                        </div>
                      </a>
                    </Menu.Item>
                  </div>
                );
              } else if (option.componentType === "price range") {
                return (
                  <div key={`${option.name}-${index}`}>
                    <Menu.Item >
                      {({ active }) => (
                        <div
                          className={`${active
                            ? "bg-daydreamer-orange text-white"
                            : "text-gray-900"
                            } relative grid gap-8 bg-white p-2 lg:grid-cols-2`}
                        >
                          <div className=" flex flex-row gap-4">
                            <PriceInput placeholder="from" id={"priceFrom"} currState={merchReqState.priceFrom} onChange={handleInputChange} />
                            <PriceInput placeholder="to" id={"priceTo"} currState={merchReqState.priceTo} onChange={handleInputChange} />
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                );
              }
            }) : null}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
