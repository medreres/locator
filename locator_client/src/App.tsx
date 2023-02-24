import { Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Suspense, useRef, useState } from "react";
import { getLocation } from "./api/location";
import Locations from "./components/Locations";
import { Location } from "./models/venue";

function App() {
  const latRef = useRef<HTMLInputElement>(null);
  // const longRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState<Location | null>(null);

  const handleRequest = () => {
    const ll = latRef.current!.value;
    const [lat, long] = ll.split(",").map((value) => value.trim());
    // console.log("lat", lat);
    // console.log('long', long)
    // const long = longRef.current!.value;

    getLocation(lat, long).then(result => setLocation(result))
  };

  return (
    <Box
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
          inputRef={latRef}
          label="Latitute, Longtitude"
          type="text"
        />
        {/* <TextField inputRef={longRef} label='Longtitude' type='number' /> */}
        <Button
          onClick={handleRequest}
          variant="outlined">
          Get Location
        </Button>
      </Stack>
      <Locations location={location} />
    </Box>
  );
}

export default App;
