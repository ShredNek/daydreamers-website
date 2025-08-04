import { createContext, type ReactNode, useState } from "react";
import type { AppContextInterface, AllShowsEntity, MusicData } from "../types/index";

export const AppContext = createContext<AppContextInterface>({
	showsData: null,
	musicData: null,
	setShowsData: () => {},
	setMusicData: () => {},
});

interface AppContextProvider {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProvider) {
	const [showsData, setShowsData] = useState<AllShowsEntity | null>(null);
	const [musicData, setMusicData] = useState<MusicData | null>(null);

	return (
		<AppContext.Provider
			value={{
				showsData,
				musicData,
				setShowsData,
				setMusicData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
