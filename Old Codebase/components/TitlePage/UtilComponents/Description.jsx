import { useState } from "react";

import { ArrowDropDownCircle, Cancel } from "@mui/icons-material";

const Description = ({ description }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <div className="relative mt-1.5 overflow-hidden lg:mt-2">
      <div
        className={`desc mr-[0.9375rem] whitespace-pre-line text-xs font-normal leading-5 text-[var(--text-color-black)] dark:text-white sm:text-sm md:mr-4 md:text-[0.9375rem] lg:text-[var(--text-color-secondary)] ${
          !isShowMore ? "line-clamp-2" : ""
        }`}
      >
        <p>{description}</p>
      </div>

      <div className="showMore md:text-xl">
        {!isShowMore ? (
          <button
            onClick={() => setIsShowMore(true)}
            className="absolute bottom-0 right-0"
          >
            <ArrowDropDownCircle fontSize="inherit" style={{ color: "grey" }} />
          </button>
        ) : (
          <button
            onClick={() => setIsShowMore(false)}
            className="absolute bottom-0 right-0"
          >
            <Cancel fontSize="inherit" style={{ color: "grey" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Description;
