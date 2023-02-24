import { IParams } from "../api/location";

export function buildUrl(url: string, base: string, params: IParams): URL {
  const buildUrl = new URL(url, base);
  Object.entries(params).forEach(([key, value]: [string, string | string[]]) => {
    if (!value) return;

    if (Array.isArray(value)) return buildUrl.searchParams.append(key, value.join(","));

    buildUrl.searchParams.append(key, value.toString());
  });
  return buildUrl;
}
