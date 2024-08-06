const ModelOverlay: React.FC<{
  children: React.ReactNode;
  zIndex?: string;
}> = ({ children, zIndex = 999 }) => {
  return (
    <div
      className={`absolute left-0 top-0 h-full w-full z-[${zIndex}] bg-[var(--app-background-overlay-transparent-black)]`}
    >
      {children}
    </div>
  );
};

export default ModelOverlay;
