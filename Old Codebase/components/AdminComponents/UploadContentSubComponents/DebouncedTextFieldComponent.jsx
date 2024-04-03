import { TextField } from "@mui/material";

import { transformText } from "@/lib/utils";

import Wrapper from "./Wrapper";

const DebouncedTextFieldComponent = ({
  checkUniqueness,
  dispatch,
  label,
  text,
  contentTitle,
  setText,
  textError,
  setTextError,
  errorText,
}) => {
  const handleText = (event) => {
    const value = event.target.value;

    if (value.trim() === "") {
      dispatch({
        type: setTextError,
        value: true,
      });
      checkUniqueness.cancel();
    } else if (transformText(value) === contentTitle) {
      dispatch({
        type: setTextError,
        value: false,
      });
      checkUniqueness.cancel();
    } else {
      checkUniqueness(transformText(value), setTextError);
    }

    dispatch({
      type: setText,
      value,
    });
  };

  return (
    <Wrapper textInput>
      <TextField
        onBlur={() => {
          textError || text.trim() === ""
            ? dispatch({ type: setTextError, value: true })
            : dispatch({ type: setTextError, value: false });
        }}
        fullWidth
        size="small"
        variant="outlined"
        label={label}
        value={text}
        onChange={handleText}
        error={textError}
        helperText={textError ? errorText : undefined}
        className="max-w-[500px]"
      />
    </Wrapper>
  );
};

export default DebouncedTextFieldComponent;
