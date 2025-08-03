import { print } from "graphql";
import { GET_ALL_SHOWS, GET_ALL_MUSIC, GET_ALL_MEDIA } from "./queries";
import type { AllShowsEntity, MediaData, MusicData } from "../types";

const datoGraphqlCall = async <T>(query: string): Promise<T> => {
  const config: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_DATO_GRAPHQL_READONLY_KEY}`,
    },
    body: JSON.stringify({ query }),
  };

  const response = await fetch(
    `${import.meta.env.VITE_DATO_GRAPHQL_ENDPOINT}/`,
    config,
  );

  if (!response.ok) {
    throw new Error(`Dato GraphQL request failed: ${response.statusText}`);
  }

  return (await response.json()) as T;
};

export const getAllShows = async () =>
  await datoGraphqlCall<AllShowsEntity>(print(GET_ALL_SHOWS));

export const getAllMusic = async () =>
  await datoGraphqlCall<MusicData>(print(GET_ALL_MUSIC));

export const getAllMedia = async () =>
  await datoGraphqlCall<MediaData>(print(GET_ALL_MEDIA));
