export type pageReqObj = {
  params: { content_id?: string; chapter_id?: string };
  searchParams: {
    content_id?: string;
  };
};

export type LinkObject = {
  key: string;
  Icon?: any;
  sidebarOnly?: boolean;
  label: string;
  link: string;
};

export type CommentsPayload = {
  error: boolean;
  errorMessage?: string;
  totalPages: number;
  pageNumber: number;
  comments: [];
  sortKey: string;
};
