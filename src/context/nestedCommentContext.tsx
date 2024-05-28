import { createContext, useContext, useEffect, useState, useMemo } from "react";

type ContextType = {};

const NestedCommentSystemContext = createContext<ContextType>({});

export function useNestedCommentSystem() {
  const context = useContext(NestedCommentSystemContext);
  if (!context)
    throw new Error(
      "useNestedCommentSystem must be used within NestedCommentProvider",
    );

  return context;
}

export function NestedCommentProvider({
  contentId,
  chapterId,
  children,
}: Readonly<{
  contentId: string;
  chapterId?: string;
  children: React.ReactNode;
}>) {
  useEffect(() => {}, [chapterId, contentId]);

  const contextValue = useMemo(() => ({}), []);

  return (
    <NestedCommentSystemContext.Provider value={contextValue}>
      {children}
    </NestedCommentSystemContext.Provider>
  );
}
