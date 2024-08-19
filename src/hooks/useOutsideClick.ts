import { useEffect } from "react";

export default function useOutsideClick(
  ref: React.RefObject<HTMLDivElement> | React.RefObject<HTMLFormElement>,
  isOpen: boolean,
  callback: () => void,
) {
  useEffect(() => {
    const handleOutsideClicks = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target as Node)) callback();
    };

    const onPressEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") callback();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClicks);
      document.addEventListener("keydown", onPressEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClicks);
      document.removeEventListener("keydown", onPressEscapeKey);
    };
  }, [ref, callback, isOpen]);
}
