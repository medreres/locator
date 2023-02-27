import { BASE_URL } from "../config/default.json";
import axios from "axios";
import { buildUrl } from "../util/buildUrl";
import { IVenue } from "../interfaces/venue";
import { IParams } from "../interfaces/api";

/**
 *
 * @param {IParams} params object with parameters to filter
 * @returns all the places nearby, filtered by params
 */
export async function fetchPlaces(params: IParams): Promise<IVenue[]> {
  const url = "/v3/places/search";
  const buildedUrl = buildUrl(url, BASE_URL, params);

  const response = await axios.get(buildedUrl.toString(), {
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_TOKEN as string,
    },
  });

  type IBody = {
    results: IVenue[];
  };
  const { results }: IBody = response.data;

  return results;
}
