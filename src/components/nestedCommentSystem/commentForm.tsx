import { useState } from "react";

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
    <form className="mb-[1em] flex flex-col">
      {error && <p>{error}</p>}
      <div className="flex items-center">
        <div className="avatar"></div>

        <div className="w-full rounded-2xl border-2 border-[var(--app-border-color-grayish-blue)]">
          <textarea
            placeholder="Join the discussion…"
            value={message}
            onChange={onChangeMessgae}
            className="h-auto min-h-[122px] w-full break-words rounded-t-2xl border-b-2 border-[var(--app-border-color-grayish-blue)] p-5 text-[15px] leading-[1.4] text-[var(--app-text-color-dark-grayish-green)] outline-none placeholder:font-thin"
          />

          <div className="relative h-[36px]">
            <div className="wysiwyg absolute left-1.5 top-1.5 flex h-[24px]">
              <div className="divider mx-[5px] border-r-2 border-[var(--app-border-color-grayish-blue)]" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
