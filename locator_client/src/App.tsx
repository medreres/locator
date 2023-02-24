import { Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Suspense, useRef, useState } from "react";
import { getLocation } from "./api/location";
import Locations from "./components/Locations";
import { Location } from "./models/venue";

function App() {
  const latRef = useRef<HTMLInputElement>(null);
  const limitRef = useRef<HTMLInputElement>(null);
  const radiustRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState<Location | null>(null);

  const handleRequest = (e: any) => {
    e.preventDefault();

    const ll = latRef.current!.value;
    const [lat, long] = ll.split(",").map((value) => value.trim());
    const limit = limitRef.current!.value;
    const radius = radiustRef.current!.value;

    getLocation(lat, long, +radius, +limit).then((result) => setLocation(result));
  };

  return (
    <Box
      onSubmit={handleRequest}
      component="form"
      width="100vw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={5}>
      <Stack
        direction="column"
        gap={2}
        maxWidth="300px">
        <TextField
          required
          inputRef={latRef}
          label="Latitute, Longtitude"
          type="text"
        />
        <TextField
          required
          inputRef={limitRef}
          inputProps={{
            max: 50,
            min: 1,
            defaultValue: 25,
          }}
          label="Limit"
          type="number"
        />
        <TextField
          required
          inputRef={radiustRef}
          inputProps={{
            max: 5000,
            min: 30,
            defaultValue: 200,
          }}
          label="Radius"
          type="number"
        />
        <Button
          type="submit"
          variant="outlined">
          Get Location
        </Button>
      </Stack>
      <Locations location={location} />
    </Box>
  );
}

export default App;
