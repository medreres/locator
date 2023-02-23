import { IVenue } from "../model/venue";
import { RADIUS, PLACES_LIMIT } from '../config/default.json'

/**
 * Point with coordinates in longtitude and latitude
 */
export type IPoint = {
    lat: number;
    long: number;
}

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
    return places.filter(place => place.fsq_id != result?.fsq_id && place.distance < RADIUS).slice(0, PLACES_LIMIT);
}

/**
 * 
 * @param point1 First point
 * @param point2 Second point
 * @returns distance between two points in meters
 */
export function getDistanceFromLatLonInM(point1: IPoint, point2: IPoint): number {
    const R = 6371000; // Radius of the earth in km
    const dLat = deg2rad(point2.lat - point1.lat);  // deg2rad below
    const dLon = deg2rad(point2.long - point1.long);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in m
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}