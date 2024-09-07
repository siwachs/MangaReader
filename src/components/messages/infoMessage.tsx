const InfoMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mx-auto my-5 max-w-[1200px] rounded bg-blue-300 p-3.5 text-blue-600 md:my-[30px] md:text-lg">
      {children}
    </div>
  );
};

export default InfoMessage;
