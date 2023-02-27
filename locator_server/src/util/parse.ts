import { Request } from "express";

export function parseLocationParams(req: Request) {
  // main parameters for search request
  const { latitude: lat, longitude: long, categories = "" } = req.query;

  // validate latitude and longitude
  if (!lat || +lat < -90 || +lat > 90) throw new Error("Invalid latitude. Must be between -90 and 90");
  if (!long || +long < -180 || +long > 180) throw new Error("Invalid longitude. Must be between -180 and 180");

  return {
    lat,
    long,
    categories,
  };
}
