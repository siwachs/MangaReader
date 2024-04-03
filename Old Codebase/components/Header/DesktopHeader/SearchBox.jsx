import { useState } from "react";

import { useRouter } from "next/router";

import { Search, Close } from "@mui/icons-material";

import { transformText } from "@/lib/utils";

const SearchBox = ({ setSearchMode }) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    router.push(
      searchInput.trim() === ""
        ? "/search"
        : `/search?keyword=${transformText(searchInput)}`
    );
    closeSearchBox();
  };

  const closeSearchBox = () => {
    setSearchInput("");
    setSearchMode(false);
  };

  return (
    <form
      onSubmit={searchHandler}
      className="flex h-[38px] max-w-[300px] items-center rounded-3xl border border-[var(--border-color-primary)] bg-white px-2 text-[var(--text-color-content)]"
    >
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="bg-transparent text-black outline-none"
        placeholder="Search Author or Content"
      />

      <button type="submit" onClick={searchHandler}>
        <Search />
      </button>

      <span className="mx-0.5">|</span>

      <button type="reset" onClick={closeSearchBox}>
        <Close />
      </button>
    </form>
  );
};

export default SearchBox;
