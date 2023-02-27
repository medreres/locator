import { Typography, Chip, Grid, CircularProgress } from "@mui/material";
import { Location } from "../interfaces/venue";
interface ILocations {
  location: Location | null;
  isPending: boolean;
}
export default function Locations({ location, isPending }: ILocations) {
  if (isPending)
    return (
      <CircularProgress
        sx={{ mt: 5 }}
        size="5em"
      />
    );

  return (
    <>
      {location != null && (
        <>
          {location?.result ? (
            <>
              <Typography
                my={2}
                variant="body1">
                It's seems that you are here
              </Typography>
              <Typography
                variant="h3"
                textAlign={"center"}>
                {location.result.name}
              </Typography>
            </>
          ) : (
            <Typography
              my={2}
              variant="body1">
              Couldn't find exact location
            </Typography>
          )}

          {location?.placesNearby && (
            <>
              <Typography
                my={2}
                variant="body2">
                Places nearby
              </Typography>
              <Grid
                container
                gap={1}
                justifyContent="center"
                width={"60vw"}>
                {location.placesNearby.map((place) => (
                  <Grid
                    item
                    key={place.fsq_id}>
                    <Chip
                      sx={{
                        textAlign: "center",
                      }}
                      label={
                        <span>
                          {place.name}
                          <br />
                          {place.distance}m
                        </span>
                      }
                      variant="outlined"
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </>
  );
}
