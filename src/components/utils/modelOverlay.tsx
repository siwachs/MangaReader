const ModelOverlay: React.FC<{
  children?: React.ReactNode;
  zIndex?: number;
  blackBg?: boolean;
}> = ({ children, zIndex = 999, blackBg = false }) => {
  return (
    <div
      aria-label="overlay-model"
      className={`absolute inset-0 z-[${zIndex}] ${blackBg ? "bg-[#121212]" : "bg-[var(--app-background-overlay-transparent-black)]"}`}
    >
      {children}
    </div>
  );
};

export default ModelOverlay;
