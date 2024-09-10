const LoadingSkeleton: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 z-[999] h-1 w-full overflow-hidden bg-gray-200">
      <div className="loading-bar h-full bg-[var(--app-text-color-crimson)]" />
    </div>
  );
};

export default LoadingSkeleton;
