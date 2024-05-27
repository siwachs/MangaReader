"use client";

import { useRef, useEffect } from "react";

import { ArrowUp } from "@/components/icons";

const ScrollToTop: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!buttonRef.current) return;

      if (window.scrollY >= 60) {
        buttonRef.current.style.opacity = "1";
        buttonRef.current.style.pointerEvents = "auto";
      } else {
        buttonRef.current.style.opacity = "0";
        buttonRef.current.style.pointerEvents = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="pointer-events-none fixed bottom-8 right-[calc(((100vw-800px)/2)-70px)] box-content h-[42px] w-[42px] bg-white opacity-0 transition-opacity"
    >
      <div className="box-content flex h-full w-full items-center justify-center border">
        <ArrowUp strokeWidth={2.3} />
      </div>
    </button>
  );
};

export default ScrollToTop;
