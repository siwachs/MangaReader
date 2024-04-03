import { useState, useCallback } from "react";

import { useRouter } from "next/router";

import { Search } from "@mui/icons-material";

import Axios from "@/lib/axiosConfig";
import { getRecommended, transformText } from "@/lib/utils";

import { debounce } from "lodash";

import SearchResultes from "../components/SearchResults/SearchResultes";
import RecommendedForYou from "../components/SearchResults/RecommendedForYou";

const SearchPage = ({ keyword, recommended, searchResultes }) => {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value === "") return;
      router.push(`/search?keyword=${transformText(value)}`);
    }, 200),
    []
  );

  const searchHandler = (event) => {
    event.preventDefault();
    debouncedSearch.cancel();
    if (searchInput.trim() === "") return;
    router.push(`/search?keyword=${transformText(searchInput)}`);
  };

  const changeSearchQuery = (event) => {
    const value = event.target.value;
    debouncedSearch(value);
    setSearchInput(value);
  };

  return (
    <main>
      <div className="flex h-[6.25rem] w-full items-center justify-center overflow-hidden bg-[var(--bg-searchbox)] dark:bg-gray-900 lg:h-[9.375rem]">
        <form
          onSubmit={searchHandler}
          style={{ fontFamily: "sans-serif" }}
          className="flex h-[2.25rem] w-[80%] max-w-[37.5rem] items-center rounded-full border border-[var(--border-color-searchbox)] bg-white lg:h-[2.8125rem]"
        >
          <input
            value={searchInput}
            className="ml-3.5 flex-1 bg-white text-black outline-none lg:text-lg"
            onChange={changeSearchQuery}
            placeholder="Live Search Content or Author"
          />
          <button
            className="mr-3 text-2xl text-black lg:text-3xl"
            type="submit"
          >
            <Search fontSize="inherit" />
          </button>
        </form>
      </div>

      <div className="mx-[5%] w-[90%] lg:mx-0 lg:w-full">
        <div className="m-auto w-full max-w-[1200px]">
          {keyword ? (
            <>
              <SearchResultes
                title="Comics/Manga"
                keyword={keyword}
                content={searchResultes}
              />

              <SearchResultes title="Novels" keyword={keyword} content={[]} />
            </>
          ) : (
            <div
              className="py-[2.1875rem] text-center text-lg font-[400] leading-9 text-[var(--text-color-secondary)] md:py-[8.125rem] lg:text-2xl"
              style={{ fontFamily: "Noto Sans SC" }}
            >
              search for content, enter content names or enter the author name
            </div>
          )}
        </div>
      </div>

      <RecommendedForYou recommended={recommended} />
    </main>
  );
};

export async function getServerSideProps(context) {
  const fetchedData = {
    keyword: context.query.keyword || "",
    searchResultes: [],
    recommended: [],
  };

  try {
    if (fetchedData.keyword) {
      const searchResultes = await Axios.get(`/api/search`, {
        params: {
          keyword: fetchedData.keyword,
          selectedFields: "displayImagePoster,title,populatedTags",
        },
      });
      fetchedData.searchResultes = searchResultes.data;
    }

    fetchedData.recommended = await getRecommended();
  } catch (error) {}

  return {
    props: {
      title: "M Reader | Search",
      ...fetchedData,
    },
  };
}

export default SearchPage;
