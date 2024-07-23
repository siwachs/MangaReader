import { useState, useEffect } from "react";

const mobileKeywords = [
  "Mobile",
  "iPhone",
  "Android",
  "Windows Phone",
  "BlackBerry",
];

export default function useMobileDetect(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const userAgent = navigator.userAgent;

    setIsMobile(mobileKeywords.some((keyword) => userAgent.includes(keyword)));
  }, []);

  return isMobile;
}
