"use client";

import { ArrowDownCircle, CloseCircle } from "@/components/icons";
import { useState } from "react";

const DetailDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="detail-description relative flex overflow-hidden">
      <div
        style={{ fontFamily: "Noto Sans SC" }}
        className={`mr-[15px] ${!showAll && "line-clamp-2"} whitespace-pre-line break-all text-xs/[20px] font-normal text-[var(--app-text-color-dark-gray)] lg:w-[700px] lg:text-sm lg:text-[var(--app-text-color-slate-gray)]`}
      >
        <p>{description}</p>
      </div>

      <div className="absolute bottom-0 right-0 h-[18px] leading-4 lg:right-[150px]">
        {!showAll ? (
          <span onClick={() => setShowAll(true)} className="cursor-pointer">
            <ArrowDownCircle className="h-[13px] w-[13px] lg:h-[18px] lg:w-[18px]" />
          </span>
        ) : (
          <span onClick={() => setShowAll(false)} className="cursor-pointer">
            <CloseCircle className="h-[13px] w-[13px] lg:h-[18px] lg:w-[18px]" />
          </span>
        )}
      </div>
    </div>
  );
};

export default DetailDescription;
