'use client';

import { apiClient } from "@/library/helper";
import { loginUser } from "@/redux/reducers/UserReducers";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaShoppingBag,
} from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;
    if(password !== confirm_password){

    }else{
      const data = {name, email, password };
      apiClient.post("/user/register", data,
        {
        withCredentials: true,   
      }
      )
      .then((response) => {
        if(response.data.flag == 1){
          dispatch(loginUser({data:response.data.user}));
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 relative overflow-hidden">

      {/* Background */}

      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">

        <div className="grid w-full max-w-7xl overflow-hidden rounded-[35px] bg-white shadow-2xl lg:grid-cols-2">

          {/* LEFT */}

          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-teal-600 to-cyan-500 text-white p-16">

            <div className="flex items-center gap-4">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20">

                <FaShoppingBag className="text-4xl" />

              </div>

              <div>

                <h1 className="text-5xl font-bold">
                  eCommerce
                </h1>

                <p className="mt-2 text-teal-100">
                  Create Your Account
                </p>

              </div>

            </div>

            <h2 className="mt-16 text-4xl font-bold leading-tight">
              Join Our Store Today
            </h2>

            <p className="mt-6 text-lg text-teal-100 leading-8">
              Register and get access to premium shopping,
              exclusive offers, order tracking and much more.
            </p>

          </div>

          {/* RIGHT */}

          <div className="bg-white p-8 md:p-12">

            <div className="mx-auto max-w-lg">

              <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-teal-500 to-cyan-500">

                  <FaShoppingBag className="text-3xl text-white" />

                </div>

                <h2 className="mt-6 text-4xl font-bold text-slate-800">
                  Create Account
                </h2>

                <p className="mt-2 text-slate-500">
                  Join our ecommerce family
                </p>

              </div>

              <form onSubmit={formSubmitHandler} className="mt-10 space-y-5">

                {/* Name */}

                <div>

                  <label className="mb-2 block font-semibold text-slate-700">
                    Full Name
                  </label>

                  <div className="flex items-center rounded-2xl border bg-slate-50 px-4">

                    <FaUser className="text-slate-400" />

                    <input
                    name="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-transparent px-4 py-4 outline-none"
                    />

                  </div>

                </div>

                {/* Email */}

                <div>

                  <label className="mb-2 block font-semibold text-slate-700">
                    Email
                  </label>

                  <div className="flex items-center rounded-2xl border bg-slate-50 px-4">

                    <FaEnvelope className="text-slate-400" />

                    <input
                    name="email"
                      type="email"
                      placeholder="john@gmail.com"
                      className="w-full bg-transparent px-4 py-4 outline-none"
                    />

                  </div>

                </div>

                {/* Phone */}

               

                                {/* Password */}

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="flex items-center rounded-2xl border bg-slate-50 px-4">

                    <FaLock className="text-slate-400" />

                    <input
                    name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className="w-full bg-transparent px-4 py-4 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-slate-500" />
                      ) : (
                        <FaEye className="text-slate-500" />
                      )}
                    </button>

                  </div>

                </div>

                {/* Confirm Password */}

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Confirm Password
                  </label>

                  <div className="flex items-center rounded-2xl border bg-slate-50 px-4">

                    <FaLock className="text-slate-400" />

                    <input
                    name="confirm_password"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full bg-transparent px-4 py-4 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? (
                        <FaEyeSlash className="text-slate-500" />
                      ) : (
                        <FaEye className="text-slate-500" />
                      )}
                    </button>

                  </div>

                </div>

                {/* Password Strength */}

                <div>

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">
                      Password Strength
                    </span>

                    <span className="font-semibold text-teal-600">
                      Strong
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">

                    <div className="h-full w-4/5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>

                  </div>

                </div>

                {/* Terms */}

                <label className="flex items-start gap-3 text-sm text-slate-600">

                  <input
                    type="checkbox"
                    className="mt-1 accent-teal-600"
                  />

                  <span>
                    I agree to the
                    <Link
                      href="#"
                      className="mx-1 font-semibold text-teal-600"
                    >
                      Terms &
                    </Link>

                    <Link
                      href="#"
                      className="font-semibold text-teal-600"
                    >
                      Privacy Policy
                    </Link>
                  </span>

                </label>

                {/* Register Button */}

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 py-4 font-semibold text-white shadow-xl transition duration-300 hover:scale-[1.02]"
                >
                  Create Account
                </button>

                {/* Divider */}

                <div className="flex items-center gap-4">

                  <div className="h-px flex-1 bg-slate-300"></div>

                  <span className="text-slate-500 text-sm">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-slate-300"></div>

                </div>

                {/* Google */}

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 py-4 font-semibold transition hover:bg-slate-100"
                >
                  <FaGoogle className="text-red-500" />

                  Continue with Google

                </button>

                {/* Footer */}

                <p className="text-center text-slate-600 text-sm">

                  Already have an account?

                  <Link
                    href="/login"
                    className="ml-2 font-bold text-teal-600 hover:text-teal-700"
                  >
                    Login
                  </Link>

                </p>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}