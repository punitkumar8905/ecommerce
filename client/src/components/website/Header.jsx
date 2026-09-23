'use client';

import { FiSearch, FiShoppingCart, FiPhone } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { lsToUser } from '@/redux/reducers/UserReducers';
import { logoutUser } from '@/redux/reducers/UserReducers';
import { clearCart } from '@/redux/reducers/CartReducer';

export default function Header() {
const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  const logoutHandler = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
  }

useEffect(() => {
  dispatch(lsToUser())
}, [dispatch]) 


  const cart = useSelector(store => store.cart);




  return (
    <header className=" sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Bar */}
      <div className="border-b border-gray-100 text-xs py-3 px-8 flex justify-between items-center text-gray-600">
        <div className="flex items-center gap-6">
          <span className="text-[#0bb59d] font-semibold flex items-center gap-2"><FiPhone size={14} /> (025) 3886 25 16</span>
          <span>Free Shipping Over $199</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="hover:text-[#0bb59d] transition">Sell on Swoo</button>
          <button className="hover:text-[#0bb59d] transition">Order Track</button>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#0bb59d] transition">
            USD <MdOutlineKeyboardArrowDown size={14} />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#0bb59d] transition">
            Eng <MdOutlineKeyboardArrowDown size={14} />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-5 px-8 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#0bb59d] rounded-lg flex items-center justify-center text-white font-bold text-lg">S</div>
          <div>
            <h1 className="font-bold text-lg leading-tight">SWOO</h1>
            <p className="text-[8px] tracking-widest text-gray-500">TECH MART</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-8 font-semibold text-gray-800 text-sm">
          <Link href="/" className="hover:text-[#0bb59d] transition">HOME</Link>
          <Link href="/store" className="hover:text-[#0bb59d] transition">STORE</Link>
          <Link href="/products" className="hover:text-[#0bb59d] transition">PRODUCTS</Link>
          <Link href="/contact" className="hover:text-[#0bb59d] transition">CONTACT</Link>
        </nav>

        {/* User & Cart */}
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase">Welcome</p>
            <div className="flex items-center gap-1">
              {
                user?.data? (
                  <>  
                  <div  className="font-semibold text-xs  cursor-pointer hover:text-[#0bb59d] transition"> 
                    {user.data.name.toUpperCase()} {" "}
                  </div>
                

                  {/* Logout button  */}
                  <br></br>
                  <div onClick={logoutHandler} className="font-semibold text-xs pt-6 cursor-pointer hover:text-[#0bb59d] transition" >
                    Logout
                  </div>
                
                  </>
                
                ): (
                   <Link href="/login" className="font-semibold text-xs cursor-pointer hover:text-[#0bb59d] transition">Login/Register</Link>
                )
              }
             
              {/* <span className="text-gray-400">/</span>
              <Link href="/register" className="font-semibold text-xs cursor-pointer hover:text-[#0bb59d] transition">Register</Link> */}
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 bg-[#e6f7f5] rounded-lg text-[#0bb59d] cursor-pointer hover:bg-[#d0eae7] transition">
              <Link href= "/cart"  >
              <FiShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cart.items.length}
                </span>
                </Link>
            </div>
            <div>
              {cart.items.length != 0 && <del> ${cart.totalOriginalPrice}</del>}
              {/* <p className="text-[10px] text-gray-500 uppercase">Cart</p> */}
              <p className="font-bold text-sm">${cart.totalPrice}</p>
            </div>
          </div>
        </div>
        
      </div>
    

      {/* Search Bar */}
      <div className="bg-[#0bb59d] px-8 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="bg-white text-gray-800 px-4 py-2.5 rounded-lg flex items-center gap-2 font-semibold whitespace-nowrap w-48">
            <span className="text-lg">☰</span> All Categories
          </div>
          <div className="flex-1 bg-white flex items-center px-4 py-2.5 rounded-lg">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full outline-none text-gray-800 text-sm placeholder-gray-400"
            />
            <FiSearch className="text-gray-400 cursor-pointer" size={18} />
          </div>
        </div>

        <div className="flex gap-12 text-xs font-semibold ml-8">
          <span className="flex items-center gap-2">✓ FREE SHIPPING OVER $199</span>
          <span className="flex items-center gap-2">✓ 30 DAYS MONEY BACK</span>
          <span className="flex items-center gap-2">✓ SECURE PAYMENT</span>
        </div>
      </div>
    </header>
  );
}