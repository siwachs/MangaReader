const ContentWrapper = ({ children }) => {
  return (
    <div className="mt-5 grid grid-cols-3 gap-x-[2%] gap-y-5 overflow-hidden md:gap-4 lg:mt-[30px] lg:flex lg:flex-wrap lg:gap-[30px]">
      {children}
    </div>
  );
};

export default ContentWrapper;
