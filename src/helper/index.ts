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
