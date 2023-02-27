import { Box } from "@mui/system";
import { useState } from "react";
import Locations from "./components/Locations";
import SearchForm from "./components/SearchForm";
import { Location } from "./interfaces/venue";

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
