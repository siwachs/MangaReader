import { Fragment } from "react";

import Link from "next/link";

const ContactRowDesktop = ({ Icon, title, contactDetails }) => {
  return (
    <div className="contact-item mb-[10px] flex items-center">
      <div className="contact-item-left ml-[30px] w-[200px] text-center">
        <Icon />
        <div className="text-sm font-medium">{title}</div>
      </div>

      <div className="contact-item-right">
        {contactDetails.map((item, index) => (
          <Fragment key={index}>
            <div className="h-5 text-sm leading-4">{item.title}</div>
            <div className="mb-[5px] h-5 text-sm leading-4 text-[var(--text-color-contact)]">
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
    </div>
  );
};

export default ContactRowDesktop;
