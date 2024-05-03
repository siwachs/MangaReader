"use client";

import { Pencil } from "@/components/icons";

const EditRating = () => {
  return (
    <button
      onClick={() => {}}
      className="ml-2.5 text-[var(--app-text-color-neutral-gray)] lg:text-[var(--app-text-color-crimson)]"
    >
      <Pencil
        className="h-[14px] w-[14px] lg:h-[17px] lg:w-[17px]"
        strokeWidth={2}
      />
    </button>
  );
};

export default EditRating;
