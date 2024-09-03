import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";

const Rating: React.FC<{ rating: number; mobileOnly?: boolean }> = ({
  rating,
  mobileOnly,
}) => {
  return (
    <div
      className={`items-center ${mobileOnly ? "mb-2 flex md:hidden" : "hidden md:flex"}`}
    >
      <span className="text-base font-bold md:mr-3 md:text-lg md:font-normal lg:text-gray-600">
        {rating}
      </span>

      <span className="-mt-[1px] text-sm text-gray-300 md:hidden">  | </span>

      {[...new Array(5)].map((_, index) => {
        const uniqueKey = `star${index}`;
        const effectiveRating = index * 2;
        let StarIcon;

        if (Math.floor(rating) > effectiveRating) StarIcon = FaStar;
        else if (rating > effectiveRating) StarIcon = FaStarHalfStroke;
        else StarIcon = FaRegStar;

        return (
          <StarIcon
            className="mx-0.5 size-[15px] text-yellow-400 md:size-[18px]"
            key={uniqueKey}
          />
        );
      })}
    </div>
  );
};

export default Rating;
