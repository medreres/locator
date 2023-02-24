import {
  SelectChangeEvent,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  Theme,
  useTheme,
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { categories } from "../data/categories.json";

interface ISelectCategories {
  category: string[];
  setCategory: (value: string[]) => void;
}
export default function SelectCategories({ category, setCategory }: ISelectCategories) {
  //   const handleChange = (e) => {};
  return (
    <FormControl sx={{ width: 300 }}>
      <Autocomplete
        value={category}
        onChange={(_, newValue) => {
          setCategory(newValue);
        }}
        freeSolo
        multiple
        id="category-multiple-select"
        // disableClearable
        options={categories.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </FormControl>
  );
}
