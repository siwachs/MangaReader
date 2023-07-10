import { Fragment } from "react";

import Link from "next/link";

const ContactDetailsMobile = ({ title, contactDetails }) => {
  return (
    <div className="contact-item mb-3">
      <div className="mt-5 h-5 text-center text-base font-[500] leading-5 text-white sm:text-lg sm:leading-6 md:text-xl md:leading-7">
        {title}
      </div>

      {contactDetails.map((item, index) => (
        <Fragment key={index}>
          <div className="mt-3 h-5 text-center text-xs text-[var(--text-color-content)] sm:text-sm md:mt-4 md:text-base">
            {item.title}
          </div>

          <div className="mt-[3px] h-5 text-center text-xs text-[var(--text-color-contact)] sm:mt-[5px] sm:text-sm md:mt-[7px] md:text-base">
            {item.newTab ? (
              <a target="_blank" href={item.href}>
                {item.contact}
              </a>
            ) : (
              <Link href={item.href}>{item.contact}</Link>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default ContactDetailsMobile;
