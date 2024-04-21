"use client";

import { ArrowDownCircle, CloseCircle } from "@/components/icons";
import { useState } from "react";

const DetailDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="detail-description relative flex overflow-scroll lg:mt-[5px]">
      <div
        className={`font-noto-sans-sc mr-[15px] ${!showAll && "line-clamp-2"} whitespace-pre-line break-all text-xs/[20px] font-normal text-[var(--app-text-color-dark-gray)] lg:max-w-[700px] lg:text-sm lg:text-[var(--app-text-color-slate-gray)]`}
      >
        <p>{description}</p>
      </div>

      <div className="absolute bottom-0 right-0 h-5 leading-4 lg:right-[150px]">
        {!showAll ? (
          <span onClick={() => setShowAll(true)} className="cursor-pointer">
            <ArrowDownCircle className="h-[13px] w-[13px] lg:h-5 lg:w-5" />
          </span>
        ) : (
          <span onClick={() => setShowAll(false)} className="cursor-pointer">
            <CloseCircle className="h-[13px] w-[13px] lg:h-5 lg:w-5" />
          </span>
        )}
      </div>
    </div>
  );
};

export default DetailDescription;
