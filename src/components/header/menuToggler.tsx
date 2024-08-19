"use client";

import ReactDom from "react-dom";
import { useState } from "react";

import Sidebar from "./sidebar";

import { FaBars } from "react-icons/fa6";

const MenuToggler: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return isSidebarOpen ? (
    ReactDom.createPortal(
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={toggleSidebar}
      />,
      document.getElementById("sidebar-portal") as HTMLElement,
    )
  ) : (
    <FaBars
      tabIndex={0}
      role="button"
      onClick={toggleSidebar}
      className="absolute left-5 top-0.5 size-5 text-gray-500/70 lg:hidden"
    />
  );
};

export default MenuToggler;
