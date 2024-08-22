"use client";

import { useState } from "react";

import { ChevronDown } from "@/components/icons";

const Description: React.FC<{ description: string; mobileOnly?: boolean }> = ({
  description,
  mobileOnly,
}) => {
  const [seeAll, setSeeAll] = useState(false);

  return mobileOnly ? (
    <div className="relative">
      <p
        className={`${seeAll ? "" : "line-clamp-3"} whitespace-pre-line break-words text-[13px]/[18px] font-normal`}
      >
        {description}
      </p>

      <span
        className="absolute bottom-0 right-0 cursor-pointer bg-white text-gray-500/70"
        role="button"
        tabIndex={0}
        onClick={() => setSeeAll((prev) => !prev)}
        onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
          if (e.key === "Enter") {
            setSeeAll((prev) => !prev);
          }
        }}
      >
        <ChevronDown
          className={`h-4 w-4 ${seeAll ? "-rotate-180" : ""}`}
          strokeWidth={2.6}
        />
      </span>
    </div>
  ) : (
    <div className="relative hidden max-w-[800px] md:block">
      <p
        className={`lg:font-noto-sans-sc ${seeAll ? "" : "line-clamp-5"} whitespace-pre-line break-words text-sm font-normal lg:text-neutral-400`}
      >
        {description}
      </p>

      <span
        className="absolute bottom-1 right-0 rounded-[100px] bg-[var(--app-text-color-medium-gray)] text-white"
        role="button"
        tabIndex={0}
        onClick={() => setSeeAll((prev) => !prev)}
        onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
          if (e.key === "Enter") {
            setSeeAll((prev) => !prev);
          }
        }}
      >
        <ChevronDown
          className={`h-4 w-4 ${seeAll ? "-rotate-180" : ""}`}
          strokeWidth={2.6}
        />
      </span>
    </div>
  );
};

export default Description;
