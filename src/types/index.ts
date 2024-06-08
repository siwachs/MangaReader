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

export type CommentType = {
  _id: string;
  parentId: null | string;
  message: string;
  contentId: string;
  chapterId: string | null;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  likes: number;
  dislikes: number;
  flag: boolean;
  createdAt: string;
  updatedAt: string;
};
