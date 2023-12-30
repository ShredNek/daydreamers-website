import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import PriceInput from "./PriceInput";
import Switch from "./Switch";

import { SearchPreference } from "../../../interfaces";

interface Dropdown {
  sortBy: SearchPreference[];
  openToRight?: boolean;
  className?: string;
}

export default function Dropdown({ sortBy, openToRight, className }: Dropdown) {
  function handleSwitch() { }

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
              } absolute max-[500px]:inset-x-0 max-[500px]:fixed max-[500px]:mx-auto  mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            {sortBy
              ? sortBy.map((preference, index) => {
                if (preference.camelCaseName === "availability") {
                  return (
                    <div className="">
                      <Menu.Item key={`${preference}-${index}`}>
                        {({ active }) => (
                          <a className=" -ml-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-daydreamer-orange focus-visible:ring-opacity-50">
                            <div className="ml-4 flex flex-row">
                              <Switch
                                id={`${preference.camelCaseName}Switch`}
                                className={"mr-4"}
                                onClick={handleSwitch}
                                enabled={false}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {preference.name}
                              </p>
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  );
                } else if (preference.camelCaseName === "priceRange") {
                  return (
                    <div className="">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`${active
                              ? "bg-daydreamer-orange text-white"
                              : "text-gray-900"
                              } relative grid gap-8 bg-white p-2 lg:grid-cols-2`}
                          >
                            <div className=" flex flex-row gap-4">
                              <PriceInput placeholder="from" compactStyle={true} />
                              <PriceInput placeholder="to" compactStyle={true} />
                            </div>
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  );
                } else {
                  return (
                    <div className="">
                      <Menu.Item key={`${preference}-${index}`}>
                        {({ active }) => (
                          <button
                            className={`${active
                              ? "bg-daydreamer-orange text-white"
                              : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {preference.name}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  );
                }
              })
              : null}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
