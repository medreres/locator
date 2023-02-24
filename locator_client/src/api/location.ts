export const getLocation = async (lat: string, long: string, radius: number, limit: number) => {
  const params = new URLSearchParams({
    longtitude: long,
    latitude: lat,
    limit: limit.toString(),
    radius: radius.toString()
  });

  const url = new URL("http://localhost:3173/location");
  url.search = params.toString();

  return fetch(url.toString())
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.log(err));
};
