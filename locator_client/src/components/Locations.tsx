import { Typography, Stack, Chip, Grid } from "@mui/material";
import React from "react";
import { Location } from "../models/venue";
interface ILocations {
  location: Location | null;
}
export default function Locations({ location }: ILocations) {
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
                      label={place.name}
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
