'use client';
import store from "@/redux/Store";
import React, { useEffect } from "react";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
// import {useSidebar} from "./SidebarContext"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutAdmin, lsToAdmin } from "@/redux/reducers/AdminReducers";


const Header = ({ setSidebarOpen }) => {
  const dispatcher = useDispatch(); 
  const  admin = useSelector(store => store.admin);
  const router = useRouter();
  
  const logoutHandler = () => {
    dispatcher(logoutAdmin());
    router.push("/admin/login")
  };


  useEffect(() => {
    const lsAdmin = localStorage.getItem("admin");
    if(lsAdmin == null) {
      router.push("/admin/login");
    }else{
      dispatcher(lsToAdmin());
    }
  },[])




  // const {isOpen} = useSidebar();

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
        //   onClick={() => setSidebarOpen((prev) => !prev)}
        //   className="lg:hidden text-xl"
        >
          <FaBars />
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg w-96">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-3 w-full"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative text-xl">
          <FaBell />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-3xl text-gray-600" />
          <div className="hidden md:block">
            <h3 className="font-semibold">{admin.data?.name}</h3>
            <p className="text-xs text-gray-500">
              {admin.data?.email}
            </p>
          </div>
        </div>
        <button
          onClick={logoutHandler}
          className="ml-2 bg-blue-500 text-blue px-3 py-1 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;