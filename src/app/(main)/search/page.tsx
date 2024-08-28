import TabNavigation from "@/components/tabNavigation";
import SearchBar from "./_components/searchBar";

import ErrorMessage from "@/components/messages/errorMessage";
import NoResults from "./_components/noResults";
import HaveResults from "./_components/haveResults";
import Pagination from "@/components/buttons/pagination";
import RecommendedForYou from "@/components/recommendedForYou";

import getContentList from "@/libs/dbCRUD/getContentList";

type SearchPageReqObj = {
  params: {};
  searchParams: { word?: string; page?: string };
};

export default async function SearchPage(req: Readonly<SearchPageReqObj>) {
  const { word: wordParam, page: pageParam } = req.searchParams;

  const word = wordParam ? decodeURI(wordParam) : undefined;
  const page = parseInt(decodeURI(pageParam ?? "1"));

  const searchResultResponse = word
    ? await getContentList({ filterBy: "word", word }, page)
    : {
        error: false,
        errorMessage: undefined,
        totalPages: 1,
        contentList: [],
      };
  const { error, errorMessage, totalPages, contentList } = searchResultResponse;

  return (
    <>
      <TabNavigation />
      <div className="search-page-wrapper">
        <SearchBar word={word} />

        <div className="search-page mx-[5%] w-[90%] max-w-[1200px] md:mx-auto md:w-full">
          {error && (
            <ErrorMessage>{`Unable to load search results because ${errorMessage}`}</ErrorMessage>
          )}

          {word && contentList.length > 0 && (
            <>
              <HaveResults
                title="Manga|Comics"
                contentList={contentList}
                word={word}
              />

              <Pagination
                lastPageAriaDisabled={page <= 1}
                lastPageLink={`/search?word=${word}&page=${page - 1}`}
                nextPageAriaDisabled={page >= totalPages}
                nextPageLink={`/search?word=${word}&page=${page + 1}`}
              />
            </>
          )}

          {word && contentList.length === 0 && <NoResults />}

          <RecommendedForYou />
        </div>
      </div>
    </>
  );
}
