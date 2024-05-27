"use client";

import Link from "next/link";
import Image from "next/image";

import { CommentType } from "@/types";
import { NestedCommentProvider } from "@/context/nestedCommentContext";
import { roboto } from "@/lib/fonts";
import { AddUser, ChatBubbleSolid, Flag, HeartOutline, Minus } from "../icons";
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

const rootComments: CommentType[] = [
  {
    _id: "1",
    parentId: null,
    message: "1st root message",
    contentId: "1",
    chapterId: "1",
    user: { _id: "1", name: "user 1", avatar: "/assets/avatar.jpg" },
    likes: 0,
    flag: false,
  },
  {
    _id: "2",
    parentId: null,
    message: "2nd root message",
    contentId: "2",
    chapterId: "2",
    user: { _id: "2", name: "user 2", avatar: "/assets/avatar.jpg" },
    likes: 0,
    flag: false,
  },
  {
    _id: "3",
    parentId: null,
    message: "3rd root message",
    contentId: "3",
    chapterId: "3",
    user: { _id: "3", name: "user 3", avatar: "/assets/avatar.jpg" },
    likes: 0,
    flag: false,
  },
  {
    _id: "4",
    parentId: null,
    message: "4th root message",
    contentId: "4",
    chapterId: "4",
    user: { _id: "4", name: "user 4", avatar: "/assets/avatar.jpg" },
    likes: 0,
    flag: false,
  },
  {
    _id: "5",
    parentId: null,
    message: "5th root message",
    contentId: "5",
    chapterId: "5",
    user: { _id: "5", name: "user 5", avatar: "/assets/avatar.jpg" },
    likes: 0,
    flag: false,
  },
  {
    _id: "6",
    parentId: null,
    message: "6th root message",
    contentId: "6",
    chapterId: "6",
    user: { _id: "6", name: "user 6", avatar: "/assets/avatar.jpg" },
    likes: 0,
    flag: false,
  },
  {
    _id: "7",
    parentId: null,
    message: "7th root message",
    contentId: "7",
    chapterId: "7",
    user: { _id: "7", name: "user 7", avatar: "/assets/avatar.jpg" },
    likes: 0,
    flag: false,
  },
  {
    _id: "8",
    parentId: null,
    message: "8th root message",
    contentId: "8",
    chapterId: "8",
    user: { _id: "8", name: "user 8", avatar: "/assets/avatar.jpg" },
    likes: 0,
    flag: false,
  },
  {
    _id: "9",
    parentId: null,
    message: "9th root message",
    contentId: "9",
    chapterId: "9",
    user: { _id: "9", name: "user 9", avatar: "/assets/avatar.jpg" },
    likes: 0,
    flag: false,
  },
  {
    _id: "10",
    parentId: null,
    message: "10th root message",
    contentId: "10",
    chapterId: "10",
    user: { _id: "10", name: "user 10", avatar: "/assets/avatar.jpg" },
    likes: 0,
    flag: false,
  },
];

const NestedCommentsContainer: React.FC = () => {
  return (
    <div
      className={`${roboto.className} text-[var(--app-text-color-dark-grayish-green)]`}
    >
      <header className="mb-6">
        <div className="flex justify-between border-b-2 border-[var(--app-border-color-slightly-blue-gray)] py-3 font-bold">
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
        <div className="mb-2 flex items-center justify-between">
          <div className="mb-3 flex items-center gap-2.5 p-[7px_14px]">
            <button>
              <HeartOutline className="size-4" />
            </button>
            <span className="text-xs/[18px] font-bold">7</span>
          </div>

          <div className="mb-3 flex items-center gap-4 pt-[3px]">
            <button
              data-active={true}
              className="text-sm/[19px] font-semibold data-[active=true]:border-b-[3px] data-[active=true]:border-[var(--app-text-color-gunmelt-gray)]"
            >
              Best
            </button>
            <button className="text-sm/[19px] font-semibold">Newest</button>
            <button className="text-sm/[19px] font-semibold">Oldest</button>
          </div>
        </div>

        <ul>
          {rootComments.length > 0 && <CommentList comments={rootComments} />}
        </ul>
      </section>
    </div>
  );
};

const CommentList: React.FC<{ comments: CommentType[] }> = ({ comments }) => {
  return comments.map((comment) => (
    <li key={comment._id} className="mb-4">
      <Comment comment={comment} />
    </li>
  ));
};

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  return (
    <div>
      <div className="header flex">
        <div className="avatar mb-[9px] mr-2.5 h-[52px] w-[52px] rounded-2xl">
          <Image
            src={comment.user.avatar}
            alt={comment.user.name}
            width={60}
            height={60}
            className="h-full w-full rounded-[inherit] object-cover object-center"
          />
        </div>

        <div className="mt-1">
          <div className="truncate text-[15px]/[18px] font-bold">
            {comment.user.name}
            <AddUser className="ml-1.5 inline-block size-4 text-[var(--app-text-color-cool-tone-grayish-blue)]" />
          </div>

          <span className="text-xs/[21px] font-medium text-[var(--app-text-color-muted-blue-gray)]">
            <span>5 days ago</span>
            <span className="ml-3">edited</span>
          </span>
        </div>

        <div className="mb-2.5 ml-auto mr-3 flex gap-2.5 text-[var(--app-text-color-muted-blue-gray)]">
          <Minus className="size-[18px] opacity-60" />
          <Flag className="mt-0.5 size-3 opacity-60" />
        </div>
      </div>

      <div className="body"></div>

      <div className="footer"></div>
    </div>
  );
};

export default NestedCommentSystem;
