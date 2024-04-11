"use client";

import { useState, useEffect } from "react";
import ReactDom from "react-dom";

import Bars3 from "../icons/Bars3";
import Sidebar from "./sidebar";

const MenuToggler: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return sidebarOpen && document.getElementById("sidebar-portal") ? (
    ReactDom.createPortal(
      <Sidebar closeSidebar={setSidebarOpen} />,
      document.getElementById("sidebar-portal")!,
    )
  ) : (
    <Bars3
      onClick={() => setSidebarOpen((prev) => !prev)}
      classNames="h-[25px] w-[25px] text-[var(--app-text-color-medium-gray)] absolute left-5 top-0.5 cursor-pointer lg:hidden"
    />
  );
};

export default MenuToggler;
