const Backdrop = ({ closeSideBar }) => {
  return (
    <div
      onClick={() => closeSideBar(false)}
      className="fixed left-0 top-0 z-10 h-full w-full transition-all duration-100 lg:hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    ></div>
  );
};

export default Backdrop;
