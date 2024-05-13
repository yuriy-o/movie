import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";

interface EpisodesResponse {
  episodes: {
    results: Episode[];
  };
}

export interface EpisodesState {
  results: Episode[];
}

export interface Episode {
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
}

export interface Character {
  id: number;
  name: string;
  image: string;
}

export interface EpisodesQuery {
  page: number;
}

export const rickandmortyApi = createApi({
  reducerPath: "rickandmortyApi",
  baseQuery: graphqlRequestBaseQuery({
    url: "https://rickandmortyapi.com/graphql",
  }),
  endpoints: (builder) => ({
    getEpisodes: builder.query<EpisodesState, EpisodesQuery>({
      query: ({ page }) => ({
        document: gql`
          query GetEpisodesPage($page: Int) {
            episodes(page: $page) {
              results {
                name
                air_date
                episode
                characters {
                  id
                  name
                  image
                }
              }
            }
          }
        `,
        variables: {
          page,
        },
      }),
      transformResponse(response: EpisodesResponse) {
        return { results: response.episodes.results };
      },
    }),
  }),
});

export const { useGetEpisodesQuery } = rickandmortyApi;
