"use client";

import Link from "next/link";

import { NestedCommentProvider } from "@/context/nestedCommentContext";
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
    <footer>
      <header>
        {/* On non mobile mx-16px */}
        <div className="mb-6 border-b-2 border-[var(--app-border-color-slightly-blue-gray)] text-base font-bold text-[var(#2a2e2e)]">
          <span className="float-left py-3">31 Comments</span>
          <Link href="/" className="float-right py-3">
            <span>Sign In</span>
          </Link>
        </div>
      </header>

      <section>
        <CommentForm />
      </section>
    </footer>
  );
};

export default NestedCommentSystem;
