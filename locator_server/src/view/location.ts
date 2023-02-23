import { IVenue } from './../model/venue';
import { Request, Response } from 'express'
import { getNearbyPlaces, getParent } from '../util/format';
import { getPlaces } from '../api/getPlaces';

export const getLocation = async (req: Request, res: Response) => {
    // main parameters for search request
    const { latitude: lat, longtitude: long } = req.query;

    const MAX_DISTANCE = 50; // ? error margin (meters)

    // validate latitude and longitude
    if (!long || !lat) return res.status(400).json({ error: 'Invalid longitude or latitude' });

    // fetch places
    const results = await getPlaces(lat as any, long as any);

    let result: IVenue | undefined = undefined;
    let placesNearby: IVenue[] | undefined = undefined;

    // if no places, return empty
    if (!results) {
        return res.json({ result, placesNearby })
    }

    // if there are places nearby, chose the first one, or its parent (if exist)
    if (results[0].distance < MAX_DISTANCE) {
        if (results[0].related_places?.parent)
            result = getParent(results[0].related_places.parent.name, results);
        // result = results[0].related_places.parent.name;
        else result = results[0];

    }

    // results.forEach(result => console.log(result.name, result.related_places))

    // show the places nearby without the current place
    placesNearby = getNearbyPlaces(results, result);

    res.json({ result, placesNearby })
}
