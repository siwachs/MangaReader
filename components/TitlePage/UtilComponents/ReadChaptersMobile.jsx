import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  ShareOutlined,
  ThumbUpOutlined,
  ImportContacts,
} from "@mui/icons-material";

const ReadChaptersMobile = ({ isDisabled, content_id, chapter_id }) => {
  const router = useRouter();
  const [currentChapter, setCurrentChapter] = useState(null);

  useEffect(() => {
    const storedChapter = localStorage.getItem(content_id);
    setCurrentChapter(storedChapter);
  }, [content_id]);

  return (
    <div className="box-Shadow fixed bottom-0 left-0 z-20 flex h-[3.75rem] w-full items-center justify-between dark:bg-gray-900 bg-white px-[5%] sm:hidden">
      <button className="controller-button-mobile">
        <ShareOutlined
          fontSize="inherit"
          className="text-[var(--text-color-darkred)]"
        />
      </button>

      <button className="controller-button-mobile">
        <ThumbUpOutlined
          fontSize="inherit"
          className="text-[var(--text-color-darkred)]"
        />
      </button>

      <button
        disabled={isDisabled}
        onClick={() =>
          router.push(
            `/watch/${content_id}/${
              currentChapter ? currentChapter : chapter_id
            }`
          )
        }
        className="box-Shadow-Button controller-button-mobile w-[60%] bg-[var(--text-color-darkred)] text-white disabled:border-none disabled:bg-red-300"
      >
        <ImportContacts fontSize="inherit" />
        <span
          className="ml-2.5 text-sm font-[500]"
          style={{ fontFamily: "Noto Sans SC" }}
        >
          {currentChapter ? "Continue Reading" : "Read CH.1"}
        </span>
      </button>
    </div>
  );
};

export default ReadChaptersMobile;
