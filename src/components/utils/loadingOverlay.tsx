const LoadingOverlay = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content, please wait"
      className="h-[calc(100vh-60px)] animate-pulse bg-gray-400 md:h-[calc(100vh-120px)]"
    />
  );
};

export default LoadingOverlay;
