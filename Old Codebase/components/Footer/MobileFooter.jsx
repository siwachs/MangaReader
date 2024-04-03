import Link from "next/link";

import { Apple, Android } from "@mui/icons-material";

import ContactDetailsMobile from "./ContactDetailsMobile";

const MobileFooter = () => {
  return (
    <footer className="border-t border-[var(--border-color-footer-primary)] lg:hidden">
      <div className="my-5 h-auto">
        <div className="m-auto w-[80%] space-y-2.5 sm:space-y-3 md:space-y-4">
          <div className="text-center text-sm font-bold sm:text-base md:text-lg">
            Clone of Mangatoon!
          </div>

          <div className="text-center text-sm sm:text-base md:text-lg">
            Download MangaToon APP on App Store and Google Play
          </div>

          <div className="space-x-8 text-center sm:space-x-10">
            <Link href={"/"}>
              <Apple fontSize="large" />
            </Link>
            <Link href={"/"}>
              <Android fontSize="large" />
            </Link>
          </div>
        </div>
      </div>

      <div className="other-brands h-auto">
        <div className="px-8">
          <Link href={"/novels"}>
            <div className="mobile-footer-link border-t">NOVELTOON</div>
          </Link>
          <Link href={"/audiobooks"}>
            <div className="mobile-footer-link">AUDIOTOON</div>
          </Link>
        </div>
      </div>

      <div className="contact mt-8 border-b border-[var(--border-color-contact-section)] bg-[var(--bg-footer-mobile)]">
        <div className="contact-info mb-8 pt-5">
          <ContactDetailsMobile
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

          <ContactDetailsMobile
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

          <ContactDetailsMobile
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

      <div className="about flex min-h-[64px] items-center justify-center bg-[var(--bg-footer-mobile)]">
        <div className="text-center text-xs text-[var(--text-color-content)] sm:text-sm md:text-base">
          &copy;2022 - {new Date().getFullYear()} Company LTD. [
          <a
            target="_blank"
            href={"/GoogleMapLink"}
            className="text-xs text-white sm:text-sm md:text-base"
          >
            Company Address
          </a>
          ]
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
