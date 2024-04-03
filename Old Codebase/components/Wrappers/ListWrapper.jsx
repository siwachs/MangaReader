const ListWrapper = ({
  children,
  addMargin,
  setPosition,
  customClasses,
  changeMaxwidth,
  removeBottomMargin,
}) => {
  return (
    <div
      className={`mx-auto w-[90%] overflow-hidden lg:w-full ${
        !removeBottomMargin ? "lg:mb-[30px]" : "lg:pb-[30px]"
      } ${addMargin ? addMargin : ""}`}
    >
      <div
        className={`mx-auto my-5 w-full max-w-[1200px] lg:my-[30px] ${
          setPosition ? setPosition : ""
        } ${customClasses ? customClasses : ""} ${
          changeMaxwidth ? changeMaxwidth : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ListWrapper;
