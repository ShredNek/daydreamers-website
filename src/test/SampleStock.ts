import { Stock } from "../interfaces";

const SampleStock: Stock[] = [
  {
    name: "Product A",
    price: "$19.99",
    stockId: "12345",
    imgSrc: "product-a.jpg",
    dateAdded: new Date("2023-09-01"),
    availableSizes: new Set(["s", "m", "l"]),
  },
  {
    name: "Product B",
    price: "$29.99",
    stockId: "67890",
    imgSrc: "product-b.jpg",
    dateAdded: new Date("2023-09-05"),
    availableSizes: new Set(["m", "l", "xl"]),
  },
  {
    name: "Product C",
    price: "$14.99",
    stockId: "54321",
    imgSrc: "product-c.jpg",
    dateAdded: new Date("2023-09-10"),
    availableSizes: new Set(["xs", "s", "m", "l", "xl", "xxl"]),
  },
  {
    name: "Product D",
    price: "$39.99",
    stockId: "98765",
    imgSrc: "product-d.jpg",
    dateAdded: new Date("2023-09-15"),
    availableSizes: new Set(["s", "l"]),
  },
  {
    name: "Product E",
    price: "$24.99",
    stockId: "24680",
    imgSrc: "product-e.jpg",
    dateAdded: new Date("2023-09-20"),
    availableSizes: new Set(["s", "m", "xl"]),
  },
  {
    name: "Product F",
    price: "$49.99",
    stockId: "13579",
    imgSrc: "product-f.jpg",
    dateAdded: new Date("2023-09-25"),
    availableSizes: new Set(["m", "xxl"]),
  },
  {
    name: "Product G",
    price: "$34.99",
    stockId: "11223",
    imgSrc: "product-g.jpg",
    dateAdded: new Date("2023-09-30"),
    availableSizes: new Set(["s", "m", "l", "xl"]),
  },
  {
    name: "Product H",
    price: "$54.99",
    stockId: "99887",
    imgSrc: "product-h.jpg",
    dateAdded: new Date("2023-10-05"),
    availableSizes: new Set(["l", "xl"]),
  },
];

export default SampleStock;
