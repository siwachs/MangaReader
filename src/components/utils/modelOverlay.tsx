const ModelOverlay: React.FC<{
  children?: React.ReactNode;
  zIndex?: string;
}> = ({ children, zIndex = 999 }) => {
  return (
    <div
      aria-label="overlay-model"
      className={`absolute inset-0 z-[${zIndex}] bg-[var(--app-background-overlay-transparent-black)]`}
    >
      {children}
    </div>
  );
};

export default ModelOverlay;
