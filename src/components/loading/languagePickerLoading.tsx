import { ChevronDown } from "../icons";

const LanguagePickerLoading: React.FC = () => {
  return (
    <div className="absolute right-5 top-0.5 animate-pulse md:relative md:right-0 md:top-0">
      <button className="flex cursor-pointer select-none items-center gap-1 text-xs text-[var(--app-text-color-dark-gray)] md:text-sm">
        <span>English</span>
        <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
  );
};

export default LanguagePickerLoading;
