import { useEffect, useState } from "react";

import {
  FormControl,
  Select,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Box,
  Chip,
} from "@mui/material";

import Axios from "@/lib/axiosConfig";

import Wrapper from "./Wrapper";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyle = (tagName, selectedGenres) => {
  return selectedGenres.indexOf(tagName) !== -1
    ? "font-semibold"
    : "font-normal";
};

const PickGenres = ({
  selectedGenres,
  dispatch,
  setSelectedGenres,
  setSelectedGenresId,
}) => {
  const [genreArray, setGenreArray] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await Axios.get("/api/tags");
      setGenreArray(genres.data);
    };

    fetchGenres();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    dispatch({
      type: setSelectedGenres,
      value,
    });

    dispatch({
      type: setSelectedGenresId,
      genreArray,
    });
  };

  return (
    <Wrapper selectField>
      <FormControl fullWidth className="max-w-[500px]">
        <InputLabel size="small">Genres</InputLabel>
        <Select
          size="small"
          multiple
          value={selectedGenres}
          onChange={handleChange}
          input={<OutlinedInput label="Genres" />}
          MenuProps={MenuProps}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} className="capitalize" />
              ))}
            </Box>
          )}
        >
          {genreArray.map((genre) => (
            <MenuItem
              className={`capitalize ${getStyle(
                genre?.tagName,
                selectedGenres
              )}`}
              key={genre?.tagId}
              value={genre?.tagName}
            >
              {genre?.tagName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Wrapper>
  );
};

export default PickGenres;
