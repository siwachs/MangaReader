"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import useBodyOverflow from "@/hooks/useBodyOverflow";

import LoadingOverlay from "@/components/utils/loadingOverlay";
import ImagePreviewAndUploadTool from "@/components/imagePreviewAndUploadTool";
import SetUsername from "./_components/setUsername";
import SetGender from "./_components/setGender";
import SetAvatar from "./_components/setAvatar";

import createKeydownEvent from "@/libs/eventHandlers/createKeydownEvent";

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

  const [avatarImage, setAvatarImage] = useState<string[]>([]);
  const [isSetAvatarOpen, setIsSetAvatarOpen] = useState(false);
  const [isSetUsernameOpen, setIsSetUsernameOpen] = useState(false);
  const [isSetGenderOpen, setIsSetGenderOpen] = useState(false);
  useBodyOverflow(
    avatarImage.length > 0 ||
      isSetAvatarOpen ||
      isSetUsernameOpen ||
      isSetGenderOpen,
  );

  if (status === "loading") return <LoadingOverlay />;

  if (status === "authenticated")
    return (
      <div className="mx-auto h-[calc(100vh-60px)] max-w-[690px] overflow-auto px-5 md:h-[calc(100vh-120px)]">
        <div className="mt-2.5 flex items-center justify-end gap-4">
          <Link href="/" className="relative">
            <MdOutlineMail className="size-6" />
            <span className="absolute -right-1.5 top-0 flex size-3.5 items-center justify-center rounded-full bg-[var(--app-text-color-vibrant-pink)] text-xs text-white">
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
            alt={data.user.name!}
            width={52}
            height={52}
            className="size-[50px] cursor-pointer rounded-full object-center"
          />

          <h3 className="select-none text-xl font-bold">{data.user.name}</h3>
        </div>

        <div className="soft-edge-shadow mt-3.5 rounded-[10px]">
          <ProfileInformationRow
            title="Avatar"
            onClick={() => setIsSetAvatarOpen(true)}
            ariaLabel="Open SetAvatar"
            childrenIsText={false}
          >
            <Image
              src={data.user.avatar ?? "/assests/person.png"}
              alt={data.user.name!}
              width={46}
              height={46}
              className="size-9 rounded-full object-cover"
            />
          </ProfileInformationRow>

          <ProfileInformationRow
            title="Username"
            onClick={() => setIsSetUsernameOpen(true)}
            ariaLabel="Open Setusername"
          >
            {data.user.username ?? "Not Set"}
          </ProfileInformationRow>

          <ProfileInformationRow
            title="Gender"
            onClick={() => setIsSetGenderOpen(true)}
            ariaLabel="Open SetGender"
          >
            {data.user.gender ?? "Not Set"}
          </ProfileInformationRow>

          <ProfileInformationRow title="ID" clientInteractable={false}>
            {data.user.id?.slice(-8)}
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

        {avatarImage.length > 0 && (
          <ImagePreviewAndUploadTool
            images={avatarImage}
            goBackCallback={() => setAvatarImage([])}
            title="Tales of Demons and Gods"
          />
        )}

        {isSetAvatarOpen && (
          <SetAvatar
            setAvatarImage={setAvatarImage}
            isSetAvatarOpen={isSetAvatarOpen}
            setIsSetAvatarOpen={setIsSetAvatarOpen}
          />
        )}

        {isSetUsernameOpen && (
          <SetUsername
            isSetUsernameOpen={isSetUsernameOpen}
            setIsSetUsernameOpen={setIsSetUsernameOpen}
          />
        )}

        {isSetGenderOpen && (
          <SetGender
            isSetGenderOpen={isSetGenderOpen}
            setIsSetGenderOpen={setIsSetGenderOpen}
          />
        )}
      </div>
    );

  return signIn("google", { callbackUrl: currentUrl });
}

const ProfileInformationRow: React.FC<{
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  childrenIsText?: boolean;
  clientInteractable?: boolean;
}> = ({
  title,
  children,
  onClick,
  ariaLabel,
  childrenIsText = true,
  clientInteractable = true,
}) => {
  const role = onClick ? "button" : undefined;
  const tabIndex = onClick ? 0 : undefined;

  return (
    <div className="flex h-14 items-center justify-between border-b border-[var(--app-border-color-light-gray)] p-4">
      <h3 className="select-none font-bold">{title}</h3>

      <div
        tabIndex={tabIndex}
        role={role}
        onClick={onClick}
        onKeyDown={() => createKeydownEvent(onClick)}
        aria-label={ariaLabel}
        className={`flex ${clientInteractable ? "cursor-pointer select-none" : "select-none"} items-center gap-1`}
      >
        {childrenIsText ? (
          <h3 className="text-slate-600">{children}</h3>
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
