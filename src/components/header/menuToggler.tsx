"use client";

import { createPortal } from "react-dom";
import { useState } from "react";
import dynamic from "next/dynamic";

import ModelOverlay from "../utils/modelOverlay";

import { FaBars } from "react-icons/fa6";

// Dynamic Imports
const Sidebar = dynamic(() => import("./sidebar"), {
  ssr: false,
  loading: () => (
    <ModelOverlay blackBgHalfOpacity>
      <div className="fixed inset-0 w-[80%] max-w-sm animate-pulse bg-gray-400" />
    </ModelOverlay>
  ),
});

const MenuToggler: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return isSidebarOpen ? (
    createPortal(
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
