import Image from "next/image";
import Link from "next/link";

import {
  Search,
  HomeOutlined,
  MenuBookOutlined,
  EmojiEventsOutlined,
  CreateOutlined,
  AdminPanelSettingsOutlined,
  AccountCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

import { encrypt } from "@/lib/encryption";

import { useSession, signOut, signIn } from "next-auth/react";

const SideBar = ({ setIsSideBarOpen }) => {
  const { status, data } = useSession();

  return (
    <aside className="hide-scrollbar fixed left-0 top-0 z-20 h-screen w-[80%] max-w-[300px] overflow-scroll bg-white dark:bg-gray-900 lg:hidden">
      <div className="ml-[1.5625rem] h-[1.875rem] py-7">
        <Image
          src="/MangaToon.svg"
          width={150}
          height={100}
          alt="logoImage"
          className="max-w-[132px]"
        />
      </div>

      {/* SearchBox Dummy */}
      <Link href="/search" onClick={() => setIsSideBarOpen(false)}>
        <div className="m-5 flex h-10 items-center justify-between rounded-[10px] border border-[var(--border-color-secondary)] px-2.5 text-lg text-[var(--placeholder-color)] dark:border-white dark:text-white sm:h-11 sm:px-3 md:h-12 md:px-3.5">
          Search for content
          <Search />
        </div>
      </Link>

      <div className="mx-5">
        <SideBarNavLink
          Icon={HomeOutlined}
          title="Home"
          path={"/"}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <SideBarNavLink
          Icon={MenuBookOutlined}
          title="Content"
          path={"/genre/tags/all"}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        {status === "authenticated" && (
          <SideBarNavLink
            Icon={AccountCircleOutlined}
            title="User Profile"
            path={`/user-profile?uid=${encrypt(data?.user.uid)}`}
            setIsSideBarOpen={setIsSideBarOpen}
          />
        )}
        {status === "authenticated" && data?.user.isAdmin && (
          <SideBarNavLink
            Icon={AdminPanelSettingsOutlined}
            title="Admin Dashboard"
            path={"/admin"}
            setIsSideBarOpen={setIsSideBarOpen}
          />
        )}
        <SideBarNavLink
          Icon={EmojiEventsOutlined}
          title="Contribute"
          textColor
          path={"/contribute"}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <SideBarNavLink
          Icon={CreateOutlined}
          title="Publish Your Work"
          textColor
          path={"/publish-your-work"}
          setIsSideBarOpen={setIsSideBarOpen}
        />

        {status === "authenticated" ? (
          <SideBarNavLink
            Icon={LogoutOutlined}
            title="Sign Out"
            setIsSideBarOpen={setIsSideBarOpen}
            signOutButton
          />
        ) : (
          <SideBarNavLink
            Icon={LoginOutlined}
            title="Sign In"
            setIsSideBarOpen={setIsSideBarOpen}
            signInButton
          />
        )}
      </div>
    </aside>
  );
};

const SideBarNavLink = ({
  Icon,
  title,
  textColor,
  path,
  setIsSideBarOpen,
  signInButton,
  signOutButton,
}) => {
  return (
    <Wrapper
      path={path}
      setIsSideBarOpen={setIsSideBarOpen}
      signInButton={signInButton}
      signOutButton={signOutButton}
    >
      <div className="flex h-[3.75rem] items-center space-x-3 border-b text-base md:text-lg">
        <Icon />
        <span
          className={`font-medium ${
            textColor ? "text-[var(--text-color)]" : ""
          }`}
        >
          {title}
        </span>
      </div>
    </Wrapper>
  );
};

const Wrapper = ({
  path,
  setIsSideBarOpen,
  signOutButton,
  signInButton,
  children,
}) => {
  const handler = () => {
    setIsSideBarOpen(false);
    if (signOutButton) {
      signOut({
        callbackUrl: "/",
      });
    } else if (signInButton) {
      signIn("google");
    }
  };

  return path ? (
    <Link href={path} onClick={() => setIsSideBarOpen(false)}>
      {children}
    </Link>
  ) : (
    <button className="w-full" onClick={handler}>
      {children}
    </button>
  );
};

export default SideBar;
