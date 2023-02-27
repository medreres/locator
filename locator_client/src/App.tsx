import { Box } from "@mui/system";
import { useState } from "react";
import Locations from "./components/Locations";
import SearchForm from "./components/SearchForm";
import { Location } from "./interfaces/venue";

function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [isPending, setIsPending] = useState(false);

  return (
    <Box
      width="100vw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent={"center"}
      pt={5}>
      <SearchForm
        isPending={isPending}
        setIsPending={setIsPending}
        setLocation={setLocation}
      />
      <Locations
        isPending={isPending}
        location={location}
      />
    </Box>
  );
}

export default App;
