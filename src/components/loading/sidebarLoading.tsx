import { Bars3 } from "../icons";

const SidebarLoading: React.FC = () => {
  return (
    <Bars3 className="absolute left-5 top-0.5 h-[25px] w-[25px] animate-pulse cursor-not-allowed text-[var(--app-text-color-medium-gray)] lg:hidden" />
  );
};

export default SidebarLoading;
