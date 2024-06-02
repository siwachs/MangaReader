"use client";

import Image from "next/image";

const UserProfile: React.FC<{
  status: "loading" | "authenticated" | "unauthenticated";
  avatarUrl: string | null | undefined;
  profileName: string | undefined | null;
  width?: number;
  height?: number;
  callbackUrl?: string;
}> = ({
  status,
  avatarUrl,
  profileName,
  width = 40,
  height = 40,
  callbackUrl = "",
}) => {
  return status === "loading" ? (
    <div className="h-full w-full animate-pulse rounded-full bg-gray-400" />
  ) : (
    <div className="relative">
      <Image
        src={avatarUrl || "/assets/person.png"}
        alt={profileName || "user-profile"}
        width={width}
        height={height}
        className="h-full w-full cursor-pointer rounded-full object-cover object-center"
      />
    </div>
  );
};

export default UserProfile;
