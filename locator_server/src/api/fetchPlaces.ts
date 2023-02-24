import { IVenue } from "../model/venue";
import { RADIUS, FETCH_MAX_PLACES } from "../config/default.json";
import axios from "axios";

export async function fetchPlaces(
  lat: string,
  long: string,
  radius: number = RADIUS,
  limit: number = FETCH_MAX_PLACES,
  placeType: string[] = []
): Promise<IVenue[]> {
  const BASE_URL = "https://api.foursquare.com";
  const response = await axios.get(BASE_URL + "/v3/places/search", {
    headers: {
      Accept: "application/json",
      Authorization: process.env.FORSQUARE_TOKEN as string,
    },
    params: {
      radius: radius.toString(), // radius in meters
      // TODO types of places
      query: placeType.join(","),
      ll: `${lat},${long}`,
      limit: limit.toString(),
      // open_now: 'true',
      sort: "DISTANCE",
    },
  });

  type IBody = {
    results: IVenue[];
  };
  const { results }: IBody = response.data;

  return results;
}
