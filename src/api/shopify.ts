import { print } from "graphql";
import { GET_ALL_MERCH, GET_ONE_MERCH } from "./queries";

async function graphqlCall(query: string) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  const url = `${import.meta.env.VITE_SHOPIFY_MIDDLEWEAR_URL}/all`;
  return await fetch(url, config);
}

export async function getAllMerch() {
  return await graphqlCall(print(GET_ALL_MERCH));
}

export async function getMerchById(id: string) {
  return await graphqlCall(print(GET_ONE_MERCH).replace("MERCH_ID", id));
}
