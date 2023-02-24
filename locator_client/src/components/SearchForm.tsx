import { Button, Stack, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { getLocation, IParams } from "../api/location";
import SelectCategories from "./SelectCategories";

interface ISearchForm {
  setLocation: (result: any) => void;
}
export default function SearchForm({ setLocation }: ISearchForm) {
  const latRef = useRef<HTMLInputElement>(null);
  const limitRef = useRef<HTMLInputElement>(null);
  const radiustRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<string[]>([]);

  const handleRequest = (e: any) => {
    e.preventDefault();

    const ll = latRef.current!.value;
    const [lat, long] = ll.split(",").map((value) => value.trim());
    const limit = limitRef.current!.value;
    const radius = radiustRef.current!.value;

    const params: IParams = {
      latitude: lat,
      longtitude: long,
      limit: +limit,
      radius: +radius,
      category,
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
          max: 3000,
          min: 30,
          defaultValue: 200,
        }}
        label="Radius"
        type="number"
      />
      <SelectCategories
        category={category}
        setCategory={setCategory}
      />
      <Button
        type="submit"
        variant="outlined">
        Get Location
      </Button>
    </Stack>
  );
}
