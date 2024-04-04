import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <Image
            src="/MangaToon.svg"
            alt="mangatoon"
            width={256}
            height={256}
            className="h-10 w-48"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
