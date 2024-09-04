"use client";

import dynamic from "next/dynamic";

import "./index.css";
import { NestedCommentProvider } from "@/contexts/nestedCommentContext";
import LazyLoadComponent from "../lazyLoadComponent";

// Dynamic Imports
const NestedCommentsContainer = dynamic(
  () => import("./nestedCommentContainer"),
  { ssr: false },
);

const NestedCommentSystem: React.FC<{
  contentId: string;
  chapterId?: string;
}> = ({ contentId, chapterId }) => {
  return (
    <div>
      <NestedCommentProvider contentId={contentId} chapterId={chapterId}>
        <LazyLoadComponent>
          <NestedCommentsContainer />
        </LazyLoadComponent>
      </NestedCommentProvider>
    </div>
  );
};

export default NestedCommentSystem;
