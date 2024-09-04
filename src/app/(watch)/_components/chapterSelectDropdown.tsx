import { Chapter } from "@/types";
import ChapterLink from "@/components/buttons/chapterLink";

const ChapterSelectDropDown: React.FC<{
  chapterSelectContainerRef: React.RefObject<HTMLDivElement>;
  isChapterSelectOpen: boolean;
  chapters: Chapter[];
  contentId: string;
}> = ({
  chapterSelectContainerRef,
  isChapterSelectOpen,
  chapters,
  contentId,
}) => {
  return (
    <div
      ref={chapterSelectContainerRef}
      className={
        isChapterSelectOpen
          ? "fixed left-1/2 z-10 h-[calc(100vh-60px)] w-full max-w-[1220px] -translate-x-1/2 bg-[var(--app-bg-color-primary)] md:h-72"
          : "hidden"
      }
    >
      <div className="hide-scrollbar h-full flex-wrap justify-between overflow-auto p-[6px_3vw] md:flex">
        {chapters.map((chapter) => (
          <ChapterLink
            key={chapter.id}
            title={chapter.title}
            releaseDate={chapter.createdAt}
            href={`/watch/${contentId}/${chapter.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ChapterSelectDropDown;
