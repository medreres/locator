import { IVenue } from "../interfaces/venue";
import { Request, Response } from "express";
import { getNearbyPlaces } from "../util/format";
import { STARTING_RADIUS, EXPECTED_NUMBER_OF_PLACES } from "../config/default.json";
import { IParams } from "../interfaces/api";
import { parseLocationParams } from "../util/parse";
import { findPlaces, getCurrentPlace } from "../services/places";

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
  // extract the params needed for request
  let categories, lat, long;
  try {
    ({ categories, lat, long } = parseLocationParams(req));
  } catch (err) {
    return res.status(404).json({ error: (err as any).message });
  }

  let currentPlace: IVenue | undefined = undefined;
  let placesNearby: IVenue[] | undefined = undefined;

  // build params object and find nearby palces
  const params: IParams = {
    ll: `${lat},${long}`,
    radius: STARTING_RADIUS.toString(),
    limit: EXPECTED_NUMBER_OF_PLACES.toString(),
    categories: categories.toString(),
    sort: "DISTANCE",
  };
  const results = await findPlaces(params);

  // try to get current place
  currentPlace = getCurrentPlace(results, +lat, +long);

  // show the places nearby without the current place
  // if current place is unavailable just pass object containing the current coordianates
  const currentCoordinates: IVenue =
    currentPlace ||
    ({
      geocodes: {
        main: {
          latitude: lat,
          longitude: long,
        },
      },
    } as any);
  placesNearby = getNearbyPlaces(results, currentCoordinates);

  res.json({ currentPlace, placesNearby });
};
