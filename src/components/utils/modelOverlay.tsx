const ModelOverlay: React.FC<{
  children?: React.ReactNode;
  zIndex?: number;
  blackBgHalfOpacity?: boolean;
  blackBg?: boolean;
}> = ({ children, zIndex = 999, blackBgHalfOpacity, blackBg = false }) => {
  const background = blackBgHalfOpacity
    ? "bg-black/50"
    : blackBg
      ? "bg-[var(--app-text-color-primary)]"
      : "bg-[var(--app-background-overlay-transparent-black)]";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[${zIndex}] ${background}`}
    >
      {children}
    </div>
  );
};

export default ModelOverlay;
