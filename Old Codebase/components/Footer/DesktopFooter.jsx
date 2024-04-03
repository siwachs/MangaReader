import Image from "next/image";
import Link from "next/link";

import {
  Facebook,
  Instagram,
  Apple,
  Android,
  Email,
} from "@mui/icons-material";

import ContactRowDesktop from "./ContactRowDesktop";

const DesktopFooter = () => {
  return (
    <footer className="hidden w-full bg-[var(--bg-footer-desktop)] dark:border-t dark:bg-gray-900 lg:block">
      <div className="m-auto mb-10 flex w-full max-w-[1200px] justify-between overflow-hidden">
        <div className="mt-[30px] flex">
          <Image
            src="/assetsImages/footer.png"
            alt="footer-image"
            height={400}
            width={400}
            className="h-[328px] w-[332px] object-contain dark:brightness-90"
          />

          <div className="ml-[30px]">
            <div className="mt-5 whitespace-nowrap text-lg font-bold">
              Clone of Mangatoon!
            </div>

            <div className="mt-12 text-center text-6xl">
              <Link href={"/"} className="mb-5 block">
                <Apple fontSize="inherit" />
              </Link>
              <Link href={"/"}>
                <Android fontSize="inherit" />
              </Link>
            </div>
          </div>
        </div>

        <div className="split-line mt-[60px] h-[241px] w-0 border-2 border-[var(--color-split-line)]"></div>

        <div className="contact mt-[30px] overflow-hidden">
          <div className="contact-info-wrapper mx-auto mb-[20px] mt-[20px] space-y-5">
            <ContactRowDesktop
              Icon={Email}
              title={"Email"}
              contactDetails={[
                {
                  title: "Support",
                  href: "mailto:support@gmail.com",
                  contact: "support@gmail.com",
                },
                {
                  title: "Send your comics to email",
                  href: "mailto:contribute@gmail.com",
                  contact: "contribute@gmail.com",
                },
              ]}
            />

            <ContactRowDesktop
              Icon={Facebook}
              title={"Facebook"}
              contactDetails={[
                {
                  title: "English",
                  newTab: true,
                  href: "https://www.instagram.com",
                  contact: "@usernameFacebook",
                },
              ]}
            />

            <ContactRowDesktop
              Icon={Instagram}
              title={"INS"}
              contactDetails={[
                {
                  title: "Instagram",
                  newTab: true,
                  href: "https://www.instagram.com",
                  contact: "@usernameInstagram",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="about flex min-h-[64px] items-center justify-center bg-[var(--color-split-line)] dark:border-t dark:bg-gray-900">
        <div className="text-center text-sm text-[var(--text-color-black-secondary)] dark:text-white">
          &copy;2022 - {new Date().getFullYear()} Company LTD. [
          <a target="_blank" href="/">
            Company Address
          </a>
          ]
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
