import { inputIsValid } from ".";
import { StockPresencePreferences, MerchReqParams } from "../types";

export const handleSwitch = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
  state: StockPresencePreferences,
  changeStockPreferenceState: (stock: StockPresencePreferences) => void
): void => {
  const switchPressed = e?.currentTarget.id as keyof StockPresencePreferences;

  // ? Extract the current state of our switch from the state object
  const isRequested = state[switchPressed];

  // ? we index with the switchPressed, because it is a key of the state object
  let newState: StockPresencePreferences = {
    ...state,
    [switchPressed]: isRequested ? false : true,
  };

  if (Object.values(newState).every((val) => val === false)) {
    newState = Object.fromEntries(
      Object.entries(state).map(([key, _]) => [key, true])
    ) as StockPresencePreferences;
    newState[switchPressed] = false;
  }

  changeStockPreferenceState(newState);
};

export const onInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  merchReqState: MerchReqParams,
  onMerchReqChange: React.Dispatch<React.SetStateAction<MerchReqParams>>
): void => {
  const currentElementId = e.currentTarget.id as keyof MerchReqParams;

  if (
    inputIsValid(e.currentTarget.value) &&
    merchReqState[currentElementId] !== undefined
  ) {
    onMerchReqChange({
      ...merchReqState,
      [currentElementId]: e.currentTarget.value,
    });
  }
};
