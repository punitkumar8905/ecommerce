import React from "react";
import { FiChevronRight } from "react-icons/fi";

export default function BreadCrumb() {
  return (
    <div className="rounded-md bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs">
        <span className="cursor-pointer text-gray-500 transition hover:text-[#00a99d]">
          Home
        </span>

        <FiChevronRight className="text-gray-400" size={12} />

        <span className="cursor-pointer text-gray-500 transition hover:text-[#00a99d]">
          Pages
        </span>

        <FiChevronRight className="text-gray-400" size={12} />

        <span className="font-semibold text-gray-700">
          Cart
        </span>
      </div>
    </div>
  );
}