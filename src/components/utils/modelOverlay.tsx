const getBackgroundAndMobileOnlyClasses = (
  blackBgHalfOpacity?: boolean,
  blackBg?: boolean,
  mobileOnly?: boolean,
) => {
  let backgroundClass = "";
  if (blackBgHalfOpacity) {
    backgroundClass = "bg-black/50";
  } else if (blackBg) {
    backgroundClass = "bg-[var(--app-text-color-primary)]";
  } else {
    backgroundClass = "bg-[var(--app-background-overlay-transparent-black)]";
  }

  const mobileClass = mobileOnly ? "md:hidden" : "";

  return `${backgroundClass} ${mobileClass}`;
};

const ModelOverlay: React.FC<{
  children?: React.ReactNode;
  zIndex?: number;
  blackBgHalfOpacity?: boolean;
  blackBg?: boolean;
  mobileOnly?: boolean;
}> = ({
  children,
  zIndex = 9999,
  blackBgHalfOpacity,
  blackBg = false,
  mobileOnly = false,
}) => {
  const backgroundAndMobileOnlyClasses = getBackgroundAndMobileOnlyClasses(
    blackBgHalfOpacity,
    blackBg,
    mobileOnly,
  );

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[${zIndex}] ${backgroundAndMobileOnlyClasses}`}
    >
      {children}
    </div>
  );
};

export default ModelOverlay;
