"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  FiCheckCircle,
  FiPackage,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";
import Link from "next/link";

export default function OrderPlacedPage() {
  const { "order-id": orderId } = useParams();

  return (
    <main className="min-h-screen bg-[#f5f6fa]">

      {/* Top Border */}
      <div className="h-2 w-full bg-[#00a99d]" />

      <div className="mx-auto flex min-h-[calc(100vh-8px)] max-w-[1400px] items-center justify-center px-4 py-10">

        <div className="w-full max-w-[650px] rounded-xl bg-white p-6 text-center shadow-sm sm:p-10">

          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e6f7f5] text-[#00a99d]">
            <FiCheckCircle size={42} />
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-2xl font-bold text-gray-800 sm:text-3xl">
            Order Placed Successfully!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Thank you for your order. Your order has been successfully placed.
          </p>

          {/* Order ID */}
          <div className="mx-auto mt-7 max-w-[450px] rounded-lg border border-gray-200 bg-gray-50 p-5">

            <div className="flex items-center justify-center gap-2 text-gray-500">
              <FiPackage size={18} />

              <span className="text-xs font-semibold uppercase">
                Order ID
              </span>
            </div>

            <p className="mt-2 break-all text-lg font-bold text-[#00a99d]">
              #{orderId}
            </p>

          </div>

          {/* Info */}
          <div className="mt-6 text-sm text-gray-500">
            <p>
              You can use this Order ID to track your order.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/store"
              className="flex h-10 items-center justify-center gap-2 rounded-md bg-[#00a99d] px-6 text-xs font-bold text-white transition hover:bg-[#008f85]"
            >
              <FiShoppingBag size={14} />
              CONTINUE SHOPPING
            </Link>

            <Link
              href="/orders"
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-6 text-xs font-bold text-gray-700 transition hover:border-[#00a99d] hover:text-[#00a99d]"
            >
              TRACK ORDER
              <FiArrowRight size={14} />
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}