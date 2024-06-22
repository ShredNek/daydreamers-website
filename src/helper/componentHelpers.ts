import { inputIsValid } from "./index.tsx";
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

export const getProductTitle = async (
  productComponentRef: React.RefObject<HTMLDivElement>
) => {
  // ? This is a bit of black magic to get the name of the product displayed properly
  const config = { attributes: true, childList: true, subtree: true };
  let iframe: HTMLIFrameElement | null | undefined;
  let productTitle: HTMLHeadingElement | null | undefined;
  let final: string | null = "";

  await new Promise<void>((resolve) => {
    const docObserver = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        iframe = productComponentRef.current?.querySelector("iframe");

        if (mutation.type === "childList" && iframe) {
          docObserver.disconnect();
          iframe.addEventListener("load", () => {
            compObserver.observe(iframe?.contentDocument!, config);
          });
        }
      }
    });

    const compObserver = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          productTitle =
            iframe?.contentDocument?.querySelector<HTMLHeadingElement>(
              ".shopify-buy__product__title"
            );
          if (productTitle) {
            compObserver.disconnect();
            final = productTitle.textContent;
            resolve();
          }
        }
      }
    });

    docObserver.observe(document, config);
  });

  // console.log(final);
  setTimeout(() => productTitle?.remove(), 200);
  return final;
};

export const onDocumentMutation = (cb: () => any): MutationObserver => {
  const config = { attributes: true, childList: true, subtree: true };

  let timeout: NodeJS.Timeout;

  const observer = new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb();
        }, 150);
      }
    }
  });

  observer.observe(document, config);

  return observer;
};
