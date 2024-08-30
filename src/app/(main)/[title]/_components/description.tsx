"use client";

import { useState } from "react";

import { FaChevronDown } from "react-icons/fa6";

const Description: React.FC<{ description: string; mobileOnly?: boolean }> = ({
  description,
  mobileOnly,
}) => {
  const [seeAll, setSeeAll] = useState(false);

  const toogleSeeAll = () => setSeeAll((prev) => !prev);
  const toogleButtonAriaLabel = seeAll
    ? "Collapse Description"
    : "Expand Description";

  return (
    <div
      className={`relative max-w-[800px] ${mobileOnly ? "md:hidden" : "hidden md:block"}`}
    >
      <p
        className={`lg:font-noto-sans-sc ${seeAll ? "" : "line-clamp-3"} g:text-neutral-400 whitespace-pre-line break-words text-[13px]/[18px] font-normal md:text-sm`}
      >
        {description}
      </p>

      <button
        aria-label={toogleButtonAriaLabel}
        onClick={toogleSeeAll}
        className="absolute bottom-1 right-0 flex items-center justify-center text-gray-500/70 md:size-4 md:rounded-full md:bg-gray-500/70 md:text-white"
      >
        <FaChevronDown
          className={`size-[15px] md:size-3 ${seeAll ? "-rotate-180" : ""}`}
        />
      </button>
    </div>
  );
};

export default Description;
