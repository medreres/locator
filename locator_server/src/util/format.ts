import { IVenue } from "../model/venue";

/**
 * go through all places and find the parent venue
 */
export function getParent(name: string, places: IVenue[]): IVenue | undefined {
    return places.find(place => {
        // console.log('place.name', place.name)
        return place.name.includes(name)
    })
}


/**
 * return all the places nearby without the current place in specified radius
 */
export function getNearbyPlaces(places: IVenue[], result: IVenue | undefined) {
    const LIMIT = 5;
    const RADIUS = 200; // ? in meters
    return places.filter(place => place.fsq_id != result?.fsq_id && place.distance < RADIUS).slice(0, LIMIT);
}