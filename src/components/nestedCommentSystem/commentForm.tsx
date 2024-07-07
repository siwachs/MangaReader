import { useState } from "react";
import { useSession } from "next-auth/react";

import { useToastContainer } from "@/contexts/toastContainerContext";
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
  const { addToast } = useToastContainer();
  const { data } = useSession();
  const userId = data?.user.id;

  const { contentId, chapterId, makeComment, editComment } =
    useNestedCommentSystem();

  const [error, setError] = useState("");
  const [message, setMessage] = useState(initialMessage);

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (e.target.scrollHeight > 122) {
      e.target.style.height = "auto";
      e.target.style.height = `${Math.min(e.target.scrollHeight, 390)}px`;
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    // addToast({
    //   id: 1,
    //   type: "error",
    //   text: "Invalid Args",
    // });
    // addToast({ id: 2, type: "info", text: "Invalid Args" });
    // addToast({
    //   id: 3,
    //   type: "warning",
    //   text: "Invalid Args",
    // });
    // addToast({
    //   id: 4,
    //   type: "success",
    //   text: "Invalid Args",
    // });
    // return;

    try {
      const body = editMode
        ? { userId, message }
        : {
            contentId,
            chapterId,
            userId,
            parentId,
            message,
          };

      setMessage("");
      const requestResponse = { error: false, errorMessage: "" };

      if (editMode) {
        const editResponse = await editComment(body, commentId);
        // if (editResponse.error) {
        //   requestResponse.error = editResponse.error;
        //   requestResponse.errorMessage = editResponse.errorMessage;
        // }
      } else {
        const makeResponse = await makeComment(body);
        // if (makeResponse.error) {
        //   requestResponse.error = makeResponse.error;
        //   requestResponse.errorMessage = makeResponse.errorMessage;
        // }
      }

      if (requestResponse.error) {
        setError(requestResponse.errorMessage);
      } else {
        if (callback) callback();
        setError("");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={submitComment} className="my-4">
      {error && <p className="my-1.5 text-sm text-red-600">{error}</p>}

      <div className="w-full rounded-2xl border-2 border-[var(--app-border-color-grayish-blue)]">
        <textarea
          placeholder="Join the discussion…"
          value={message}
          onChange={onChangeMessage}
          className="h-auto min-h-[122px] w-full break-words rounded-t-2xl border-b-2 border-[var(--app-border-color-grayish-blue)] p-5 text-[15px] leading-[1.4] text-[var(--app-text-color-dark-grayish-green)] outline-none"
        />

        <div className="wysiwyg hidden-scrollbar ml-1.5 flex h-[36px] items-center overflow-auto">
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
        </div>
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
