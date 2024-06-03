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
