"use client";

import { ArrowDownCircle, CloseCircle } from "@/components/icons";
import { useState } from "react";

const DetailDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  return (
    <div className="detail-description relative flex lg:mt-[5px]">
      <div
        className={`font-noto-sans-sc mr-[15px] font-normal ${!showAll && "line-clamp-2"} max-w-[700px] whitespace-pre-line break-all text-xs/[20px] font-normal md:text-sm md:text-neutral-400`}
      >
        <p>{description}</p>
      </div>

      <div className="absolute bottom-0 right-0 h-[18px] leading-[18px] lg:right-[150px]">
        {!showAll ? (
          <button onClick={() => setShowAll(true)} className="cursor-pointer">
            <ArrowDownCircle className="h-[13px] w-[13px] md:h-5 md:w-5" />
          </button>
        ) : (
          <button onClick={() => setShowAll(false)} className="cursor-pointer">
            <CloseCircle className="h-[13px] w-[13px] md:h-5 md:w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailDescription;
