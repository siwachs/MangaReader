import { useState, useCallback } from "react";

import { TextField, Button } from "@mui/material";
import { Close } from "@mui/icons-material";

import Axios from "@/lib/axiosConfig";

import { debounce } from "lodash";

import useForm from "@/hooks/form_hook";
import { ADD_GENRE_ACTIONS } from "@/CONSTANTS";
import { transformText } from "@/lib/utils";

const initialInputs = {
  genreId: "",
  genreIdError: false,
  genreName: "",
  genreNameError: false,
};

const UploadGenre = ({ setUploadGenre }) => {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useForm(initialInputs, "addGenre");
  const { genreId, genreIdError, genreName, genreNameError } = state;

  const setError = (key, setErrorTo) => {
    if (key === "tagId") {
      dispatch({
        type: ADD_GENRE_ACTIONS.GENRE_ID_ERROR,
        isError: setErrorTo,
      });
    } else {
      dispatch({
        type: ADD_GENRE_ACTIONS.GENRE_NAME_ERROR,
        isError: setErrorTo,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateInput = useCallback(
    debounce((key, value) => {
      if (value === "") {
        setError(key, false);
        return;
      }

      Axios.get(`/api/tags/check?key=${key}&value=${value}`)
        .then((res) => {
          const { error, isAvail } = res.data;
          if (error || !isAvail) {
            setError(key, true);
          } else {
            setError(key, false);
          }
        })
        .catch((error) => {
          setError(key, true);
        });
    }, 500),
    []
  );

  const handleGenreId = (event) => {
    const value = event.target.value.trim();
    validateInput("tagId", value);
    dispatch({
      type: ADD_GENRE_ACTIONS.GENRE_ID,
      value,
    });
  };

  const handleGenreName = (event) => {
    const value = event.target.value;
    validateInput("tagName", transformText(value));
    dispatch({
      type: ADD_GENRE_ACTIONS.GENRE_NAME,
      value,
    });
  };

  const uploadGenreEvent = (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    Axios.post(`/api/tags`, {
      tagId: genreId,
      tagName: transformText(genreName),
    })
      .then((res) => {})
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
        dispatch({
          type: ADD_GENRE_ACTIONS.RESET,
          initialInputs,
        });
      });
  };

  const close = () => {
    dispatch({
      type: ADD_GENRE_ACTIONS.RESET,
      initialInputs,
    });
    setUploadGenre(false);
  };

  return (
    <div className="relative my-5 min-h-[100px] rounded-[8px] bg-white p-2 pt-8 dark:brightness-95">
      <form className="grid place-items-center gap-y-6">
        <TextField
          className="max-w-[500px]"
          fullWidth
          size="small"
          variant="outlined"
          label="Genre Id"
          value={genreId}
          onChange={handleGenreId}
          error={genreIdError}
          helperText={genreIdError ? "Genre Id must be unique." : undefined}
        />

        <TextField
          className="max-w-[500px]"
          fullWidth
          size="small"
          variant="outlined"
          label="Genre Name"
          value={genreName}
          onChange={handleGenreName}
          error={genreNameError}
          helperText={genreNameError ? "Genre name must be unique." : undefined}
        />

        <Button
          variant="outlined"
          type="submit"
          onClick={uploadGenreEvent}
          disabled={
            genreId === "" ||
            genreName === "" ||
            genreIdError ||
            genreNameError ||
            loading
          }
        >
          Add Genre
        </Button>
      </form>
      <Close
        onClick={close}
        className="absolute right-1 top-0 cursor-pointer dark:text-black"
      />
    </div>
  );
};

export default UploadGenre;
