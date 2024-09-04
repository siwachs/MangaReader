"use client";

import "./index.css";
import { NestedCommentProvider } from "@/contexts/nestedCommentContext";

const NestedCommentSystem: React.FC<{
  contentId: string;
  chapterId?: string;
}> = ({ contentId, chapterId }) => {
  return (
    <div>
      <NestedCommentProvider contentId={contentId} chapterId={chapterId}>
        <></>
      </NestedCommentProvider>
    </div>
  );
};

export default NestedCommentSystem;
