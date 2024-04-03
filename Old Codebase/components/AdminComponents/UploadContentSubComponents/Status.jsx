import Wrapper from "./Wrapper";

import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

const Status = ({ status, dispatch, setStatus }) => {
  const handleSelection = (event) => {
    dispatch({
      type: setStatus,
      value: event.target.value,
    });
  };

  return (
    <Wrapper selectField>
      <FormControl fullWidth className="max-w-[500px]">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          size="small"
          value={status}
          label="Status"
          onChange={handleSelection}
        >
          <MenuItem value="ongoing">Ongoing</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="unscheduled">Unscheduled</MenuItem>
          <MenuItem value="discontinued">Discontinued</MenuItem>
        </Select>
      </FormControl>
    </Wrapper>
  );
};

export default Status;
