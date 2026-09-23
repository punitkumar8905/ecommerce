"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaCog,
  FaChartBar,
  FaFile,
  
} from "react-icons/fa";
import { FaColonSign } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen = true }) => {
  const pathname = usePathname();
  const admin = useSelector((state) => state.admin );

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin",
    },
    {
      name: "Category",
      icon: <FaFile />,
      path: "/admin/category",
    },
    {
      name: "Colors",
      icon: <FaColonSign />,
      path: "/admin/color",
    },
      {
      name: "Brand",
      icon: <FaChartBar />,
      path: "/admin/brand",
    },
    {
      name: "Product",
      icon: <FaBoxOpen />,
      path: "/admin/product",
    },
      {
      name: "User",
      icon: <FaUsers />,
      path: "/admin/user",
    },
    {
      for: 0,
      name: "Admins",
      icon: <FaUsers />,
      path: "/admin/admin-listing",
    },
  
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <aside
      className={`bg-slate-900 text-white h-screen w-64 fixed left-0 top-0 transition-transform duration-300 z-50
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold">AdminPanel</h1>
      </div>

      {/* Menu */}
      <nav className="mt-6">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path;
          if(item.for !== undefined){
          if(item.for !== admin.data?.role) {
            return null;
          }}

          return (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                isActive
                  ? "bg-slate-400 border-r-4 border-blue-500 text-black font-semibold"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;