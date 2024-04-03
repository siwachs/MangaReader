import Wrapper from "./Wrapper";

import { Info } from "@mui/icons-material";

const Information = ({ informationText }) => {
  return (
    <Wrapper title="Important information">
      <h3 className="mb-2.5 text-sm lg:mb-3 lg:text-base">
        <Info fontSize="inherit" /> {informationText}
      </h3>
    </Wrapper>
  );
};

export default Information;
