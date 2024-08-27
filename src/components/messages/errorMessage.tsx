const ErrorMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="mx-auto my-5 max-w-[1200px] rounded bg-red-300 p-3.5 text-red-600 md:my-[30px] md:text-lg">
      {children}
    </div>
  );
};

export default ErrorMessage;
