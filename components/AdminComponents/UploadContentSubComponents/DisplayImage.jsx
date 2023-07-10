import { useRef } from "react";

import Wrapper from "./Wrapper";

import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { UploadFile, Close } from "@mui/icons-material";

const DisplayImage = ({
  title,
  displayImage,
  type,
  setType,
  dispatch,
  setImage,
}) => {
  const imagePickerRef = useRef(null);

  const storeImage = (event) => {
    const image = event.target.files[0];

    if (image.type.split("/")[0] === "image") {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = (loadedImage) => {
        dispatch({
          type: setImage,
          image: loadedImage.target.result,
        });
      };
    }
  };

  const handleChange = (event) => {
    dispatch({
      type: setType,
      value: event.target.value,
    });
  };

  return (
    <Wrapper title={title}>
      <div className="mx-auto mb-2.5 mt-1.5 max-w-[500px]">
        {displayImage ? (
          <>
            <div className="relative">
              <Close
                fontSize="large"
                className="absolute right-1 top-0 cursor-pointer text-white dark:text-black"
                onClick={() =>
                  dispatch({
                    type: setImage,
                    image: null,
                  })
                }
              />
              <img
                src={displayImage}
                alt="image"
                className="my-2.5 h-auto max-w-full rounded-[4px]"
              />
            </div>

            <FormControl>
              <FormLabel>Image Type</FormLabel>
              <RadioGroup
                row
                name="controlled-radio-buttons-group"
                value={type}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="thumbnail"
                  control={<Radio size="small" />}
                  label="Thumbnail"
                />
                <FormControlLabel
                  value="poster"
                  control={<Radio size="small" />}
                  label="Poster"
                />
              </RadioGroup>
            </FormControl>
          </>
        ) : (
          <Button
            onClick={() => imagePickerRef.current.click()}
            variant="outlined"
            endIcon={<UploadFile />}
            fullWidth
          >
            <input
              ref={imagePickerRef}
              type="file"
              onChange={storeImage}
              accept="image/*"
              hidden
            />
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default DisplayImage;
