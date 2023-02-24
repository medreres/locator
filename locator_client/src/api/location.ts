import { buildUrl } from "../util/buildUrl";

export interface IParams {
  latitude: string;
  longtitude: string;
  radius?: number;
  limit?: number;
  category: string;
}
export const getLocation = async (params: IParams) => {
  const url = "/location",
    base = "http://localhost:3173";
  const buildedUrl = buildUrl(url, base, params);

  return fetch(buildedUrl.toString())
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.log(err));
};
