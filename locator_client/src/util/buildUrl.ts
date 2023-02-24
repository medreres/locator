import { IParams } from "../api/location";

export function buildUrl(url: string, base: string, params: IParams): URL {
  const buildUrl = new URL(url, base);
  Object.entries(params).forEach(([key, value]: [string, string]) => {
    if (value) buildUrl.searchParams.append(key, value.toString());
  });
  return buildUrl;
}
