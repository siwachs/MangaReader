import { useRef, useState, useEffect } from "react";
import { useNestedCommentSystem } from "@/contexts/nestedCommentContext";

import { PiGifFill } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import { RxFontStyle } from "react-icons/rx";
import {
  MdFormatBold,
  MdOutlineFormatItalic,
  MdFormatUnderlined,
  MdStrikethroughS,
} from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaCode } from "react-icons/fa6";
import { RiLinksFill } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";

const placeholder = `<div className="pointer-events-none absolute top-0 mt-5 w-auto max-w-full select-none font-[Arial] font-normal text-black opacity-[0.333]"><p className="leading-[1.4]">Join the discussion…</p></div>`;

const editorToolboxButtonClasses =
  "flex size-6 items-center justify-center rounded text-[var(--app-text-color-medium-gray-blue)] opacity-60 hover:opacity-100 data-[active=true]:opacity-100 data-[active=true]:bg-[var(--app-text-color-light-blue-gray)]";
const editorToolboxButtonIconClasses = "size-5";

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
  const editorRef = useRef<HTMLDivElement>(null);
  const { userId, contentId, chapterId, makeComment, editComment } =
    useNestedCommentSystem();
  const [message, setMessage] = useState(initialMessage);
  const [expandedEditor, setExpandedEditor] = useState(false);
  const [activeTools, setActiveTools] = useState({
    isToolboxActive: false,
    isBoldStyleActive: false,
    isItalicStyleActive: false,
    isUnderlineStyleActive: false,
    isStrikethroughStyleActive: false,
    isSpoilerStyleActive: false,
    isCodeStyleActive: false,
  });

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialMessage;
    }
  }, [initialMessage]);

  useEffect(() => {
    applyStyle();
  }, [
    activeTools.isBoldStyleActive,
    activeTools.isItalicStyleActive,
    activeTools.isCodeStyleActive,
    activeTools.isSpoilerStyleActive,
    activeTools.isStrikethroughStyleActive,
    activeTools.isUnderlineStyleActive,
  ]);

  const applyStyle = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    const range = selection.getRangeAt(0);

    let wrapper = null;
    if (activeTools.isCodeStyleActive && activeTools.isSpoilerStyleActive) {
      wrapper = document.createElement("spoiler-tag");
      wrapper.appendChild(document.createElement("code"));
    } else if (activeTools.isCodeStyleActive)
      wrapper = document.createElement("code");
    else if (activeTools.isSpoilerStyleActive)
      wrapper = document.createElement("spoiler-tag");
    else wrapper = document.createElement("span");

    if (activeTools.isBoldStyleActive) wrapper.style.fontWeight = "bold";
    if (activeTools.isItalicStyleActive) wrapper.style.fontStyle = "italic";
    if (activeTools.isUnderlineStyleActive)
      wrapper.style.textDecoration = "underline";
    if (activeTools.isStrikethroughStyleActive)
      wrapper.style.textDecoration = "line-through";

    // Use DocumentFragment to safely insert styled content
    const fragment = range.extractContents();
    wrapper.appendChild(fragment);
    editorRef.current?.appendChild(wrapper);

    // Reselect the new styled content
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(wrapper);
    selection.addRange(newRange);
  };

  const updateActiveTools = (key: keyof typeof activeTools) => {
    setActiveTools((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

  return (
    <form onSubmit={submitComment} className="my-4">
      <div className="rounded-2xl border-2 border-[var(--app-border-color-grayish-blue)]">
        <div
          role="textbox"
          ref={editorRef}
          onFocus={() => setExpandedEditor(true)}
          onInput={(e: React.ChangeEvent<HTMLDivElement>) =>
            setMessage(e.target.innerHTML)
          }
          spellCheck
          contentEditable
          className={`relative max-h-[350px] ${expandedEditor ? "min-h-[115px] border-b-2" : "min-h-[65px]"} max-w-full overflow-y-auto whitespace-pre-wrap break-words p-5 leading-[1.4] outline-none transition-all`}
        />

        <div
          className={`${expandedEditor ? "rounded-b-2xl p-[5px_6px]" : "hidden"}`}
        >
          <div className="flex justify-between">
            <div className="inline-flex items-center gap-1.5">
              <button type="button" className={editorToolboxButtonClasses}>
                <PiGifFill className={editorToolboxButtonIconClasses} />
              </button>

              <button type="button" className={editorToolboxButtonClasses}>
                <AiFillPicture className={editorToolboxButtonIconClasses} />
              </button>

              <span className="mx-0.5 inline-block h-6 w-0.5 bg-[var(--app-border-color-grayish-blue)]" />

              <button
                data-active={activeTools.isToolboxActive}
                type="button"
                onClick={() => updateActiveTools("isToolboxActive")}
                className={editorToolboxButtonClasses}
              >
                <RxFontStyle
                  strokeWidth={0.2}
                  className={editorToolboxButtonIconClasses}
                />
              </button>
            </div>

            <button
              type="button"
              className="h-fit whitespace-nowrap rounded-[14px] bg-[var(--app-text-color-gunmelt-gray)] p-[3.5px_15px] text-[15px] font-bold text-white hover:border-[#526069] hover:bg-[#526069]"
            >
              Comment
            </button>
          </div>

          <div
            className={`${activeTools.isToolboxActive ? "mt-1.5 grid grid-flow-col gap-1.5" : "hidden"}`}
          >
            <button
              data-active={activeTools.isBoldStyleActive}
              type="button"
              onClick={() => updateActiveTools("isBoldStyleActive")}
              className={editorToolboxButtonClasses}
              title="Bold"
            >
              <MdFormatBold className="size-7" />
            </button>

            <button
              data-active={activeTools.isItalicStyleActive}
              type="button"
              onClick={() => updateActiveTools("isItalicStyleActive")}
              className={editorToolboxButtonClasses}
              title="Italic"
            >
              <MdOutlineFormatItalic className="size-7" />
            </button>

            <button
              data-active={activeTools.isUnderlineStyleActive}
              type="button"
              onClick={() => updateActiveTools("isUnderlineStyleActive")}
              className={editorToolboxButtonClasses}
              title="Underline"
            >
              <MdFormatUnderlined className="size-7" />
            </button>

            <button
              data-active={activeTools.isStrikethroughStyleActive}
              type="button"
              onClick={() => updateActiveTools("isStrikethroughStyleActive")}
              className={editorToolboxButtonClasses}
              title="StrikeThrough"
            >
              <MdStrikethroughS className="size-7" />
            </button>

            <button
              type="button"
              className={editorToolboxButtonClasses}
              title="Add Link"
            >
              <RiLinksFill className="size-5" strokeWidth={1} />
            </button>

            <button
              data-active={activeTools.isSpoilerStyleActive}
              type="button"
              onClick={() => updateActiveTools("isSpoilerStyleActive")}
              className={editorToolboxButtonClasses}
              title="Spoiler"
            >
              <BiSolidHide className="size-5" />
            </button>

            <button
              data-active={activeTools.isCodeStyleActive}
              type="button"
              onClick={() => updateActiveTools("isCodeStyleActive")}
              className={editorToolboxButtonClasses}
              title="Code"
            >
              <FaCode className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-2.5">
        <h6 className="mb-2.5 text-[11px] font-bold uppercase not-italic leading-[1] text-[var(--app-text-color-blue-gray)]">
          Log in with
        </h6>

        <div className="mb-[18px]">
          <button
            type="button"
            className="opacity-90 transition-opacity hover:opacity-100"
          >
            <FcGoogle className="size-9" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
