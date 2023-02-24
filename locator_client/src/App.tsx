import { Button, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useRef, useState } from "react";
import { getLocation } from "./api/location";
import Locations from "./components/Locations";
import SearchForm from "./components/SearchForm";
import SelectCategories from "./components/SelectCategories";
import { Location } from "./models/venue";

function App() {
  const [location, setLocation] = useState<Location | null>(null);

  return (
    <Box
      width="100vw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={5}>
      <SearchForm setLocation={setLocation} />
      <Locations location={location} />
    </Box>
  );
}

export default App;
