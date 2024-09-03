const getBackgroundAndMobileOnlyClasses = (
  blackBgHalfOpacity?: boolean,
  blackBg?: boolean,
  mobileOnly?: boolean,
  useAsLoader?: boolean,
) => {
  let backgroundClass = "";

  if (useAsLoader) {
    backgroundClass = "bg-gray-400 animate-pulse";
  } else if (blackBgHalfOpacity) {
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
  useAsLoader?: boolean;
}> = ({
  children,
  zIndex = 9999,
  blackBgHalfOpacity,
  blackBg = false,
  mobileOnly = false,
  useAsLoader = false,
}) => {
  const backgroundAndMobileOnlyClasses = getBackgroundAndMobileOnlyClasses(
    blackBgHalfOpacity,
    blackBg,
    mobileOnly,
    useAsLoader,
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
