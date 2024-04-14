import { print } from "graphql";
import { GET_ALL_GIGS } from "./queries";

async function datoGraphqlCall(query: string) {
  const config: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_DATO_GRAPHQL_READONLY_KEY}`,
    },
    body: JSON.stringify({ query }),
  };

  const url = `${import.meta.env.VITE_DATO_GRAPHQL_ENDPOINT}/`;
  return await fetch(url, config);
}

export const getAllPosts = async () =>
  await datoGraphqlCall(print(GET_ALL_GIGS));
