"use client";

import { useState } from "react";

const ChaptersAndComments = () => {
  const [chaptersOrder, setChaptersOrder] = useState<"positive" | "reverse">(
    "positive",
  );
  const [menuType, setMenuType] = useState<"chapters" | "comments">("chapters");

  const menuTypeClasses =
    "inline-block w-1/3 select-none text-center text-xs/[40px] data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:border-b-2 data-[active=true]:border-[var(--app-text-color-red)] data-[active=false]:text-[var(--app-text-color-medium-gray)] data-[active=true]:text-[var(--app-text-color-red)] md:text-xl/[80px]";
  const chaptersOrderClasses =
    "font-noto-sans-sc select-none font-[400] data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:text-[var(--app-text-color-crimson)]";

  return (
    <div className="h-10 w-full max-w-[1200px] border-b border-black border-opacity-[0.2] md:h-20">
      <div className="float-left w-[35%]">
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
          className={`${menuTypeClasses}`}
        >
          <span>Chapters</span>
        </div>

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
          className={`${menuTypeClasses} ml-5`}
        >
          <span>Comments</span>
        </div>
      </div>

      <div className="float-right flex text-xs/[40px] text-[var(--app-text-color-slate-gray)] md:leading-[89px]">
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

        <span> &nbsp;/&nbsp; </span>

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
