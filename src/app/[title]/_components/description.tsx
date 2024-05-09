"use client";

import { useState } from "react";

import { ChevronDown } from "@/components/icons";

const Description: React.FC<{ description: string }> = ({ description }) => {
  const [seeAll, setSeeAll] = useState(false);

  return (
    <div className="relative hidden max-w-[800px] md:block">
      <p
        className={`lg:font-noto-sans-sc ${seeAll ? "" : "line-clamp-5"} whitespace-pre-line break-words text-sm font-[400] lg:text-[var(--app-text-color-slate-gray)]`}
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
        <ChevronDown className="h-4 w-4" strokeWidth={2.6} />
      </span>
    </div>
  );
};

export default Description;
