import { useRef, useEffect } from "react";

import { useRouter } from "next/router";

import ChapterLinkContent from "../TitlePage/UtilComponents/ChapterLinkContent";

const SelectChapters = ({
  openDropDown,
  setOpenDropDown,
  populatedChapters,
}) => {
  const router = useRouter();
  const activeChapterRef = useRef(null);
  const content_id = router.query.content_id;
  const chapter_id = router.query.chapter_id;

  useEffect(() => {
    if (activeChapterRef.current) {
      activeChapterRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [chapter_id]);

  return (
    <div
      className={`hide-scrollbar mx-auto -mb-[3.75rem] mt-[3.75rem] w-[90%] max-w-[800px] overflow-auto lg:-mb-[6.25rem] lg:mt-[6.25rem] ${
        openDropDown
          ? "visible h-44 opacity-100"
          : "collapse h-0 opacity-0"
      }`}
      style={{ transition: "height 0.5s" }}
    >
      <div className="grid grid-cols-2 gap-2">
        {populatedChapters.map((item, index) => (
          <ChapterLinkContent
            setOpenDropDown={setOpenDropDown}
            fromDropDown
            key={item._id}
            content_id={content_id}
            chapter_id={item._id}
            order="positive"
            noTooltip
            index={index}
            chapterTitle={item.chapterTitle}
            noOfComments={item.noOfComments}
            noOfLikes={item.noOfLikes}
            createdAt={item.createdAt}
            currentChapter={chapter_id}
            forwardedRef={chapter_id === item._id ? activeChapterRef : null}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectChapters;
