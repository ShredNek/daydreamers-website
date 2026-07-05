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
	secretMusicDirectoryAccessed: false,
	setShowsData: () => {},
	setMusicData: () => {},
	setDialogContent: () => {},
	setSecretMusicDirectoryAccessed: () => {},
});

interface AppContextProvider {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProvider) {
	const [showsData, setShowsData] = useState<AllShowsEntity | null>(null);
	const [musicData, setMusicData] = useState<MusicData | null>(null);
	const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);
	const [secretMusicDirectoryAccessed, setSecretMusicDirectoryAccessed] =
		useState<boolean>(false);

	return (
		<AppContext.Provider
			value={{
				showsData,
				musicData,
				dialogContent,
				secretMusicDirectoryAccessed,
				setShowsData,
				setMusicData,
				setDialogContent,
				setSecretMusicDirectoryAccessed,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
