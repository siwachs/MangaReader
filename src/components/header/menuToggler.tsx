"use client";

import { useState } from "react";
import ReactDom from "react-dom";

import { Bars3 } from "../icons";
import Sidebar from "./sidebar";

const MenuToggler: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
