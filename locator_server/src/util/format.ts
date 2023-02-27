import { IVenue } from "../model/venue";
import { STARTING_RADIUS, MAX_RADIUS } from "../config/default.json";

/**
 * Point with coordinates in longtitude and latitude
 */
export type IPoint = {
  lat: number;
  long: number;
};

/**
 * go through all places and find the parent venue
 */
export function getParent(name: string, places: IVenue[]): IVenue | undefined {
  // includes method instead of string comparision because parent's name can differ
  return places.find((place) => place.name.toLowerCase().includes(name.toLowerCase()));
}

/**
 * return all the places nearby without the current place in specified radius
 */
export function getNearbyPlaces(
  places: IVenue[],
  currentPlace: IVenue,
  maxNumberOfPlaces: number,
  // maxRadius: number = MAX_RADIUS
) {
  // coordinates of current place
  // const { latitude: lat1, longitude: long1 } = currentPlace.geocodes.main;
  return places
    .filter((place) => {
      // const { latitude: lat2, longitude: long2 } = place.geocodes.main;
      // const distance = getDistanceFromLatLonInM(lat1, long1, lat2, long2);
      // return place.fsq_id != currentPlace?.fsq_id && distance < maxRadius;
      return place.fsq_id != currentPlace?.fsq_id;
    })
    .slice(0, maxNumberOfPlaces); // if there are more places than needed, trim the remaining places
}

/**
 *
 * @returns distance between two points in meters
 */
export function getDistanceFromLatLonInM(lat1: number, long1: number, lat2: number, long2: number): number {
  const R = 6371000; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(long2 - long1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in m
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
