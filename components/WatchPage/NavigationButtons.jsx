import ThemeModeButton from "@/lib/Frontend-utils/ThemeModeButton";
import { useRouter } from "next/router";

const NavigationButtons = ({
  setThemeSwitch,
  content_id,
  addMargin,
  index,
  populatedChapters,
  totalChapters,
}) => {
  const router = useRouter();

  return (
    <div
      className={`h-[3.125rem] w-full sm:h-[3.75rem] md:h-[4.375rem] lg:h-[6.25rem] ${
        addMargin ? "mb-5 mt-3" : "mt-[3.75rem] lg:mt-[6.25rem]"
      }`}
    >
      <div className="relative mx-auto flex h-full max-w-[899px] items-center justify-around px-[10%] py-0">
        <button
          disabled={index === 0}
          className="watchPage-pagination-button"
          onClick={() =>
            router.push(
              `/watch/${content_id}/${populatedChapters[index - 1]._id}`
            )
          }
        >
          <span>Previous Chapter</span>
        </button>
        <button
          disabled={index + 1 === totalChapters}
          className="watchPage-pagination-button"
          onClick={() =>
            router.push(
              `/watch/${content_id}/${populatedChapters[index + 1]._id}`
            )
          }
        >
          <span>Next Chapter</span>
        </button>

        {setThemeSwitch && (
          <div className="absolute right-3">
            <ThemeModeButton inherit size="text-2xl md:text-3xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;
