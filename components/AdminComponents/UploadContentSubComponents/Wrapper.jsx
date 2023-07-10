const Wrapper = ({ children, title, loader, textInput, selectField }) => {
  return (
    <div
      className={`rounded-[8px] bg-white p-2 dark:brightness-95 sm:p-3.5 ${
        loader || textInput || selectField
          ? "flex items-center justify-center"
          : ""
      }`}
    >
      {title && (
        <h3 className="text-lg font-bold lg:mb-1.5 lg:text-xl">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Wrapper;
