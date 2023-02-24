import { IVenue } from "../model/venue";
import { RADIUS, FETCH_MAX_PLACES } from "../config/default.json";

export async function fetchPlaces(
  lat: string,
  long: string,
  radius: number = RADIUS,
  limit: number = FETCH_MAX_PLACES
) {
  const searchParams = new URLSearchParams({
    radius: radius.toString(), // radius in meters
    // categories: '17069,17070',
    // query: '',
    ll: `${lat},${long}`,
    limit: limit.toString(),
    // open_now: 'true',
    sort: "DISTANCE",
  });

  const url = `https://api.foursquare.com/v3/places/search?${searchParams}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FORSQUARE_TOKEN as string,
    },
  });

  type IBody = {
    results: IVenue[];
  };
  const { results }: IBody = await response.json();

  return results;
}
