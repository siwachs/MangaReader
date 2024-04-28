import {
  Like,
  CommentSolid,
  Share,
  Bookmark,
  BookOpen,
} from "@/components/icons";
import { Chapter } from "../_types";

const menuTypeClasses =
  "inline-block h-10 w-1/3 select-none text-center text-xs/[40px] text-[var(--app-text-color-medium-gray)] md:h-20 md:w-auto md:border-none md:text-xl/[80px]";
const chaptersOrderClasses = "font-noto-sans-sc select-none font-[400]";

const ChaptersAndCommentsLoading: React.FC<{ chapters: Chapter[] }> = ({
  chapters,
}) => {
  return (
    <>
      <div className="menu-wrapper mx-[5%] w-[90%] max-w-[1200px] animate-pulse md:mx-auto md:w-full">
        <div className="h-10 w-full max-w-[1200px] border-b border-black border-opacity-[0.2] md:h-20">
          <div className="float-left w-[35%] md:w-auto">
            <div
              className={`${menuTypeClasses} border-b-2 border-[var(--app-text-color-red)] text-[var(--app-text-color-red)] md:pr-2.5`}
            >
              <span>Chapters</span>
            </div>

            <span className="font-noto-sans-sc hidden text-sm/[16px] text-[var(--app-text-color-slate-gray)] md:inline-block">
              Updated to Chapter ...
            </span>

            <span className="mx-3.5 hidden md:inline-block">/</span>

            <div className={`${menuTypeClasses} ml-5 md:ml-0 md:pr-2.5`}>
              <span>Comments</span>
            </div>

            <span className="font-noto-sans-sc hidden text-sm/[16px] text-[var(--app-text-color-slate-gray)] md:inline-block">
              (12)
            </span>
          </div>

          <div className="float-right flex gap-[5px] text-xs/[40px] text-[var(--app-text-color-slate-gray)] md:text-sm/[89px]">
            <div
              className={`${chaptersOrderClasses} text-[var(--app-text-color-crimson)]`}
            >
              <span>Positive</span>
            </div>

            <span>/</span>

            <div className={chaptersOrderClasses}>
              <span>Reverse</span>
            </div>
          </div>
        </div>

        <div className="font-noto-sans-sc float-left my-1 w-[90%] text-xs font-[400] text-[var(--app-text-color-slate-gray)] md:hidden">
          <span>Updated to Chapter ...</span>
        </div>
      </div>

      <div className="mx-auto mb-5 w-full max-w-[1200px]">
        <div className="ml-[6%] w-[94%] overflow-hidden md:w-full">
          {chapters.map((chapter, index) => (
            <div
              key={chapter._id}
              className="m-[8px_8px_0_0] inline-block min-h-10 w-[45.8%] animate-pulse rounded-[10px] bg-[var(--app-text-color-near-white)] pb-2.5 pl-2.5 pt-[6px] text-[var(--app-text-color-black)] md:min-h-[60px] md:w-[270px] md:p-[6px_0_8px_15px]"
            >
              <div className="h-[24px] text-xs md:text-sm">
                <span className="mr-5">{index + 1}</span>
                <span className="hide-text">{chapter.title}</span>
              </div>

              <div className="text-xs text-[var(--app-text-color-medium-gray)] md:text-sm">
                <span>{chapter.releaseDate}</span>
                <div className="flex items-center gap-[5px]">
                  <Like className="h-[12px] w-[12px]" fill="#999" />
                  <span>{chapter.noOfLike}</span>
                  <CommentSolid className="h-[10px] w-[10px]" fill="#999" />
                  <span>{chapter.noOfComments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-[80px] h-[42px] w-[80%] animate-pulse cursor-pointer rounded-lg bg-[var(--app-text-color-near-white)] text-center leading-[42px] text-[var(--app-text-color-medium-gray)] md:hidden">
        See all
      </div>

      <div className="soft-edge-shadow fixed bottom-0 left-0 z-30 flex h-[60px] w-full items-center justify-between bg-white px-[5%] md:hidden">
        <button className="flex h-[36px] w-[15%] animate-pulse items-center justify-center rounded-[100px] border border-[var(--app-text-color-crimson)] text-[var(--app-text-color-crimson)]">
          <Share className="h-[13px] w-[13px]" strokeWidth={2.1} />
        </button>

        <button className="flex h-[36px] w-[15%] animate-pulse items-center justify-center rounded-[100px] border border-[var(--app-text-color-crimson)] text-[var(--app-text-color-crimson)]">
          <Bookmark className="h-[13px] w-[13px]" strokeWidth={2.1} />
        </button>

        <div className="pink-lift-shadow flex h-[36px] w-[60%] animate-pulse items-center justify-center rounded-[100px] bg-[var(--app-text-color-crimson)] text-[var(--app-text-color-near-white)]">
          <BookOpen className="h-[14px] w-[14px]" strokeWidth={2.1} />
          <span className="font-noto-sans-sc ml-2.5 inline-block text-[13px]/[37px] font-[500]">
            Read Now
          </span>
        </div>
      </div>
    </>
  );
};

export default ChaptersAndCommentsLoading;
