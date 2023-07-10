import { TextField } from "@mui/material";

import Wrapper from "./Wrapper";

const TextFieldComponent = ({
  dispatch,
  isMultiLine,
  rows,
  label,
  text,
  setText,
  textError,
  setTextError,
  errorText,
}) => {
  const handleText = (event) => {
    const value = event.target.value;

    if (value.trim() === "") {
      dispatch({ type: setTextError, value: true });
    } else {
      dispatch({ type: setTextError, value: false });
    }

    dispatch({
      type: setText,
      value: value,
    });
  };

  return (
    <Wrapper textInput>
      <TextField
        onBlur={() => {
          text.trim() === ""
            ? dispatch({ type: setTextError, value: true })
            : dispatch({ type: setTextError, value: false });
        }}
        multiline={isMultiLine}
        rows={isMultiLine ? rows : undefined}
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

export default TextFieldComponent;
