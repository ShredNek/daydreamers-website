export function toCamelCase(str: string) {
  const splitStr = str.split("");
  console.log(splitStr);
  const res = splitStr
    .map((c) => {
      if (c !== " " && c !== "-") return c;
    })
    .join("");
  return res.charAt(0).toLowerCase().concat(res.slice(1));
}

export function toKebabCase(str: string) {
  const splitStr = str.split("");
  const res = splitStr.map((c) => (c === " " ? "-" : c)).join("");
  return res.toLowerCase();
}

export const convertToType = <T extends string>(value: string): T => {
  const typeLookup: Record<string, boolean> = {
    [value]: true,
  };

  const isSize = (value: string): value is T => {
    return !!typeLookup[value];
  };

  if (isSize(value)) {
    return value;
  } else {
    throw new Error(`${value} is not of the correct type`);
  }
};

export const isKeyOfInterface = <T extends Record<string, unknown>>(
  key: any
): key is keyof T => {
  return {}.hasOwnProperty.call({}, key);
};

export const inputIsValid = (input: string) =>
  /^(\d+(\.\d{0,2})?|0*\.?\d{0,2})?$/.test(input);

export const isWithinPageCount = (
  itemIndex: number,
  activePage: number,
  pageDifference: number
): boolean => {
  const adjustedIndex = itemIndex + 1;
  const lowerPageRange = (activePage - 1) * pageDifference;
  const higherPageRange = lowerPageRange + pageDifference;
  return adjustedIndex > lowerPageRange && adjustedIndex <= higherPageRange;
};

export const returnFormattedArtistNames = (names: string): string | null => {
  const namesArray = names.split(",");

  if (!namesArray.length) return null;

  let message = null;
  switch (namesArray.length) {
    case 1:
      message = `Featuring ${namesArray[0]}!`;
      break;
    case 2:
      message = `Featuring ${namesArray[0]} and ${namesArray[1]}!`;
      break;
    case 3:
      message = `Featuring ${namesArray[0]}, ${namesArray[1]} and ${namesArray[2]}!`;
      break;
    // ? This is to catch a length that is not 0, 1, 2 or 3
    default:
      message = `Featuring ${namesArray[0]}, ${namesArray[1]} and many more of our friends!`;
      break;
  }

  return message;
};

export const returnFormattedDate = (rawUtcString: string): string => {
  const date = new Date(rawUtcString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleDateString(undefined, options);
};
