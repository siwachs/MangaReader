import { Dispatch, SetStateAction, useRef, useState } from "react";
import ReactDom from "react-dom";
import { useSession } from "next-auth/react";
import useOutsideClick from "@/hooks/useOutsideClick";

import { makePostPutRequest } from "@/service/asyncApiCalls";
import ModelOverlay from "@/components/utils/modelOverlay";

const menuButtonClasses =
  "h-16 w-full border-b border-[var(--app-border-color-light-gray)] p-4 text-base font-bold";

const SetAvatar: React.FC<{
  isSetAvatarOpen: boolean;
  setIsSetAvatarOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isSetAvatarOpen, setIsSetAvatarOpen }) => {
  const [images, setImages] = useState<string[]>([]);

  const avatarMenuRef = useRef<HTMLDivElement>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);

  useOutsideClick(avatarMenuRef, isSetAvatarOpen, () => {
    setIsSetAvatarOpen(false);
  });

  const updateImagesSelecction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files || null;
    if (!selectedImages) return;
  };

  return (
    <ModelOverlay>
      <div
        ref={avatarMenuRef}
        className="fixed bottom-0 left-0 right-0 z-[9999] mx-auto max-w-[690px] rounded-t-2xl bg-[var(--app-bg-color-primary)]"
      >
        <button className={menuButtonClasses}>View Full Size</button>

        <input
          ref={filePickerRef}
          onChange={updateImagesSelecction}
          type="file"
          multiple
          hidden
          accept="image/*"
        />
        <button
          onClick={() => filePickerRef.current?.click()}
          className={menuButtonClasses}
        >
          Select From Gallery
        </button>

        <div className="h-2 w-full bg-gray-200" />

        <button
          onClick={() => setIsSetAvatarOpen(false)}
          className={menuButtonClasses}
        >
          Cancel
        </button>
      </div>
    </ModelOverlay>
  );
};

export default SetAvatar;
