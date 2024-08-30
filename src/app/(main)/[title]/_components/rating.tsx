import { Star, StarSolid, HalfStarSolid } from "@/components/icons";

const Rating: React.FC<{ rating: number; mobileOnly?: boolean }> = ({
  rating,
  mobileOnly,
}) => {
  return (
    <div
      className={`items-center ${mobileOnly ? "mb-2 flex md:hidden" : "hidden md:flex"}`}
    >
      <span className="text-base font-bold md:mr-3 md:text-lg md:font-normal lg:text-[var(--app-text-color-standard-gray)]">
        {rating}
      </span>
      <span className="-mt-[1px] text-sm text-gray-300 md:hidden">  | </span>

      {[...new Array(5)].map((_, index) => {
        const uniqueKey = `star${index}`;
        const effectiveRating = index * 2;
        let StarIcon;

        if (Math.floor(rating) > effectiveRating) StarIcon = StarSolid;
        else if (rating > effectiveRating) StarIcon = HalfStarSolid;
        else StarIcon = Star;

        return (
          <StarIcon
            className="h-[15px] w-[15px] text-[var(--app-text-color-vibrant-golden)] md:h-[18px] md:w-[18px]"
            key={uniqueKey}
          />
        );
      })}
    </div>
  );
};

export default Rating;
