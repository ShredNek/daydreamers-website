import { createContext, ReactNode, useState } from "react";
import { AppContextInterface, AllGigsEntity, MerchItem, MerchReqParams } from "../types/index";

export const AppContext = createContext<AppContextInterface>({
  gigData: null,
  merchItems: null,
  merchReqParams: null,
  updateGigData: () => { },
  updateMerchItems: () => { },
  updateMerchReqParams: () => { }

})

interface AppContextProvider {
  children: ReactNode
}

export function AppContextProvider({ children }: AppContextProvider) {
  const [gigData, setGigData] = useState<AllGigsEntity | null>(null)
  const [merchItems, setMerchItems] = useState<MerchItem[] | null>(null)
  const [merchReqParams, setMerchReqParams] = useState<MerchReqParams | null>(null)

  // ? Setter

  const updateGigData = (currGigData: AllGigsEntity) => {
    setGigData(() => ({ ...currGigData }))
  }

  const updateMerchItems = (currMerchItems: MerchItem[]) => {
    setMerchItems(() => [...currMerchItems])
  }

  const updateMerchReqParams = (currMerchReqParams: MerchReqParams) => {
    setMerchReqParams(() => ({ ...currMerchReqParams }))
  }

  return (
    <AppContext.Provider value={{
      gigData,
      merchItems,
      merchReqParams,
      updateGigData,
      updateMerchItems,
      updateMerchReqParams
    }}>
      {children}
    </AppContext.Provider>

  )


}