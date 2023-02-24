import { IVenue } from "../model/venue";
import { RADIUS, FETCH_MAX_PLACES } from "../config/default.json";
import axios from "axios";

/**
 * 
 * @param lat latitude 
 * @param long longtitude
 * @param radius search radius
 * @param limit limit of places fetched
 * @param categories ids of categories
 * @returns all the places nearby, filtered by params
 */
export async function fetchPlaces(
  lat: string,
  long: string,
  radius: number = RADIUS,
  limit: number = FETCH_MAX_PLACES,
  categories: string = ""
): Promise<IVenue[]> {
  const BASE_URL = "https://api.foursquare.com";
  const response = await axios.get(BASE_URL + "/v3/places/search", {
    headers: {
      Accept: "application/json",
      Authorization: process.env.FORSQUARE_TOKEN as string,
    },
    params: {
      radius: radius.toString(), // radius in meters
      categories: categories, // ids of categories of possible places
      ll: `${lat},${long}`, // coordinates
      limit: limit.toString(), // limit of places fetched
      sort: "DISTANCE", // sort by distance ascending
    },
  });

  type IBody = {
    results: IVenue[];
  };
  const { results }: IBody = response.data;

  return results;
}
