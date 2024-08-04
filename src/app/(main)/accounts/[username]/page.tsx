"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import useDebounce from "@/hooks/useDebounce";

import { makeGetRequest, makePostPutRequest } from "@/service/asyncApiCalls";

import { FaChevronRight } from "react-icons/fa";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";

const checkUsenameEndpoint = process.env
  .NEXT_PUBLIC_API_ENDPOINT_CHECK_USERNAME as string;
const claimUsernameEndpoint = process.env
  .NEXT_PUBLIC_API_ENDPOINT_CLAIM_USERNAME as string;

const initialUsernameQuery: {
  loading: boolean;
  usernameAvailable: null | boolean;
  error: null | string;
} = {
  loading: false,
  usernameAvailable: null,
  error: null,
};
const debouncedUsernameQueryDelay = 300;

export default function AccountPage() {
  const session = useSession();
  const currentUrl = usePathname();
  const { status, data } = session;

  if (status === "loading")
    return <div className="h-[calc(100vh-60px)] animate-pulse bg-gray-400" />;

  if (status === "authenticated")
    return (
      <>
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
      </>
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
      <h3 className="select-none">{title}</h3>

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

const Username: React.FC<{}> = () => {
  return <div></div>;
};
