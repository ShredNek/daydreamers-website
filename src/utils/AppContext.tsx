import { createContext, ReactNode, useState } from "react";
import { AppContextInterface, AllGigsEntity, MerchItem, MerchReqParams, SongCollectionData } from "../types/index";

export const AppContext = createContext<AppContextInterface>({
  gigData: null,
  merchItems: null,
  songCollectionData: null,
  merchReqParams: {
    sortBy: null,
    stockPreferences: {
      inStockRequested: true,
      outOfStockRequested: true
    },
    priceFrom: "",
    priceTo: "",
  },
  setGigData: () => { },
  setMerchItems: () => { },
  setMerchReqParams: () => { },
  setSongCollectionData: () => { }
})

interface AppContextProvider {
  children: ReactNode
}

export function AppContextProvider({ children }: AppContextProvider) {
  const [gigData, setGigData] = useState<AllGigsEntity | null>(null)
  const [merchItems, setMerchItems] = useState<MerchItem[] | null>(null)
  const [songCollectionData, setSongCollectionData] = useState<SongCollectionData | null>(null)
  const [merchReqParams, setMerchReqParams] = useState<MerchReqParams>({
    sortBy: null,
    stockPreferences: {
      inStockRequested: true,
      outOfStockRequested: true
    },
    priceFrom: "",
    priceTo: "",
  })

  return (
    <AppContext.Provider value={{
      gigData,
      merchItems,
      merchReqParams,
      songCollectionData,
      setGigData,
      setMerchItems,
      setMerchReqParams,
      setSongCollectionData
    }}>
      {children}
    </AppContext.Provider>

  )


}