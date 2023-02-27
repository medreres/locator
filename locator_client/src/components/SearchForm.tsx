import { Button, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { getLocation } from "../api/location";
import { IParams } from "../interfaces/venue";
import { formatCategories } from "../util/formatCategories";
import SelectCategories from "./SelectCategories";

interface ISearchForm {
  setLocation: (result: any) => void;
  setIsPending: (flag: boolean) => void;
  isPending: boolean;
}
export default function SearchForm({ setLocation, setIsPending, isPending }: ISearchForm) {
  const latRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const handleRequest = (e: any) => {
    e.preventDefault();

    setIsPending(true);

    const ll = latRef.current!.value;
    const [lat, long] = ll.split(",").map((value) => value.trim());
    const categoriesId: string = formatCategories(categories);

    const params: IParams = {
      latitude: lat,
      longitude: long,
      categories: categoriesId,
    };
    getLocation(params).then((result) => {
      setLocation(result);
      setIsPending(false);
    });
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
      <SelectCategories
        category={categories}
        setCategory={setCategories}
      />
      <Button
        disabled={isPending}
        type="submit"
        variant="outlined">
        Get Location
      </Button>
    </Stack>
  );
}
