import { AiOutlineLoading } from "react-icons/ai";

const LoadingSpinner: React.FC<{
  loaderRef?: React.RefObject<HTMLDivElement>;
  hideLoader?: boolean;
}> = ({ loaderRef, hideLoader }) => {
  return (
    <div
      ref={loaderRef}
      className={`my-5 ${hideLoader ? "hidden" : ""} text-[var(--app-text-color-bright-pink)]`}
    >
      <AiOutlineLoading className="mx-auto size-8 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
