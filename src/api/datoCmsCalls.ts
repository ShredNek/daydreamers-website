import { print } from "graphql";
import { GET_ALL_GIGS, GET_ALL_MUSIC, GET_ALL_MEDIA } from "./queries";

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

export const getAllGigs = async () =>
  await datoGraphqlCall(print(GET_ALL_GIGS));

export const getAllMusic = async () =>
  await datoGraphqlCall(print(GET_ALL_MUSIC));

export const getAllMedia = async () =>
  await datoGraphqlCall(print(GET_ALL_MEDIA));
