'use client';

import { apiClient } from "@/library/helper";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaEnvelope, FaLock, FaShoppingBag, FaGoogle } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/reducers/UserReducers";
import { syncCart } from "@/redux/reducers/CartReducer";
import { Suspense, useEffect, useState } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [lsCart, setLsCart] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "null");
      setLsCart(storedCart?.items || []);
    } catch (error) {
      console.error("Invalid cart data:", error);
      setLsCart([]);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = { email, password };

    try {
      const response = await apiClient.post("/user/login", data, { withCredentials: true });

      if (response.data.flag !== 1) {
        toast.warning(response.data.msg || "Login failed", { autoClose: 2000 });
        return;
      }

      dispatch(loginUser({ data: response.data.user }));

      const localCartItems = lsCart || [];
      if (localCartItems.length > 0) {
        const cartResponse = await apiClient.post("/user/sync-cart", {
          user_id: response.data.user._id,
          local_cart: localCartItems,
        });

        if (cartResponse.data.flag === 1) {
          const cartItems = (cartResponse.data.finalUserCart || []).map((item) => {
            const product = item.product_id || {};
            return {
              id: product._id,
              name: product.name,
              price: product.discounted_price ?? product.price,
              original_price: product.original_price ?? product.price,
              quantity: item.quantity,
              // image_path: product.image_name || "",
                productImg: product.image_name
    ? `${process.env.NEXT_PUBLIC_ASSET_PATH}/images/product/main_images/${product.image_name}`
    : "",
            };
          });

          let totalPrice = 0;
          let totalOriginalPrice = 0;
          cartItems.forEach((item) => {
            totalPrice += Number(item.price || 0) * Number(item.quantity || 0);
            totalOriginalPrice += Number(item.original_price || 0) * Number(item.quantity || 0);
          });

          dispatch(syncCart({ items: cartItems, totalOriginalPrice, totalPrice }));
        }
      } else {
        dispatch(syncCart({ items: [], totalOriginalPrice: 0, totalPrice: 0 }));
      }

      router.push(searchParams.get("redirect") || "/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while logging in", { autoClose: 2000 });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-[35px] bg-white shadow-2xl lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 text-white p-16">

            <div className="flex items-center gap-4">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-lg">
                <FaShoppingBag className="text-4xl" />
              </div>

              <div>
                <h1 className="text-5xl font-bold">eCommerce</h1>
                <p className="text-teal-100 mt-2">
                  Shop Smart • Live Better
                </p>
              </div>

            </div>

            <h2 className="mt-16 text-4xl font-bold leading-tight">
              Welcome Back!
            </h2>

            <p className="mt-6 text-lg text-teal-100 leading-8">
              Login to manage your orders, wishlist, payments and discover
              thousands of amazing products.
            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur">

                <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-teal-600 font-bold">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Fast Delivery
                  </h3>

                  <p className="text-teal-100 text-sm">
                    Delivery within 24 Hours
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur">

                <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-teal-600 font-bold">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Secure Payments
                  </h3>

                  <p className="text-teal-100 text-sm">
                    100% Protected Checkout
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur">

                <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-teal-600 font-bold">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Premium Quality
                  </h3>

                  <p className="text-teal-100 text-sm">
                    Trusted Brands Worldwide
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center bg-white p-8 md:p-14">

            <div className="w-full max-w-md">

              <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-teal-500 to-cyan-500 shadow-xl">

                  <FaShoppingBag className="text-3xl text-white" />

                </div>

                <h2 className="mt-6 text-4xl font-bold text-slate-800">
                  Welcome Back
                </h2>

                <p className="mt-3 text-slate-500">
                  Login to your account
                </p>

              </div>

              <form onSubmit={submitHandler}
                className="mt-10 space-y-6">

                {/* Email */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="flex items-center rounded-2xl border border-slate-300 bg-slate-50 px-5">

                    <FaEnvelope className="text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="w-full bg-transparent px-4 py-4 outline-none"
                    />

                  </div>

                </div>

                {/* Password */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="flex items-center rounded-2xl border border-slate-300 bg-slate-50 px-5">

                    <FaLock className="text-slate-400" />

                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent px-4 py-4 outline-none"
                    />

                  </div>

                </div>

                {/* Remember */}

                <div className="flex items-center justify-between text-sm">

                  <label className="flex items-center gap-2">

                    <input
                      type="checkbox"
                      className="accent-teal-600"
                    />

                    Remember me

                  </label>

                  <Link
                    href="#"
                    className="font-semibold text-teal-600 hover:text-teal-700"
                  >
                    Forgot Password?
                  </Link>

                </div>

                {/* Login Button */}

                <button type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 py-4 font-semibold text-white shadow-xl transition hover:scale-[1.02]"
                >
                  Sign In
                </button>

                {/* Divider */}

                <div className="flex items-center gap-4">

                  <div className="h-px flex-1 bg-slate-300"></div>

                  <span className="text-sm text-slate-500">
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

                <p className="text-center text-sm text-slate-600">

                  Don't have an account?

                  <Link
                    href="/register"
                    className="ml-2 font-bold text-teal-600 hover:text-teal-700"
                  >
                    Register
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

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}