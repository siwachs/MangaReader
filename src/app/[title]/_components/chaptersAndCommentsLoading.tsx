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

const ChaptersAndCommentsLoading: React.FC<{
  chapters: Chapter[];
  totalChapters: number;
}> = ({ chapters, totalChapters }) => {
  return <div>Loading ...</div>;
};

export default ChaptersAndCommentsLoading;
