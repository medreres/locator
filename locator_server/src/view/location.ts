import { IVenue } from "./../model/venue";
import { Request, Response } from "express";
import { getDistanceFromLatLonInM, getNearbyPlaces, getParent } from "../util/format";
import { fetchPlaces } from "../api/fetchPlaces";
import {
  MAX_DISTANCE,
  FETCH_MAX_PLACES,
  STARTING_RADIUS,
  EXPECTED_NUMBER_OF_PLACES,
  MAX_RADIUS,
} from "../config/default.json";

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
  const { latitude: lat, longtitude: long, limit = EXPECTED_NUMBER_OF_PLACES, category = "" } = req.query;
  let { radius = STARTING_RADIUS } = req.query;

  // validate latitude and longitude
  if (!long || !lat) return res.status(400).json({ error: "Invalid longitude or latitude" });

  let result: IVenue | undefined = undefined;
  let placesNearby: IVenue[] | undefined = undefined;
  let results: IVenue[] | undefined = await fetchPlaces(
    lat as string,
    long as string,
    +radius,
    FETCH_MAX_PLACES,
    category as string
  );

  // every time when number of places is not large enough
  // ? make the radius bigger by 200m or 20%
  // do until number of places is large enough or radius is too big
  while (results.length < limit && radius < MAX_RADIUS) {
    console.log("radius is not big enough, making bigger");
    radius = Math.round(+radius * 1.3);
    if (radius > MAX_RADIUS) radius = MAX_RADIUS;
    results = await fetchPlaces(lat as string, long as string, +radius, +limit, category as string);
  }

  console.log("radius", radius);

  // if no places, return empty response
  if (results.length === 0) {
    return res.json({ result, placesNearby });
  }

  // if there are places nearby within the error radius, chose the first one, or its parent (if exist)
  const { latitude: lat1, longitude: long1 } = results[0].geocodes.main;
  const distance = getDistanceFromLatLonInM(+lat, +long, lat1, long1);
  if (distance < MAX_DISTANCE) {
    if (results[0].related_places?.parent) result = getParent(results[0].related_places.parent.name, results);
    // ! where problem with inconsistent data could arrise
    // if no parents found, return the closest place
    else result = results[0];
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
  placesNearby = getNearbyPlaces(results, currentPlace, +limit, +radius);

  res.json({ result, placesNearby });
};
