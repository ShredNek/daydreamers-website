import { createContext, ReactNode, useState } from "react";
import { AppContextInterface, AllGigsEntity, MusicData } from "../types/index";

export const AppContext = createContext<AppContextInterface>({
  gigData: null,
  musicData: null,
  setGigData: () => {},
  setMusicData: () => {},
});

interface AppContextProvider {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProvider) {
  const [gigData, setGigData] = useState<AllGigsEntity | null>(null);
  const [musicData, setMusicData] = useState<MusicData | null>(null);

  return (
    <AppContext.Provider
      value={{
        gigData,
        musicData,
        setGigData,
        setMusicData,
      }}>
      {children}
    </AppContext.Provider>
  );
}
