import { Visibility, ThumbUp, Star, BorderColor } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

import numeral from "numeral";

const Stats = ({ rating, likes, views }) => {
  return (
    <div className="flex items-center text-sm text-[var(--text-color-stats)] dark:text-gray-100 sm:text-base lg:block lg:max-w-[700px] lg:text-[1.03125rem] lg:text-[var(--text-color-black-secondary)]">
      <Visibility
        fontSize="inherit"
        className="-mt-[0.125rem] mr-[0.15625rem] text-[var(--text-color-darkred)] md:mr-[0.1875rem]"
      />
      <span className="uppercase">{numeral(views).format("0.a")}</span>
      <ThumbUp
        fontSize="inherit"
        className="-mt-[0.125rem] ml-[0.65625rem] mr-[0.15625rem] text-[var(--text-color-darkred)] md:ml-[0.71875rem] md:mr-[0.1875rem] lg:ml-5"
      />
      <span className="uppercase">{numeral(likes).format("0.a")}</span>

      <div className="rating -mt-[0.125rem] ml-[0.65625rem] flex items-center overflow-hidden text-lg text-[var(--text-color-stats)] lg:ml-0 lg:mt-2.5 lg:text-xl">
        {[...new Array(5)].map((item, index) => (
          <Star
            key={index}
            fontSize="inherit"
            className="mr-[0.125rem] text-[var(--text-color-yellow)]"
          />
        ))}
        <span className="-mb-[0.0625rem] ml-[0.25rem] mr-[0.125rem] mt-[0.0625rem] text-sm dark:text-gray-100 sm:text-base md:text-base lg:ml-[0.3125rem] lg:text-lg">
          {rating}
        </span>
        <Tooltip arrow title="Rate">
          <span className="-mt-[0.125rem] ml-2.5 cursor-pointer text-sm text-[var(--border-color-arrow)] sm:text-[0.9375rem] md:text-base lg:-mt-[0.3125rem] lg:text-lg">
            <BorderColor fontSize="inherit" />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default Stats;
