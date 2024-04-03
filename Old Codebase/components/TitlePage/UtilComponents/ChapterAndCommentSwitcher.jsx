import { useState } from "react";

const ChapterAndCommentSwitcher = ({
  order,
  changeOrder,
  totalChapters,
  totalComments,
}) => {
  const [contentList, setContentList] = useState("episodes");

  const changeContent = (content) => {
    if (content === contentList) return;
    setContentList(content);
  };

  return (
    <div className="controller-border-color flex w-full items-center justify-between border-b text-xs text-[var(--text-color-content)] dark:text-gray-100 sm:text-sm lg:text-lg">
      <div className="flex">
        <div
          className={`controller-button-responsive ${
            contentList === "episodes"
              ? "controller-button-active"
              : "cursor-pointer"
          }`}
          onClick={() => changeContent("episodes")}
        >
          <span>Episodes</span>
        </div>

        <span className="ml-1 hidden h-[2.5rem] items-center text-xs sm:inline-flex md:text-sm lg:ml-[0.375rem] lg:h-[3.125rem] lg:text-base">
          Updated up to Chapter ({totalChapters})
        </span>

        <span className="mx-1.5 hidden h-[2.5rem] items-center text-[var(--text-color-black-secondary)] sm:inline-flex lg:mx-3.5 lg:h-[3.125rem]">
          /
        </span>

        <div
          className={`controller-button-responsive ml-5 sm:ml-0 ${
            contentList === "comments"
              ? "controller-button-active"
              : "cursor-pointer"
          }`}
          onClick={() => changeContent("comments")}
        >
          <span>Comments</span>
        </div>

        <span className="ml-1 hidden h-[2.5rem] items-center text-xs sm:inline-flex md:text-sm lg:ml-1.5 lg:h-[3.125rem] lg:text-base">
          ({totalComments})
        </span>
      </div>

      <div className="flex space-x-1.5 sm:space-x-2">
        <div
          onClick={() => changeOrder("positive")}
          className={`controller-button-responsive ${
            order === "positive" ? "controller-button-active" : "cursor-pointer"
          }`}
        >
          <span>Positive</span>
        </div>
        <span className="controller-button-responsive">/</span>
        <div
          onClick={() => changeOrder("reverse")}
          className={`controller-button-responsive ${
            order === "reverse" ? "controller-button-active" : "cursor-pointer"
          }`}
        >
          <span>Reverse</span>
        </div>
      </div>
    </div>
  );
};

export default ChapterAndCommentSwitcher;
