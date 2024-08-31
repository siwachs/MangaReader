import { Like, CommentSolid, Share, Bookmark, Book } from "@/components/icons";
import {
  contentInteractionButtonClasses,
  contentInteractionButtonTextClasses,
} from "../_styles";
import { Chapter } from "../_types";

const menuTypeClasses =
  "inline-block h-10 w-1/3 select-none text-center text-xs/[40px] pointer-events-none  md:h-20 md:w-auto md:text-xl/[80px]";
const chaptersOrderClasses =
  "font-noto-sans-sc select-none font-normal pointer-events-none";

const ChaptersAndCommentsLoading: React.FC<{
  chapters: Chapter[];
  totalChapters: number;
}> = ({ chapters, totalChapters }) => {
  return (
    <>
      <div className="menu-wrapper mx-[5%] w-[90%] max-w-[1200px] md:mx-auto md:w-full">
        <div className="content-interaction-wrapper soft-edge-shadow fixed bottom-0 left-0 z-30 flex h-[60px] w-full items-center justify-between bg-white px-[5%] md:static md:mt-[40px] md:h-[50px] md:flex-row-reverse md:justify-end md:gap-[35px] md:px-0 md:shadow-none">
          <div className={`${contentInteractionButtonClasses} animate-pulse`}>
            <Share
              className="h-[13px] w-[13px] md:h-5 md:w-5"
              strokeWidth={2.1}
            />
            <span className={contentInteractionButtonTextClasses}>Share</span>
          </div>

          <div className={`${contentInteractionButtonClasses} animate-pulse`}>
            <Bookmark
              className="h-[13px] w-[13px] md:h-5 md:w-5"
              strokeWidth={2.1}
            />
            <span className={contentInteractionButtonTextClasses}>
              Subscribe
            </span>
          </div>

          <div
            className={`pink-lift-shadow ${contentInteractionButtonClasses} w-[60%] animate-pulse bg-[var(--app-text-color-crimson)] text-[var(--app-text-color-near-white)]`}
          >
            <Book
              className="h-3.5 w-3.5 md:h-[18px] md:w-[18px]"
              strokeWidth={2.1}
            />
            <span className="font-noto-sans-sc ml-2.5 inline-block text-[13px]/[37px] font-medium md:h-[29px] md:text-base/[29px]">
              Read Now
            </span>
          </div>
        </div>

        <div className="menu-controls h-10 animate-pulse border-b border-black/[0.2] md:h-20">
          <div className="float-left w-[35%] text-gray-500/70 md:w-auto">
            <div
              className={`${menuTypeClasses} border-b-2 border-[var(--app-text-color-red)] text-[var(--app-text-color-red)] md:pr-2.5`}
            >
              <span>Chapters</span>
            </div>

            <span className="font-noto-sans-sc hidden animate-pulse text-sm/[16px] text-neutral-400 md:inline-block">
              Updated to Chapter {totalChapters}
            </span>

            <span className="mx-3.5 hidden text-black md:inline-block">/</span>

            <div className={`${menuTypeClasses} ml-5 md:ml-0 md:pr-2.5`}>
              <span>Comments</span>
            </div>

            <span className="font-noto-sans-sc hidden text-sm/[16px] text-neutral-400 md:inline-block">
              (5772)
            </span>
          </div>

          <div className="float-right flex gap-[5px] text-xs/[40px] text-neutral-400 md:text-sm/[89px]">
            <div
              className={`${chaptersOrderClasses} text-[var(--app-text-color-crimson)]`}
            >
              <span>Positive</span>
            </div>

            <span className="text-black">/</span>

            <div className={chaptersOrderClasses}>
              <span>Reverse</span>
            </div>
          </div>
        </div>

        <div className="font-noto-sans-sc float-left my-1 w-[90%] animate-pulse text-xs font-normal text-neutral-400 md:hidden">
          <span>Updated to Chapter {totalChapters}</span>
        </div>
      </div>

      <div className="chapters-list mx-auto mb-5 w-full max-w-[1200px]">
        <div className="ml-[6%] w-[94%] md:ml-0 md:flex md:w-full md:flex-wrap md:justify-center">
          {chapters.map((chapter, index) => (
            <div
              key={chapter._id}
              className="m-[8px_8px_0_0] inline-block min-h-10 w-[45.8%] animate-pulse rounded-[10px] bg-[var(--app-text-color-near-white)] pb-2.5 pl-2.5 pt-[6px] text-black md:min-h-[60px] md:w-[285px] md:p-[6px_0_8px_15px]"
            >
              <div className="h-[24px] text-xs md:text-sm">
                <span className="mr-5">{index + 1}</span>
                <span className="truncate">{chapter.title}</span>
              </div>

              <div className="text-xs text-gray-500/70 md:text-sm">
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

      <div className="see-all-button mx-auto mb-20 h-[42px] w-[80%] animate-pulse cursor-pointer rounded-lg bg-[var(--app-text-color-near-white)] text-center leading-[42px] text-gray-500/70 md:hidden">
        See all
      </div>
    </>
  );
};

export default ChaptersAndCommentsLoading;
