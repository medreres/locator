import { fetchPlaces } from "../api/fetchPlaces";
import { IParams } from "../interfaces/api";
import { IVenue } from "../interfaces/venue";
import { MAX_RADIUS, MIN_RADIUS, EXPECTED_NUMBER_OF_PLACES, ERROR_MARGIN } from "../config/default.json";
import { getDistanceFromLatLonInM } from "../util/format";

// every time when number of places is not large enough
// make the radius bigger/lesser
// ? by 20%
// if places are way too much, make radius lesser
// do until number of places is as expected or radius is too big/small

export async function findPlaces(params: IParams): Promise<IVenue[]> {
  // TODO cache responses
  let results: IVenue[] | undefined = await fetchPlaces(params);
  let radius = +params.radius;
  while (radius < MAX_RADIUS && radius > MIN_RADIUS) {
    // TODO Зараз ĸроĸ зміни радіусу - завжди 20%, можна спробувати зробити його більш гнучĸим
    if (results?.length >= EXPECTED_NUMBER_OF_PLACES) {
      radius = Math.round(+radius * 0.8);
    } else {
      radius = Math.round(+radius * 1.2);
    }
    // bear in mind boundary conditions which may be jumped over
    if (radius > MAX_RADIUS) radius = MAX_RADIUS;
    else if (radius < MIN_RADIUS) radius = MIN_RADIUS;

    // update value in params object
    params.radius = radius.toString();

    const newResult = await fetchPlaces(params);

    // if saved last result is lesser than limit, save the newResult
    if (results.length < EXPECTED_NUMBER_OF_PLACES) {
      results = newResult;
      continue;
      // if new request has smaller number of places, break the loop and take the last result
    } else if (newResult.length < EXPECTED_NUMBER_OF_PLACES) break;
  }

  return results;
}

export function getCurrentPlace(results: IVenue[], lat: number, long: number) {
  // if there is a place withing error margin, chose the place as current
  const { latitude: lat1, longitude: long1 } = results[0].geocodes.main;
  const distance = getDistanceFromLatLonInM(+lat, +long, lat1, long1);

  let result: IVenue | undefined;

  if (distance < ERROR_MARGIN) {
    result = results[0];
  }

  return result;
}