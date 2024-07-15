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

  const editorRef = useRef(null);

  const applyStyle = (style) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);

    // Create a span element to wrap the selected text
    const span = document.createElement("span");
    if (style === "bold") span.style.fontWeight = "bold";
    if (style === "italic") span.style.fontStyle = "italic";
    if (style === "underline") span.style.textDecoration = "underline";

    // Use DocumentFragment to safely insert styled content
    const fragment = range.extractContents();
    span.appendChild(fragment);
    range.insertNode(span);

    // Reselect the new styled content
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.addRange(newRange);
  };

  const createLink = () => {
    const url = prompt("Enter the URL");
    const selection = window.getSelection();
    if (!selection.rangeCount || !url) return;
    const range = selection.getRangeAt(0);

    // Create an anchor element to wrap the selected text
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.appendChild(range.extractContents());
    range.insertNode(anchor);

    // Reselect the new link
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(anchor);
    selection.addRange(newRange);
  };

  return (
    <form onSubmit={submitComment} className="my-4">
      {/* Test Wisiwig */}
      <div className="border p-4">
        <div className="mb-4 flex space-x-2">
          <button
            type="button"
            onClick={() => applyStyle("bold")}
            className="rounded border bg-gray-200 px-2 py-1 hover:bg-gray-300"
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => applyStyle("italic")}
            className="rounded border bg-gray-200 px-2 py-1 hover:bg-gray-300"
          >
            Italic
          </button>
          <button
            type="button"
            onClick={() => applyStyle("underline")}
            className="rounded border bg-gray-200 px-2 py-1 hover:bg-gray-300"
          >
            Underline
          </button>
          <button
            type="button"
            onClick={createLink}
            className="rounded border bg-gray-200 px-2 py-1 hover:bg-gray-300"
          >
            Link
          </button>
        </div>
        <div
          ref={editorRef}
          className="h-48 overflow-auto border p-4"
          contentEditable={true}
        ></div>
      </div>
      {/* Test End Here */}

      <div>
        {/* <div
          ref={contentEditableRef}
          role="textbox"
          spellCheck
          contentEditable
          onFocus={contentEditableFocus}
          onInput={contentEditableInput}
          className="relative max-h-[350px] min-h-[65px] overflow-y-auto whitespace-pre-wrap break-words rounded-2xl border-2 border-[var(--app-border-color-grayish-blue)] p-5 leading-[1.4] outline-none"
        >
          {content === "" ? (
            <div
              data-role="placeholder"
              className="pointer-events-none absolute top-0 mt-5 w-auto max-w-full select-none font-[Arial] font-normal text-black opacity-[0.333]"
            >
              <p className="leading-[1.4]">Join the discussion…</p>
            </div>
          ) : (
            content
          )}
        </div> */}

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
