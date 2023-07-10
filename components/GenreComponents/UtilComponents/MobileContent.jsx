import { Visibility } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

import numeral from "numeral";
import { capitalizeText } from "@/lib/utils";

const MobileContent = ({ title, episodeCount, genreArray, likes }) => {
  return (
    <div className="content-info ml-[4%] w-[60%] overflow-hidden lg:hidden">
      <Tooltip arrow title={capitalizeText(title)}>
        <div className="title one-line-text w-full text-lg font-bold capitalize text-[var(--text-color-black)] dark:text-white">
          <span>{title}</span>
        </div>
      </Tooltip>

      <div className="one-line-text mt-2.5 w-full text-xs capitalize leading-[1.875rem] text-[var(--text-color-content)] dark:text-gray-100 md:mb-2 md:text-sm">
        <span>{genreArray.join("/")}</span>
      </div>

      <div className="one-line-text w-full text-xs leading-6 text-[var(--text-color-content)] dark:text-gray-100 md:text-sm">
        Up to Ep.{episodeCount}
      </div>

      <div className="one-line-text mt-[1.875rem] flex items-center space-x-1 text-sm uppercase leading-6 text-[var(--text-color)] md:text-base">
        <Visibility fontSize="inherit" />
        <div>{numeral(likes).format("0.a")}</div>
      </div>
    </div>
  );
};

export default MobileContent;
