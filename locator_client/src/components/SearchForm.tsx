import { Button, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { getLocation } from "../api/location";
import { IParams } from "../interfaces/venue";
import { formatCategories } from "../util/formatCategories";
import SelectCategories from "./SelectCategories";

interface ISearchForm {
  setLocation: (result: any) => void;
}
export default function SearchForm({ setLocation }: ISearchForm) {
  const latRef = useRef<HTMLInputElement>(null);
  const limitRef = useRef<HTMLInputElement>(null);
  const radiusRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const handleRequest = (e: any) => {
    e.preventDefault();

    const ll = latRef.current!.value;
    const [lat, long] = ll.split(",").map((value) => value.trim());
    const limit = limitRef.current!.value;
    const radius = radiusRef.current!.value;
    const categoriesId: string = formatCategories(categories);

    const params: IParams = {
      latitude: lat,
      longitude: long,
      limit: limit,
      radius: radius,
      categories: categoriesId,
    };
    getLocation(params).then((result) => setLocation(result));
  };

  return (
    <Stack
      direction="column"
      gap={2}
      maxWidth="300px"
      onSubmit={handleRequest}
      component="form">
      <TextField
        required
        defaultValue={"49.807416209212136, 23.978051904925795"}
        inputRef={latRef}
        label="Latitute, Longitutde"
        type="text"
      />
      <TextField
        required
        inputRef={limitRef}
        inputProps={{
          max: 50,
          min: 1,
          defaultValue: 10,
        }}
        label="Limit"
        type="number"
      />
      <TextField
        required
        inputRef={radiusRef}
        inputProps={{
          max: 3000,
          min: 30,
          defaultValue: 100,
        }}
        label="Starting radius"
        type="number"
      />
      <SelectCategories
        category={categories}
        setCategory={setCategories}
      />
      <Button
        type="submit"
        variant="outlined">
        Get Location
      </Button>
    </Stack>
  );
}
