import { ArrowUpward } from "@mui/icons-material";

const MoveToTop = (props) => {
  return (
    <div className={`absolute overflow-hidden lg:block ${props.className}`}>
      <button
        style={{ width: "42px", height: "42px" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="border border-[var(--border-color-arrow)]"
      >
        <ArrowUpward />
      </button>
    </div>
  );
};

export default MoveToTop;
