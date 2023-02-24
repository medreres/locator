import { IVenue } from "../model/venue";
import { RADIUS, FETCH_MAX_PLACES } from "../config/default.json";
import axios from "axios";

export async function fetchPlaces(
  lat: string,
  long: string,
  radius: number = RADIUS,
  limit: number = FETCH_MAX_PLACES,
  categories: string = ""
): Promise<IVenue[]> {
  const BASE_URL = "https://api.foursquare.com";
  // console.log(placeType);
  const response = await axios.get(BASE_URL + "/v3/places/search", {
    headers: {
      Accept: "application/json",
      Authorization: process.env.FORSQUARE_TOKEN as string,
    },
    params: {
      radius: radius.toString(), // radius in meters
      // TODO types of places
      // query: 'cafe',
      categories: categories,
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
