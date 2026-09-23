'use client'
import { apiClient } from '@/library/helper';
import { loginAdmin } from '@/redux/reducers/AdminReducers';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Link from "next/link";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaArrowRight
} from "react-icons/fa";



export default function AdminLogin() {
    const router = useRouter()
    const dispatcher = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        apiClient.post("/admin/login", data)
        .then((response) => {
            if(response.data.flag == 1) {
                const admin_data = response.data.admin;
                dispatcher(loginAdmin({data: admin_data}));
                router.push("/admin/");
            }else{
                toast.error(response.data.msg)
            }
        }).catch((error) => {
            toast.error("An error occurred. Please try again.");
        })
    }
  return (
    /* Main Background matching the image's dark slate color */
    // <div className="w-[500px] bg-[#111827] items-center justify-center p-4 font-sans select-none">
      
    //   {/* White Card */}
    //   <div className="bg-white rounded-xl shadow-2xl w-full max-w-[420px] p-8 sm:p-10">
        
    //     {/* Header Section */}
    //     <div className="text-center mb-8">
    //       <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
    //         Admin Panel
    //       </h1>
    //       <p className="text-sm text-gray-500 mt-2">
    //         Sign in to your account
    //       </p>
    //     </div>

    //     {/* Form */}
    //     <form onSubmit={ submitHandler} className="space-y-5">
          
    //       {/* Email Address */}
    //       <div>
    //         <label 
    //           htmlFor="email" 
    //           className="block text-sm font-medium text-gray-700 mb-1.5"
    //         >
    //           Email Address
    //         </label>
    //         <input
    //           id="email"
    //           type="email"
    //           name='email'
              
    //          className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border border-[#d1e0ed] rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1d64ec] focus:border-transparent transition-all"
    //         />
    //       </div>

    //       {/* Password */}
    //       <div>
    //         <label 
    //           htmlFor="password" 
    //           className="block text-sm font-medium text-gray-700 mb-1.5"
    //         >
    //           Password
    //         </label>
    //         <input
    //           id="password"
    //           type="password"
    //           name='password'
              
    //           className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border border-[#d1e0ed] rounded-lg text-sm text-gray-800 tracking-widest focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1d64ec] focus:border-transparent transition-all"
    //         />
    //       </div>

    //       {/* Remember me & Forgot Password */}
    //       <div className="flex items-center justify-between pt-1">
    //         <div className="flex items-center">
    //           <input
    //             id="remember"
    //             type="checkbox"
    //             className="h-4 w-4 rounded border-gray-300 text-[#1d64ec] focus:ring-[#1d64ec] cursor-pointer"
    //           />
    //           <label 
    //             htmlFor="remember" 
    //             className="ml-2 block text-sm text-gray-600 cursor-pointer"
    //           >
    //             Remember me
    //           </label>
    //         </div>

    //         <a 
    //           href="#" 
    //           className="text-sm font-medium text-[#1d64ec] hover:underline"
    //         >
    //           Forgot password?
    //         </a>
    //       </div>

    //       {/* Sign In Button */}
    //       <div className="pt-2">
    //         <button
    //           type="submit"
    //           className="w-full bg-[#1d64ec] hover:bg-[#1652c8] text-white font-semibold py-3 px-4 rounded-lg text-sm shadow-md shadow-blue-500/10 transition duration-150 active:scale-[0.99]"
    //         >
    //           Sign In
    //         </button>
    //       </div>

    //     </form>

    //     {/* Footer Link */}
    //     <div className="mt-6 text-center text-sm text-gray-600">
    //       Not an admin?{' '}
    //       <a href="#" className="font-medium text-[#1d64ec] hover:underline">
    //         Go back
    //       </a>
    //     </div>

    //   </div>
    // </div>


     <div className="relative min-h-screen overflow-hidden bg-black-500">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute -left-32 -top-32 h-96 w-48 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute right-0 top-0 h-[500px] w-[300px] rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="absolute bottom-0 left-1/2 h-[400px] w-[300px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      </div>

      {/* Main */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5">

        <div className="grid w-full  max-w-xl overflow-hidden rounded border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,.5)] lg:grid-cols-2">

          {/* Left */}

          <div className="hidden lg:flex flex-col justify-center p-16 text-white">

            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl">

              <FaUserShield className="text-4xl" />

            </div>

            <h1 className="text-5xl font-bold leading-tight">

              Welcome
              <br />
              Back Admin

            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">

              Access your dashboard securely and manage products,
              categories, users, orders and analytics from one place.

            </p>

            <div className="mt-12 flex gap-4">

              <div className="rounded-2xl bg-white/10 px-6 py-5">

                <h2 className="text-3xl font-bold">100+</h2>

                <p className="mt-2 text-slate-300">

                  Products

                </p>

              </div>

              <div className="rounded-2xl bg-white/10 px-6 py-5">

                <h2 className="text-3xl font-bold">24/7</h2>

                <p className="mt-2 text-slate-300">

                  Secure

                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="bg-white p-8 sm:p-12">

            <div className="mx-auto max-w-md">

              <div className="mb-10 text-center">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">

                  <FaUserShield className="text-2xl" />

                </div>

                <h2 className="text-4xl font-bold text-slate-800">

                  Admin Login

                </h2>

                <p className="mt-3 text-slate-500">

                  Sign in to continue

                </p>

              </div>

              <form  onSubmit={submitHandler} className="space-y-6">

                {/* Email */}

                <div>

                  <label className="mb-2 block font-medium text-slate-700">

                    Email Address

                  </label>

                  <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">

                    <FaEnvelope className="text-slate-400" />

                    <input
                    id='email'
                      type="email"
                      name="email"
                      placeholder="admin@example.com"
                      className="w-full bg-transparent px-4 py-4 outline-none"
                    />

                  </div>

                </div>

                {/* Password */}

                <div>

                  <label className="mb-2 block font-medium text-slate-700">

                    Password

                  </label>

                  <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">

                    <FaLock className="text-slate-400" />

                    <input
                    id='password'
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent px-4 py-4 outline-none"
                    />

                  </div>

                </div>

                {/* Remember */}

                <div className="flex items-center justify-between">

                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">

                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-blue-600"
                    />

                    Remember me

                  </label>

                  <Link
                    href="#"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >

                    Forgot Password?

                  </Link>

                </div>

                {/* Button */}

                <button
                 
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >

                  Login

                  <FaArrowRight className="transition-all group-hover:translate-x-1" />

                </button>

              </form>

              <div className="mt-8 text-center text-sm text-slate-500">

                © 2026 Admin Dashboard

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}