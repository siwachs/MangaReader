"use client";

import { Pencil } from "@/components/icons";

const EditRating = () => {
  return (
    <button
      onClick={() => {}}
      className="ml-2.5 text-[var(--app-text-color-neutral-gray)] lg:text-[var(--app-text-color-crimson)]"
    >
      <Pencil className="h-3.5 w-3.5 lg:h-[17px] lg:w-[17px]" strokeWidth={2} />
    </button>
  );
};

export default EditRating;
