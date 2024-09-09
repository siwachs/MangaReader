"use client";

import { useState, useCallback, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import useBodyOverflow from "@/hooks/useBodyOverflow";

import getKeydownEvent from "@/libs/eventHandlers/getKeydownEvent";
import ModelOverlay from "@/components/utils/modelOverlay";
import LoadingSkeleton from "@/components/utils/loadingSkeleton";

import { FaChevronRight } from "react-icons/fa";
import {
  MdOutlineSettings,
  MdOutlineMail,
  MdOutlineBookmarkAdded,
  MdAdminPanelSettings,
} from "react-icons/md";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiLike } from "react-icons/bi";

// Dynamic Imports
const SetUsername = dynamic(() => import("./_components/setUsername"), {
  ssr: false,
  loading: () => (
    <ModelOverlay>
      <div className="mx-auto mt-[92px] h-[203.6px] w-[90%] max-w-[690px] animate-pulse rounded-lg bg-gray-400 md:mt-36 md:h-[211.6px]" />
    </ModelOverlay>
  ),
});
const SetGender = dynamic(() => import("./_components/setGender"), {
  ssr: false,
  loading: () => (
    <ModelOverlay>
      <div className="fixed bottom-0 left-0 right-0 z-[9999] mx-auto h-72 max-w-[690px] animate-pulse rounded-t-2xl bg-gray-400" />
    </ModelOverlay>
  ),
});
const SetAvatar = dynamic(() => import("./_components/setAvatar"), {
  ssr: false,
  loading: () => (
    <ModelOverlay>
      <div className="fixed bottom-0 left-0 right-0 z-[9999] mx-auto h-[200px] max-w-[690px] animate-pulse rounded-t-2xl bg-gray-400" />
    </ModelOverlay>
  ),
});
const ImagePreviewAndUploadTool = dynamic(
  () => import("@/components/imagePreviewAndUploadTool"),
  {
    ssr: false,
    loading: () => <ModelOverlay useAsLoader />,
  },
);

export default function AccountPage() {
  const session = useSession();
  const currentUrl = usePathname();
  const { status, data } = session;

  const [avatarImage, setAvatarImage] = useState<string[]>([]);
  const [modalState, setModalState] = useState({
    isSetAvatarOpen: false,
    isSetUsernameOpen: false,
    isSetGenderOpen: false,
  });

  useBodyOverflow(
    avatarImage.length > 0 ||
      modalState.isSetAvatarOpen ||
      modalState.isSetUsernameOpen ||
      modalState.isSetGenderOpen,
  );

  const openModal = useCallback(
    (modal: "isSetAvatarOpen" | "isSetUsernameOpen" | "isSetGenderOpen") => {
      setModalState((prevState) => ({ ...prevState, [modal]: true }));
    },
    [],
  );

  const closeModal = useCallback(
    (modal: "isSetAvatarOpen" | "isSetUsernameOpen" | "isSetGenderOpen") => {
      setModalState((prevState) => ({ ...prevState, [modal]: false }));
    },
    [],
  );

  useEffect(() => {
    if (
      status === "authenticated" &&
      !data?.user?.username &&
      !modalState.isSetAvatarOpen
    ) {
      openModal("isSetUsernameOpen");
    }
  }, [data?.user?.username, status, modalState.isSetUsernameOpen]);

  if (status === "loading") return <LoadingSkeleton />;

  if (status === "authenticated") {
    const { avatar, name, username, gender, id, isAdmin } = data.user;

    return (
      <div className="mx-auto h-[calc(100vh-60px)] max-w-[690px] overflow-auto px-5 pb-5 pt-2.5 md:h-[calc(100vh-120px)] md:pb-[30px]">
        <div className="flex items-center justify-end gap-5">
          <Link
            href={`/accounts/${username}/notifications`}
            className="relative"
          >
            <MdOutlineMail className="size-6" />
            <span className="absolute -right-1.5 top-0 flex size-3.5 items-center justify-center rounded-full bg-[var(--app-text-color-bright-pink)] text-xs text-white">
              1
            </span>
          </Link>
          <Link href={`/accounts/${username}/setting`}>
            <MdOutlineSettings className="size-6" />
          </Link>
        </div>

        <div className="mt-2.5 flex gap-5">
          <Image
            src={avatar ?? "/assests/person.png"}
            alt={name ?? "user-avatar"}
            width={52}
            height={52}
            className="size-[50px] rounded-full object-cover object-center"
          />
          <h3 className="select-none text-xl font-bold">{name ?? "Not Set"}</h3>
        </div>

        <div className="soft-edge-shadow mt-3.5 rounded-[10px]">
          <ProfileInformationRow
            title="Avatar"
            onClick={() => openModal("isSetAvatarOpen")}
            ariaLabel="Open SetAvatar"
            childrenIsText={false}
          >
            <Image
              src={data.user.avatar ?? "/assests/person.png"}
              alt={data.user.name ?? "Not Set"}
              width={46}
              height={46}
              className="size-9 rounded-full object-cover object-center"
            />
          </ProfileInformationRow>

          <ProfileInformationRow
            title="Username"
            onClick={() => openModal("isSetUsernameOpen")}
            ariaLabel="Open SetUsername"
          >
            {username ?? "Not Set"}
          </ProfileInformationRow>

          <ProfileInformationRow
            title="Gender"
            onClick={() => openModal("isSetGenderOpen")}
            ariaLabel="Open SetGender"
          >
            {gender ?? "Not Set"}
          </ProfileInformationRow>

          <ProfileInformationRow title="ID" clientInteractable={false}>
            {id?.slice(-8)}
          </ProfileInformationRow>
        </div>

        <div className="soft-edge-shadow mt-3.5 rounded-[10px]">
          {isAdmin && (
            <ProfileLinkRow
              iconSize="size-[30px]"
              href="/admin/content"
              Icon={MdAdminPanelSettings}
              title="Add Manga|Anime|comics|manhwa|manhua"
            />
          )}
          <ProfileLinkRow
            href={`/accounts/${username}/comments`}
            Icon={TfiCommentAlt}
            title="My Comments"
          />
          <ProfileLinkRow
            href={`/accounts/${username}/bookmarks`}
            Icon={MdOutlineBookmarkAdded}
            title="My Bookmarks"
          />
          <ProfileLinkRow
            href={`/accounts/${username}/chapters`}
            Icon={BiLike}
            title="Liked Chapters"
          />
        </div>

        {avatarImage.length > 0 && (
          <ImagePreviewAndUploadTool
            images={avatarImage}
            goBackCallback={() => setAvatarImage([])}
            title="User Avatar"
          />
        )}

        {modalState.isSetAvatarOpen && (
          <SetAvatar
            setAvatarImage={setAvatarImage}
            isSetAvatarOpen={modalState.isSetAvatarOpen}
            setIsSetAvatarOpen={() => closeModal("isSetAvatarOpen")}
          />
        )}

        {modalState.isSetUsernameOpen && (
          <SetUsername
            isSetUsernameOpen={modalState.isSetUsernameOpen}
            setIsSetUsernameOpen={() => closeModal("isSetUsernameOpen")}
          />
        )}

        {modalState.isSetGenderOpen && (
          <SetGender
            isSetGenderOpen={modalState.isSetGenderOpen}
            setIsSetGenderOpen={() => closeModal("isSetGenderOpen")}
          />
        )}
      </div>
    );
  }

  return signIn("google", { callbackUrl: currentUrl });
}

const ProfileInformationRow: React.FC<{
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  childrenIsText?: boolean;
  clientInteractable?: boolean;
}> = memo(
  ({
    title,
    children,
    onClick,
    ariaLabel,
    childrenIsText = true,
    clientInteractable = true,
  }) => {
    const role = onClick ? "button" : undefined;
    const tabIndex = onClick ? 0 : undefined;
    const keyDownEvent = getKeydownEvent(onClick);

    return (
      <div className="flex h-14 items-center justify-between border-b border-gray-200 p-4">
        <h3 className="select-none font-bold">{title}</h3>

        <div
          tabIndex={tabIndex}
          role={role}
          onClick={onClick}
          onKeyDown={keyDownEvent}
          aria-label={ariaLabel}
          className={`flex ${clientInteractable ? "cursor-pointer select-none" : "select-none"} items-center gap-1`}
        >
          {childrenIsText ? (
            <h3 className="text-slate-600">{children}</h3>
          ) : (
            children
          )}

          {clientInteractable && (
            <FaChevronRight className="size-3.5 text-gray-500/70" />
          )}
        </div>
      </div>
    );
  },
);

const ProfileLinkRow: React.FC<{
  href: string;
  Icon: any;
  iconSize?: string;
  title: string;
}> = memo(({ href, Icon, iconSize = "size-5", title }) => {
  return (
    <Link
      href={href}
      className="my-1 flex h-12 items-center gap-2.5 border-b border-gray-200 p-4"
    >
      <Icon className={iconSize} />
      <span className="select-none truncate font-bold">{title}</span>
    </Link>
  );
});
