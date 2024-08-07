const ModelOverlay: React.FC<{
  children?: React.ReactNode;
  zIndex?: string;
}> = ({ children, zIndex = 999 }) => {
  return (
    <div
      className={`absolute inset-0 z-[${zIndex}] bg-[var(--app-background-overlay-transparent-black)]`}
    >
      {children}
    </div>
  );
};

export default ModelOverlay;
