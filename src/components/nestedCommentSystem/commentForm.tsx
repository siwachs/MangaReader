import { useRef, useState } from "react";

import { useNestedCommentSystem } from "@/contexts/nestedCommentContext";

import {
  Bold,
  Gif,
  Google,
  ImageUpload,
  Italic,
  LinkIcon,
  Spoiler,
  StrikeThrough,
  Underline,
} from "../icons";

const wysiwygButtonClasses = "opacity-60 transition-opacity hover:opacity-100";

const CommentForm: React.FC<{
  initialMessage?: string;
  parentId?: string;
  commentId?: string;
  callback?: () => void;
  editMode?: boolean;
}> = ({
  initialMessage = "",
  parentId = "root",
  commentId,
  callback,
  editMode,
}) => {
  const [content, setContent] = useState("");
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const { userId, contentId, chapterId, makeComment, editComment } =
    useNestedCommentSystem();
  const [message, setMessage] = useState(initialMessage);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    if (editMode) {
      await editComment({ userId, message }, commentId);
    } else {
      await makeComment({
        contentId,
        chapterId,
        userId,
        parentId,
        message,
      });
    }

    if (callback) callback();
    else setMessage("");
  };

  const contentEditableFocus = () => {
    if (contentEditableRef.current && content === "") {
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(contentEditableRef.current, 0);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const contentEditableInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerText);
  };

  return (
    <form onSubmit={submitComment} className="my-4">
      <div>
        <div
          ref={contentEditableRef}
          role="textbox"
          spellCheck
          contentEditable
          onFocus={contentEditableFocus}
          onInput={contentEditableInput}
          className="relative max-h-[350px] min-h-[65px] overflow-y-auto whitespace-pre-wrap break-words rounded-2xl border-2 border-[var(--app-border-color-grayish-blue)] p-5 leading-[1.4] outline-none"
          dangerouslySetInnerHTML={{
            __html:
              content === ""
                ? `<div
              data-role="placeholder"
              className="pointer-events-none absolute top-0 mt-5 w-auto max-w-full select-none font-[Arial] font-normal text-black opacity-[0.333]"
            ><p className="leading-[1.4]">Join the discussion…</p></div>`
                : content,
          }}
        />

        {/* <div className="wysiwyg hidden-scrollbar ml-1.5 flex h-[36px] items-center overflow-auto">
          <div className="flex h-[24px] flex-1 gap-3.5">
            <button type="button" className={wysiwygButtonClasses}>
              <Gif className="size-[22px]" />
            </button>
            <button type="button" className={wysiwygButtonClasses}>
              <ImageUpload className="size-[22px]" />
            </button>

            <div className="divider border-r-2 border-[var(--app-border-color-grayish-blue)]" />

            <button type="button" className={wysiwygButtonClasses}>
              <Bold className="size-4" />
            </button>
            <button type="button" className={wysiwygButtonClasses}>
              <Italic className="size-4" />
            </button>
            <button type="button" className={wysiwygButtonClasses}>
              <Underline className="size-4" />
            </button>
            <button type="button" className={wysiwygButtonClasses}>
              <StrikeThrough className="size-4" />
            </button>
            <button type="button" className={wysiwygButtonClasses}>
              <LinkIcon className="size-4" />
            </button>
            <button type="button" className={wysiwygButtonClasses}>
              <Spoiler className="size-4" />
            </button>
          </div>

          {userId && (
            <button
              type="submit"
              className="ml-3.5 mr-0.5 rounded-[14px] bg-[var(--app-text-color-gunmelt-gray)] p-[4px_15px] text-[15px] font-bold text-white disabled:bg-gray-400"
              disabled={!message.trim()}
            >
              Comment
            </button>
          )}
        </div> */}
      </div>

      <div className="pt-2.5">
        <h6 className="mb-2.5 text-[11px] font-bold uppercase text-[var(--app-text-color-blue-gray)]">
          Log in with
        </h6>

        <ul className="mb-[18px]">
          <li>
            <button
              type="button"
              className="opacity-90 transition-opacity hover:opacity-100"
            >
              <Google className="size-9" />
            </button>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default CommentForm;
