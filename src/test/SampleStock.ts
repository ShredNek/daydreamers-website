import { Stock } from "../interfaces";

const SampleStock: Stock[] = [
  {
    name: "Product A",
    price: "$19.99",
    stockId: "12345",
    imgSrc: "product-a.jpg",
    extraImages: ["product-a-1.jpg", "product-a-2.jpg", "product-a-3.jpg"],
    dateAdded: new Date("2023-09-01"),
    availableSizes: new Set(["s", "m", "l"]),
  },
  {
    name: "Product B",
    price: "$29.99",
    stockId: "67890",
    imgSrc: "product-b.jpg",
    extraImages: ["product-b-1.jpg", "product-b-2.jpg", "product-b-3.jpg"],
    dateAdded: new Date("2023-09-05"),
    availableSizes: new Set(["m", "l", "xl"]),
  },
  {
    name: "Product C",
    price: "$14.99",
    stockId: "54321",
    imgSrc: "product-c.jpg",
    extraImages: ["product-c-1.jpg", "product-c-2.jpg", "product-c-3.jpg"],
    dateAdded: new Date("2023-09-10"),
    availableSizes: new Set(["xs", "s", "m", "l", "xl", "xxl"]),
  },
  {
    name: "Product D",
    price: "$39.99",
    stockId: "98765",
    imgSrc: "product-d.jpg",
    extraImages: ["product-d-1.jpg", "product-d-2.jpg", "product-d-3.jpg"],
    dateAdded: new Date("2023-09-15"),
    availableSizes: new Set(["s", "l"]),
  },
  {
    name: "Product E",
    price: "$24.99",
    stockId: "24680",
    imgSrc: "product-e.jpg",
    extraImages: ["product-e-1.jpg", "product-e-2.jpg", "product-e-3.jpg"],
    dateAdded: new Date("2023-09-20"),
    availableSizes: new Set(["s", "m", "xl"]),
  },
  {
    name: "Product F",
    price: "$49.99",
    stockId: "13579",
    imgSrc: "product-f.jpg",
    extraImages: ["product-f-1.jpg", "product-f-2.jpg", "product-f-3.jpg"],
    dateAdded: new Date("2023-09-25"),
    availableSizes: new Set(["m", "xxl"]),
  },
  {
    name: "Product G",
    price: "$34.99",
    stockId: "11223",
    imgSrc: "product-g.jpg",
    extraImages: ["product-g-1.jpg", "product-g-2.jpg", "product-g-3.jpg"],
    dateAdded: new Date("2023-09-30"),
    availableSizes: new Set(["s", "m", "l", "xl"]),
  },
  {
    name: "Product H",
    price: "$54.99",
    stockId: "99887",
    imgSrc: "product-h.jpg",
    extraImages: ["product-h-1.jpg", "product-h-2.jpg", "product-h-3.jpg"],
    dateAdded: new Date("2023-10-05"),
    availableSizes: new Set(["l", "xl"]),
  },
];

export default SampleStock;
