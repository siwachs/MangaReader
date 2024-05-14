import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import {
  ArrowBackIos,
  ArrowDropDownCircle,
  ShareOutlined,
  Favorite,
  Info,
  Cancel,
  FavoriteBorder,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import SelectChapters from "./SelectChapters";

const Navbar = ({ chapterTitle, contentTitle, populatedChapters }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const content_id = router.query.content_id;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 w-full bg-white dark:bg-gray-900 ${
          !isVisible ? "-top-16 lg:-top-28" : "top-0"
        }`}
        style={{ transition: "top 0.3s" }}
      >
        <div className="mx-auto flex h-[3.75rem] w-full max-w-[1500px] items-center lg:h-[6.25rem]">
          <div className="left flex-1 cursor-pointer pl-5 text-xl font-bold text-slate-600 md:text-2xl lg:flex lg:items-center lg:text-4xl lg:text-[var(--text-color-darkred)]">
            <ArrowBackIos
              onClick={() =>
                router.push(
                  `/${contentTitle.replaceAll(
                    " ",
                    "-"
                  )}?content_id=${content_id}`
                )
              }
              fontSize="inherit"
            />

            <Image
              onClick={() => router.push("/")}
              src="/MangaToon.svg"
              height={50}
              width={200}
              alt="logoImage"
              className="ml-16 hidden h-[2.5rem] w-48 lg:block"
            />
          </div>

          <div className="middle mt-[0.125rem] w-1/2 overflow-hidden">
            <div className="flex justify-center text-[var(--text-color-black-secondary)] dark:text-white">
              <Tooltip arrow title={chapterTitle}>
                <div className="one-line-text mr-[0.4375rem] text-[0.9375rem] font-medium sm:text-base md:text-[1.0625rem] lg:text-xl">
                  {chapterTitle}
                </div>
              </Tooltip>

              <div
                className="-mt-[0.125rem] cursor-pointer text-base md:text-[1.0625rem] lg:ml-[0.125rem] lg:text-xl"
                style={{ color: "grey" }}
                onClick={() => setOpenDropDown((prev) => !prev)}
              >
                {!openDropDown ? (
                  <ArrowDropDownCircle fontSize="inherit" />
                ) : (
                  <Cancel fontSize="inherit" />
                )}
              </div>
            </div>

            <Tooltip arrow title={contentTitle}>
              <div
                className="one-line-text text-center text-xs md:text-[0.8125rem] lg:text-sm"
                style={{ color: "grey" }}
              >
                {contentTitle}
              </div>
            </Tooltip>
          </div>

          <div className="right flex-1 space-x-2 pr-[0.9375rem] text-right text-[1.0625rem] sm:text-lg md:space-x-2.5 md:text-xl lg:space-x-6 lg:pr-5">
            <span className="btn-1 watchPage-button">
              <ShareOutlined fontSize="inherit" />
              <span className="watchPage-button-text">Share</span>
            </span>

            <span className="btn-2 watchPage-button">
              {true ? (
                <FavoriteBorder fontSize="inherit" />
              ) : (
                <Favorite fontSize="inherit" />
              )}
              {true ? (
                <span className="watchPage-button-text">Like</span>
              ) : (
                <span className="watchPage-button-text">Remove</span>
              )}
            </span>

            <span
              style={{ color: "grey" }}
              className="btn-3 cursor-pointer lg:text-[1.625rem]"
            >
              <Info fontSize="inherit" />
            </span>
          </div>
        </div>
      </header>

      <SelectChapters
        openDropDown={openDropDown}
        setOpenDropDown={setOpenDropDown}
        populatedChapters={populatedChapters}
      />
    </>
  );
};

export default Navbar;
