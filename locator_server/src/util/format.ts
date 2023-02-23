import { IVenue } from "../model/venue";

export function getParent(name: string, places: IVenue[]): IVenue | undefined {
    return places.find(place => {
        // console.log('place.name', place.name)
        return place.name.includes(name)
    })
}

const RADIUS = 200; // ? in meters

export function getNearbyPlaces(places: IVenue[], result: IVenue | undefined) {
    const LIMIT = 5;
    return places.filter(place => place.fsq_id != result?.fsq_id && place.distance < RADIUS).slice(0, LIMIT);
}