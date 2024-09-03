import { ChaptersOrder as ChaptersOrderType } from ".";

const chaptersOrderBtnClasses =
  "select-none data-[active=true]:pointer-events-none data-[active=false]:cursor-pointer data-[active=true]:text-[var(--app-text-color-bright-pink)]";

const ChaptersOrder: React.FC<{
  mobileOnly?: boolean;
  order: ChaptersOrderType;
  changeOrderToReverse: () => void;
  changeOrderToPositive: () => void;
}> = ({ mobileOnly, order, changeOrderToReverse, changeOrderToPositive }) => {
  return (
    <div
      className={
        mobileOnly
          ? "flex items-center text-[13px] leading-4 md:hidden"
          : "mx-auto mb-6 hidden max-w-[1200px] items-center justify-end text-lg font-normal md:flex"
      }
    >
      <button
        onClick={changeOrderToReverse}
        className={chaptersOrderBtnClasses}
        data-active={order === "reverse"}
      >
        Reverse
      </button>

      <span className="mx-1 text-gray-300">|</span>

      <button
        onClick={changeOrderToPositive}
        className={chaptersOrderBtnClasses}
        data-active={order === "positive"}
      >
        Positive
      </button>
    </div>
  );
};

export default ChaptersOrder;
