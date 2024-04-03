import Wrapper from "./Wrapper";

import { FormGroup, Checkbox, FormControlLabel } from "@mui/material";

const LablesAndNames = [
  {
    label: "Top Internet Search",
    name: "topInternetSearch",
  },
  {
    label: "Mass Update",
    name: "massUpdate",
  },
  {
    label: "Trending",
    name: "trending",
  },
  {
    label: "Recommended",
    name: "recommended",
  },
  {
    label: "Slider Slide",
    name: "sliderSlide",
  },
];

const ContentType = ({ contentType, dispatch, setContentType }) => {
  const handleChange = (event) => {
    const { checked, name } = event.target;
    dispatch({
      type: setContentType,
      checked,
      name,
      contentType,
    });
  };

  return (
    <Wrapper title="Content Type">
      <FormGroup className="grid-cols-2 sm:grid lg:grid-cols-3">
        {LablesAndNames.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                name={item.name}
                onChange={handleChange}
                checked={contentType.includes(item.name)}
              />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
    </Wrapper>
  );
};

export default ContentType;
