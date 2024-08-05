"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import { FaChevronRight } from "react-icons/fa";
import {
  MdOutlineSettings,
  MdOutlineMail,
  MdOutlineBookmarkAdded,
} from "react-icons/md";
import { TfiCommentAlt, TfiCommentsSmiley } from "react-icons/tfi";
import { BiLike } from "react-icons/bi";

export default function AccountPage() {
  const session = useSession();
  const currentUrl = usePathname();
  const { status, data } = session;

  if (status === "loading")
    return <div className="h-[calc(100vh-60px)] animate-pulse bg-gray-400" />;

  if (status === "authenticated")
    return (
      <div className="mx-auto max-w-[690px] px-5">
        <div className="flex items-center justify-end gap-4">
          <Link href="/" className="relative">
            <MdOutlineMail className="size-6" />
            <span className="absolute -right-1.5 -top-0 flex size-3.5 items-center justify-center rounded-full bg-[var(--app-text-color-vibrant-pink)] text-xs text-white">
              1
            </span>
          </Link>

          <Link href="/">
            <MdOutlineSettings className="size-6" />
          </Link>
        </div>

        <div className="mt-2.5 flex gap-5">
          <Image
            src={data.user.avatar ?? "/assests/person.png"}
            alt={data.user.name ?? "user-avatar"}
            width={52}
            height={52}
            className="size-[50px] cursor-pointer rounded-full object-center"
          />

          <h3 className="select-none text-xl font-bold">{data.user.name}</h3>
        </div>

        <div className="soft-edge-shadow mt-3.5 rounded-[10px]">
          <ProfileInformationRow title="Avatar" childrenIsText={false}>
            <Image
              src={data.user.avatar ?? "/assests/person.png"}
              alt={data.user.name ?? "user-avatar"}
              width={46}
              height={46}
              className="size-9 rounded-full object-cover"
            />
          </ProfileInformationRow>

          <ProfileInformationRow title="Username">
            {data.user.username}
          </ProfileInformationRow>

          <ProfileInformationRow title="Gender">Not Set</ProfileInformationRow>

          <ProfileInformationRow title="ID" clientInteractable={false}>
            {data.user.id ? data.user.id?.slice(-8) : "Undefined"}
          </ProfileInformationRow>
        </div>

        <div className="soft-edge-shadow mt-3.5 rounded-[10px]">
          <ProfileLinkRow href="/" Icon={TfiCommentAlt} title="My Comments" />
          <ProfileLinkRow
            href="/"
            Icon={MdOutlineBookmarkAdded}
            title="My Bookmarks"
          />
          <ProfileLinkRow
            href="/"
            Icon={TfiCommentsSmiley}
            title="My Comments Reaction"
          />
          <ProfileLinkRow href="/" Icon={BiLike} title="Liked Chapters" />
        </div>
      </div>
    );

  return signIn("google", { callbackUrl: currentUrl });
}

const ProfileInformationRow: React.FC<{
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
  childrenIsText?: boolean;
  clientInteractable?: boolean;
}> = ({
  title,
  children,
  onClick,
  childrenIsText = true,
  clientInteractable = true,
}) => {
  const role = onClick ? "button" : undefined;
  const tabIndex = onClick ? 0 : undefined;
  const onKeydown = onClick
    ? (e: React.KeyboardEvent) => {
        if (e.key === "Enter") onClick();
      }
    : undefined;

  return (
    <div className="flex h-14 items-center justify-between border-b border-[var(--app-border-color-light-gray)] p-4">
      <h3 className="select-none font-bold">{title}</h3>

      <div
        tabIndex={tabIndex}
        role={role}
        onClick={onClick}
        onKeyDown={onKeydown}
        className={`flex ${clientInteractable ? "cursor-pointer" : ""} items-center gap-1`}
      >
        {childrenIsText ? (
          <h3 className="select-none text-slate-600">{children}</h3>
        ) : (
          children
        )}

        {clientInteractable && (
          <FaChevronRight className="size-3.5 text-[var(--app-text-color-stone-gray)]" />
        )}
      </div>
    </div>
  );
};

const ProfileLinkRow: React.FC<{
  href: string;
  Icon: any;
  iconSize?: string;
  title: string;
}> = ({ href, Icon, iconSize = "size-5", title }) => {
  return (
    <Link
      href={href}
      className="my-1 flex h-12 items-center gap-2.5 border-b border-[var(--app-border-color-light-gray)] p-4"
    >
      <Icon className={iconSize} />
      <span className="select-none font-bold">{title}</span>
    </Link>
  );
};
