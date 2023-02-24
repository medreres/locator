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
import categories from "../data/categoriesId.json";

interface ISelectCategories {
  category: string[];
  setCategory: (value: string[]) => void;
}
export default function SelectCategories({ category, setCategory }: ISelectCategories) {
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
        options={Object.keys(categories)}
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
