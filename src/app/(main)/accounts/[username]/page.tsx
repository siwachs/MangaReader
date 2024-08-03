"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import { FaChevronRight } from "react-icons/fa";

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
  childrenIsText?: boolean;
  clientInteractable?: boolean;
}> = ({
  title,
  children,
  childrenIsText = true,
  clientInteractable = true,
}) => {
  return (
    <div className="flex h-14 items-center justify-between border-b border-[var(--app-border-color-light-gray)] p-4">
      <h3 className="select-none">{title}</h3>

      <div
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
