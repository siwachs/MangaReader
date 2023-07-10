import { useState } from "react";

import { useRouter } from "next/router";

import { IconButton } from "@mui/material";
import { KeyboardArrowDown, Delete } from "@mui/icons-material";

import { capitalizeText } from "@/lib/utils";
import { deleteChapter } from "@/lib/deletionUtils";

import MoveToTop from "@/lib/Frontend-utils/MoveToTop";
import DialogComponent from "@/lib/Frontend-utils/DialogComponent";
import ChapterLinkContent from "./ChapterLinkContent";

const ChaptersList = ({
  isAdmin,
  contentTitle,
  chapters,
  order,
  totalChapters,
  content_id,
}) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div
      className={`relative mt-2.5 sm:mb-5 md:mt-3 lg:mt-4 ${
        !showAll ? "mb-[3.75rem]" : "mb-[4.6875rem]"
      }`}
    >
      <div
        className={`grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-y-3 ${
          !showAll ? "max-h-[38.75rem] overflow-hidden" : "lg:mb-[1.875rem]"
        }`}
      >
        {chapters.map((item, index) => (
          <ChapterItem
            key={item._id}
            isAdmin={isAdmin}
            chapterTitle={item.chapterTitle}
            chapter_id={item._id}
            content_id={content_id}
            order={order}
            index={index}
            totalChapters={totalChapters}
            contentTitle={contentTitle}
            createdAt={item.createdAt}
            noOfLikes={item.noOfLikes}
            noOfViews={item.noOfViews}
            noOfComments={item.noOfComments}
          />
        ))}
      </div>

      {!showAll && (
        <div className="linear-gradient-class absolute bottom-0 flex h-[3.75rem] w-full items-center justify-center text-6xl text-[var(--pagination-nav-color)]">
          <button onClick={() => setShowAll(true)}>
            <KeyboardArrowDown fontSize="inherit" />
          </button>
        </div>
      )}

      <MoveToTop className="-right-[70px] bottom-[50px]" />
    </div>
  );
};

const ChapterItem = ({
  isAdmin,
  content_id,
  chapter_id,
  order,
  index,
  totalChapters,
  chapterTitle,
  contentTitle,
  createdAt,
  noOfLikes,
  noOfViews,
  noOfComments,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setIsOpen] = useState(false);

  const router = useRouter();

  const dialogAcceptButtonTrigger = async (chapterTitle, chapter_id) => {
    setIsOpen(false);
    if (loading) return;
    setLoading(true);
    try {
      await deleteChapter(contentTitle, chapterTitle, content_id, chapter_id);
    } catch (error) {
    } finally {
      setLoading(false);
      router.replace(router.asPath);
    }
  };

  return isAdmin ? (
    <div className="relative">
      <ChapterLinkContent
        content_id={content_id}
        chapter_id={chapter_id}
        order={order}
        index={index}
        totalChapters={totalChapters}
        chapterTitle={chapterTitle}
        createdAt={createdAt}
        noOfLikes={noOfLikes}
        noOfViews={noOfViews}
        noOfComments={noOfComments}
      />
      <IconButton
        className="absolute right-0 top-0 text-red-500"
        size="small"
        onClick={() => setIsOpen(true)}
      >
        <Delete fontSize="inherit" />
      </IconButton>
      <DialogComponent
        dialogTitle="Delete Chapter"
        dialogText={`Are you want to delete ${capitalizeText(chapterTitle)}`}
        cancelButtonText="Cancel"
        dialogButtonText="Delete"
        open={open}
        setIsOpen={setIsOpen}
        acceptButtonMethod={() =>
          dialogAcceptButtonTrigger(chapterTitle, chapter_id)
        }
      />
    </div>
  ) : (
    <ChapterLinkContent
      content_id={content_id}
      chapter_id={chapter_id}
      order={order}
      index={index}
      totalChapters={totalChapters}
      chapterTitle={chapterTitle}
      createdAt={createdAt}
      noOfLikes={noOfLikes}
      noOfViews={noOfViews}
      noOfComments={noOfComments}
    />
  );
};

export default ChaptersList;
