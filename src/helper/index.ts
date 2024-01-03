import { Size } from "../types";

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
