import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = ({ applyShadow }) => {
  return (
    <>
      <MobileHeader applyShadow={applyShadow} />
      <DesktopHeader />
    </>
  );
};

export default Header;
