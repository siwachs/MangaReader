"use client";

import { useState } from "react";

const ChaptersAndComments = () => {
  const [chaptersOrder, setChaptersOrder] = useState<"positive" | "reverse">(
    "positive",
  );
  const [menuType, setMenuType] = useState<"chapters" | "comments">("chapters");

  const menuTypeClasses =
    "inline-block w-1/3 select-none text-center text-xs/[40px] data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:border-b-2 data-[active=true]:border-[var(--app-text-color-red)] data-[active=false]:text-[var(--app-text-color-medium-gray)] data-[active=true]:text-[var(--app-text-color-red)] md:text-xl/[80px] md:border-none md:w-auto";
  const chaptersOrderClasses =
    "font-noto-sans-sc select-none font-[400] data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:text-[var(--app-text-color-crimson)] data-[active=false]:text-[var(--app-text-color-slate-gray)]";

  return (
    <div className="h-10 w-full max-w-[1200px] border-b border-black border-opacity-[0.2] md:h-20">
      <div className="float-left w-[35%] md:w-auto">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setMenuType("chapters")}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              setMenuType("chapters");
            }
          }}
          data-active={menuType === "chapters"}
          className={`${menuTypeClasses} md:pr-2.5`}
        >
          <span>Chapters</span>
        </div>

        <span className="font-noto-sans-sc hidden text-sm/[16px] text-[var(--app-text-color-slate-gray)] md:inline-block">
          Updated to Chapter 140
        </span>

        <span className="mx-3.5 hidden md:inline-block">/</span>

        <div
          role="button"
          tabIndex={0}
          onClick={() => setMenuType("comments")}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              setMenuType("comments");
            }
          }}
          data-active={menuType === "comments"}
          className={`${menuTypeClasses} ml-5 md:ml-0 md:pr-2.5`}
        >
          <span>Comments</span>
        </div>

        <span className="font-noto-sans-sc hidden text-sm/[16px] text-[var(--app-text-color-slate-gray)] md:inline-block">
          (5772)
        </span>
      </div>

      <div className="float-right flex gap-[5px] text-xs/[40px] md:text-sm/[89px]">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setChaptersOrder("positive")}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              setChaptersOrder("positive");
            }
          }}
          data-active={chaptersOrder === "positive"}
          className={chaptersOrderClasses}
        >
          <span>Positive</span>
        </div>

        <span>/</span>

        <div
          role="button"
          tabIndex={0}
          onClick={() => setChaptersOrder("reverse")}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              setChaptersOrder("reverse");
            }
          }}
          data-active={chaptersOrder === "reverse"}
          className={chaptersOrderClasses}
        >
          <span>Reverse</span>
        </div>
      </div>
    </div>
  );
};

export default ChaptersAndComments;
