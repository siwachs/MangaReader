import { useState } from "react";

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

const CommentForm: React.FC<{ initialMessage?: string }> = ({
  initialMessage = "",
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState(initialMessage);
  const onChangeMessgae = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (e.target.scrollHeight <= 122) return;
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 390)}px`;
  };

  return (
    <form className="mb-[1em]">
      {error && <p>{error}</p>}
      <div className="flex">
        <div></div>

        <div className="w-full rounded-2xl border-2 border-[var(--app-border-color-grayish-blue)]">
          <textarea
            placeholder="Join the discussion…"
            value={message}
            onChange={onChangeMessgae}
            className="h-auto min-h-[122px] w-full break-words rounded-t-2xl border-b-2 border-[var(--app-border-color-grayish-blue)] p-5 text-[15px] leading-[1.4] text-[var(--app-text-color-dark-grayish-green)] outline-none"
          />

          <div className="relative h-[36px]">
            <div className="wysiwyg absolute left-1.5 top-1.5 flex h-[24px] gap-3">
              <button className="opacity-60 transition-opacity hover:opacity-100">
                <Gif className="size-[22px]" />
              </button>

              <button className="opacity-60 transition-opacity hover:opacity-100">
                <ImageUpload className="size-[22px]" />
              </button>
              <div className="divider border-r-2 border-[var(--app-border-color-grayish-blue)]" />

              <button className="opacity-60 transition-opacity hover:opacity-100">
                <Bold className="size-4" />
              </button>
              <button className="opacity-60 transition-opacity hover:opacity-100">
                <Italic className="size-4" />
              </button>
              <button className="opacity-60 transition-opacity hover:opacity-100">
                <Underline className="size-4" />
              </button>
              <button className="opacity-60 transition-opacity hover:opacity-100">
                <StrikeThrough className="size-4" />
              </button>
              <button className="opacity-60 transition-opacity hover:opacity-100">
                <LinkIcon className="size-4" />
              </button>
              <button className="opacity-60 transition-opacity hover:opacity-100">
                <Spoiler className="size-4" />
              </button>
            </div>

            <button
              type="submit"
              className="float-right mr-0.5 mt-[1px] rounded-[14px] bg-[var(--app-text-color-gunmelt-gray)] p-[4px_15px] text-[15px] font-bold text-white"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      <div className="pt-2.5">
        <h6 className="mb-2.5 text-[11px] font-bold uppercase text-[var(--app-text-color-blue-gray)]">
          Log in with
        </h6>

        <ul className="mb-[18px]">
          <li>
            <button className="opacity-90 transition-opacity hover:opacity-100">
              <Google className="size-9" />
            </button>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default CommentForm;
