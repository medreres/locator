import { IVenue } from "../interfaces/venue";
import { Request, Response } from "express";
import { getDistanceFromLatLonInM, getNearbyPlaces } from "../util/format";
import { fetchPlaces } from "../api/fetchPlaces";
import {
  ERROR_MARGIN,
  STARTING_RADIUS,
  EXPECTED_NUMBER_OF_PLACES,
  MAX_RADIUS,
  MIN_RADIUS,
  FETCH_MAX_PLACES,
} from "../config/default.json";
import { IParams } from "../interfaces/api";

// ! Problems with  data
/**
 * 1. span of objects overlaps - one object at map could be suboject of it's parent
 * Example: Olimp Pivdenny (49.812145882415244, 23.973650446113748)
 *          Olimpik (49.81191827716483, 23.974160569119896)
 *
 * 2. Some places doesn't exist either on maps (Google maps) or in Forsquare API
 *
 * 3. Place could have incorrect or outdated data
 *
 * 4. Sometimes places have duplicates when fetched from Forsquare API
 *    Example: Metro (49.82352767277188, 23.91606922664501)
 *             METRO Cash & Carry, Тц Метро - duplicates
 *
 * 5. Inconsistent data
 *    Places from Forsquare API have realted_places field, where could be parent
 *    or children properties, but sometimes some places doesnt have this property,
 *    while others have
 *    Example: Victoria Gardens have all the stores with related_places field pointing
 *    to the parent place, Victoria Gardens itself, but others malls' stores don't have
 *    those fields
 */
export const getLocation = async (req: Request, res: Response) => {
  // main parameters for search request
  const { latitude: lat, longitude: long, limit = EXPECTED_NUMBER_OF_PLACES, categories = "" } = req.query;
  let { radius = STARTING_RADIUS } = req.query;

  // validate latitude and longitude
  if (!long || !lat) return res.status(400).json({ error: "Invalid longitude or latitude" });
  // check if radius is valid
  if (radius < MIN_RADIUS || radius > MAX_RADIUS)
    return res.status(400).json({ error: "Invalid radius. Out of range" });
  // check if limit is valid
  if (limit < 0 || limit > FETCH_MAX_PLACES) return res.status(400).json({ error: "Invalid limit Out of range" });

  const params: IParams = {
    ll: `${lat},${long}`,
    radius: radius.toString(),
    limit: limit.toString(),
    categories: categories.toString(),
    sort: "DISTANCE",
  };

  let result: IVenue | undefined = undefined;
  let placesNearby: IVenue[] | undefined = undefined;
  let results: IVenue[] | undefined = await fetchPlaces(params);

  // every time when number of places is not large enough
  // make the radius bigger/lesser
  // ? by 20%
  // if places are way too much, make radius lesser
  // do until number of places is as expected or radius is too big/small

  while (radius <= MAX_RADIUS && radius >= MIN_RADIUS) {
    // ? In separate function this block ?
    if (results.length >= limit) {
      radius = Math.round(+radius * 0.8);
    } else {
      radius = Math.round(+radius * 1.2);
    }

    // bear in mind boundary conditions which may be jumped over
    if (radius > MAX_RADIUS) radius = MAX_RADIUS;
    else if (radius < MIN_RADIUS) radius = MIN_RADIUS;

    // update value in params object
    params.radius = radius.toString();

    console.log("radius", radius);

    const newResult = await fetchPlaces(params);

    // if saved last result is lesser than limit, save the newResult
    if (results.length < limit) {
      results = newResult;
      continue;
      // if new request has smaller number of places, break the loop and take the last result
    } else if (newResult.length < limit) break;
  }

  // if no places, return empty response
  if (results.length === 0) {
    return res.json({ result, placesNearby });
  }

  // if there is a place withing error margin, chose the place as current
  const { latitude: lat1, longitude: long1 } = results[0].geocodes.main;
  const distance = getDistanceFromLatLonInM(+lat, +long, lat1, long1);
  
  if (distance < ERROR_MARGIN) {
    result = results[0];
  }

  // show the places nearby without the current place
  // if current place is unavailable just pass object containing the current coordianates
  const currentPlace: IVenue =
    result ||
    ({
      geocodes: {
        main: {
          latitude: lat,
          longitude: long,
        },
      },
    } as any);
  placesNearby = getNearbyPlaces(results, currentPlace, +limit);

  res.json({ result, placesNearby });
};
