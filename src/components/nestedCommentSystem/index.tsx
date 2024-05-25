"use client";

import Link from "next/link";

import { NestedCommentProvider } from "@/context/nestedCommentContext";
import { ChatBubbleSolid } from "../icons";
import CommentForm from "./commentForm";

const NestedCommentSystem: React.FC<{
  contentId: string;
  chapterId?: string;
}> = ({ contentId, chapterId }) => {
  return (
    <NestedCommentProvider contentId={contentId} chapterId={chapterId}>
      <NestedCommentsContainer />
    </NestedCommentProvider>
  );
};

const NestedCommentsContainer: React.FC = () => {
  return (
    <div>
      <header className="mb-6">
        <div className="flex justify-between border-b-2 border-[var(--app-border-color-slightly-blue-gray)] py-3 font-bold text-[var(--app-text-color-dark-grayish-green)]">
          <span>31 Comments</span>

          <Link href="/" className="flex items-center gap-1.5">
            <div className="relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white">
                1
              </span>
              <ChatBubbleSolid className="size-[22px]" />
            </div>
            <span>Sign In</span>
          </Link>
        </div>
      </header>

      <section>
        <CommentForm />

        
      </section>
    </div>
  );
};

export default NestedCommentSystem;
