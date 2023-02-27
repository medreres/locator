import { IParams } from "../interfaces/venue";
import { buildUrl } from "../util/buildUrl";
export const getLocation = async (params: IParams) => {
  const url = "/location",
    base = "http://localhost:3173";
  const buildedUrl = buildUrl(url, base, params);

  return fetch(buildedUrl.toString())
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.log(err));
};
