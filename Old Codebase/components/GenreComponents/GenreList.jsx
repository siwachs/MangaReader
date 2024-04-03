import Link from "next/link";

const GenreList = ({ genres, tagId }) => {
  return (
    <div className="w-full overflow-hidden border-b border-[var(--border-color-primary)] bg-[var(--bg-genre)] dark:border-gray-200 dark:bg-gray-900 lg:border-none">
      <div className="my-2.5 ml-5 w-full max-w-[1200px] lg:mx-auto lg:my-0 lg:pb-5">
        <div className="flex items-center justify-between overflow-hidden lg:mb-[0.9375rem] lg:items-start lg:justify-start">
          <div className="my-[0.3125rem] w-[3.125rem] py-[0.3125rem] text-sm text-[var(--text-color-gray)] dark:text-white md:text-base lg:mr-[3.125rem] lg:text-lg">
            <span>Genres</span>
          </div>

          {/* GenreList... */}
          <div className="hide-scrollbar flex w-[85%] max-w-[1060px] overflow-x-auto pr-16 lg:block lg:w-full lg:pr-0">
            {genres.map((item) => (
              <Link key={item.tagId} href={`/genre/tags/${item.tagId}`}>
                <div
                  className={`m-1.5 whitespace-nowrap py-1 text-sm capitalize sm:mx-2 md:text-base lg:mr-5 lg:inline-block ${
                    item.tagId === tagId
                      ? "rounded-xl bg-[var(--text-color)] px-2.5 text-white lg:rounded-2xl lg:px-5"
                      : "text-[var(--text-color-black)] dark:text-white"
                  }`}
                >
                  <span>{item.tagName}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreList;
