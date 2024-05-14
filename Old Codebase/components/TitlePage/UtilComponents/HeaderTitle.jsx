import { Tooltip } from "@mui/material";

import { capitalizeText } from "@/lib/utils";

const HeaderTitle = ({ title, status }) => {
  return (
    <div className="flex justify-between py-2.5 sm:pt-[0.9375rem] lg:max-w-[700px] lg:items-center lg:justify-start lg:py-0">
      <Tooltip arrow title={capitalizeText(title)}>
        <span
          className="text-lg font-medium capitalize lg:mr-4 lg:text-xl"
          style={{ fontFamily: "Noto Sans SC" }}
        >
          {title}
        </span>
      </Tooltip>
      <div className="flex max-h-[1.5rem] items-center justify-center rounded-xl bg-[var(--bg-button)] px-[0.5625rem] pb-[0.25rem] pt-[0.1875rem] text-xs capitalize text-white lg:pb-[0.1875rem]">
        {status}
      </div>
    </div>
  );
};

export default HeaderTitle;
