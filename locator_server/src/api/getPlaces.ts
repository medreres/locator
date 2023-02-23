import { IVenue } from './../model/venue';
import { RADIUS } from '../config/default.json'

export async function getPlaces(lat: string, long: string) {
    const searchParams = new URLSearchParams({

        radius: RADIUS.toString(), // radius in meters
        // categories: '17069,17070',
        // query: '',
        ll: `${lat},${long}`,
        limit: '50',
        // open_now: 'true',
        sort: 'DISTANCE',

    });

    const url = `https://api.foursquare.com/v3/places/search?${searchParams}`;


    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: process.env.FORSQUARE_TOKEN as string,
        }
    });

    type ibody = {
        results: IVenue[];
    }
    const { results }: ibody = await response.json();
    return results;
}