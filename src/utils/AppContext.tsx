import { createContext, type ReactNode, useState } from "react";
import type {
	AllShowsEntity,
	AppContextInterface,
	MusicData,
} from "../types/index.ts";

export const AppContext = createContext<AppContextInterface>({
	showsData: null,
	musicData: null,
	dialogContent: null,
	setShowsData: () => {},
	setMusicData: () => {},
	setDialogContent: () => {},
});

interface AppContextProvider {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProvider) {
	const [showsData, setShowsData] = useState<AllShowsEntity | null>(null);
	const [musicData, setMusicData] = useState<MusicData | null>(null);
	const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);

	return (
		<AppContext.Provider
			value={{
				showsData,
				musicData,
				dialogContent,
				setShowsData,
				setMusicData,
				setDialogContent,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
