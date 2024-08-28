"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

import { DEBOUNCED_DELAY } from "@/constants";
import { BiSearchAlt } from "react-icons/bi";

const SearchBar: React.FC<{ word?: string }> = ({ word }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(word ?? "");

  const search = () => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) return router.push(`/search?word=${trimmedKeyword}`);

    router.push("/search");
  };

  const cancelDebounce = useDebounce(search, [keyword], DEBOUNCED_DELAY);

  const sumbitKeyword = (e: React.FormEvent) => {
    e.preventDefault();

    cancelDebounce();
    search();
  };

  const changeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value),
    [],
  );

  return (
    <div className="flex h-[100px] w-full items-center justify-center overflow-hidden md:mt-[120px] md:h-[150px]">
      <div className="box-content h-[33px] w-[90%] rounded-full border border-[var(--app-text-color-red)] bg-gray-100 md:h-[45px] md:w-[590px] md:border-2">
        <form
          onSubmit={sumbitKeyword}
          className="flex h-full w-full items-center justify-between rounded-full"
        >
          <input
            value={keyword}
            onChange={changeKeyword}
            type="text"
            placeholder="Enter manga names"
            className="ml-[11px] w-[85%] border-none bg-transparent font-sans text-xs outline-none placeholder:text-gray-500 md:ml-[17px] md:w-[90%] md:text-sm"
          />

          <button
            type="submit"
            className="flex h-full min-w-[55px] flex-shrink-0 items-center justify-center gap-1 rounded-[20px] bg-[var(--app-text-color-red)] px-3 text-xs text-white md:gap-2 md:rounded-full md:px-5 md:text-base"
          >
            <BiSearchAlt className="size-[14px] md:size-5" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
