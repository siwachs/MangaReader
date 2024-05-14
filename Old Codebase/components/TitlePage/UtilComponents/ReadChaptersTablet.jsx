import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  ShareOutlined,
  ThumbUpOutlined,
  ImportContacts,
} from "@mui/icons-material";

const ReadChaptersTablet = ({ isDisabled, content_id, chapter_id }) => {
  const router = useRouter();
  const [currentChapter, setCurrentChapter] = useState(null);

  useEffect(() => {
    const storedChapter = localStorage.getItem(content_id);
    setCurrentChapter(storedChapter);
  }, [content_id]);

  return (
    <div className="mx-auto mb-2.5 mt-10 hidden h-[3.125rem] max-w-[1200px] items-center sm:flex md:mb-3">
      <button
        disabled={isDisabled}
        onClick={() =>
          router.push(
            `/watch/${content_id}/${
              currentChapter ? currentChapter : chapter_id
            }`
          )
        }
        className="box-Shadow-Button chapter-controller-button ml-0 bg-[var(--text-color-darkred)] text-white disabled:border-none disabled:bg-red-300"
      >
        <ImportContacts fontSize="inherit" />
        <span
          className="ml-2.5 text-sm font-medium md:text-base"
          style={{ fontFamily: "Noto Sans SC" }}
        >
          {currentChapter ? "Continue Reading" : "Read CH.1"}
        </span>
      </button>

      <button className="chapter-controller-button">
        <ThumbUpOutlined
          fontSize="inherit"
          className="text-[var(--text-color-darkred)]"
        />
        <span className="ml-2.5 text-base font-medium text-[var(--text-color-darkred)]">
          Subscribe
        </span>
      </button>

      <button className="chapter-controller-button">
        <ShareOutlined
          fontSize="inherit"
          className="text-[var(--text-color-darkred)]"
        />
        <span className="ml-2.5 text-base font-medium text-[var(--text-color-darkred)]">
          Share
        </span>
      </button>
    </div>
  );
};

export default ReadChaptersTablet;
