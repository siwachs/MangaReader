"use client";

import { useState } from "react";

const ChaptersAndComments = () => {
  const [chaptersOrder, setChaptersOrder] = useState<"positive" | "reverse">(
    "positive",
  );
  const [menuType, setMenuType] = useState<"chapters" | "comments">("chapters");

  const menuButtonClasses =
    "inline-block h-10 w-1/3 text-center text-xs/[40px] data-[active=true]:border-b-2 data-[active=true]:border-[var(--app-text-color-crimson)] data-[active=false]:text-[var(--app-text-color-medium-gray)] data-[active=true]:text-[var(--app-text-color-crimson)] lg:text-lg/[80px] lg:h-20";

  return (
    <div className="mx-auto h-10 w-full max-w-[1200px] border-b border-black border-opacity-20 lg:h-20">
      <div className="float-left w-[35%]">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              setMenuType("chapters");
            }
          }}
          data-active={menuType === "chapters"}
          onClick={() => setMenuType("chapters")}
          className={`${menuButtonClasses} lg:pr-2.5`}
        >
          <span>Chapters</span>
        </div>

        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              setMenuType("comments");
            }
          }}
          data-active={menuType === "comments"}
          onClick={() => setMenuType("comments")}
          className={`${menuButtonClasses} ml-5`}
        >
          <span>Comments</span>
        </div>
      </div>

      <div className="float-right flex gap-1.5 text-xs/[40px] text-[var(--app-text-color-medium-gray)] lg:text-lg/[89px]">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              setChaptersOrder("positive");
            }
          }}
          data-active={chaptersOrder === "positive"}
          onClick={() => setChaptersOrder("positive")}
          className="data-[active=true]:text-[var(--app-text-color-crimson)]"
        >
          <span>Positive</span>
        </div>

        <span>/</span>

        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              setChaptersOrder("reverse");
            }
          }}
          data-active={chaptersOrder === "reverse"}
          onClick={() => setChaptersOrder("reverse")}
          className="data-[active=true]:text-[var(--app-text-color-crimson)]"
        >
          <span>Reverse</span>
        </div>
      </div>
    </div>
  );
};

export default ChaptersAndComments;
