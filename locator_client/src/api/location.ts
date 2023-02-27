import { IParams } from "../interfaces/venue";
import { BASE_URL } from "../config/default.json";
import { buildUrl } from "../util/buildUrl";
export const getLocation = async (params: IParams) => {
  const url = "/location";
  const buildedUrl = buildUrl(url, BASE_URL, params);

  return fetch(buildedUrl.toString())
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.log(err));
};
