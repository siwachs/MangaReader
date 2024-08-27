const Error: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-16 max-w-[360px] items-center justify-center rounded bg-red-300 p-2 text-red-600">
      {children}
    </div>
  );
};

export default Error;
