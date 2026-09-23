'use client'
import React from "react";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateQuantity } from "@/redux/reducers/CartReducer";

export default function CartItem({
    id,
    original_price,
  image,
  name,
  price,
  rating,
  badge,
  shipping,
  quantity,
  freeGift = false,
}) {

    const dispatch = useDispatch();

    const incHandler = () => {
        dispatch(updateQuantity({id, price, original_price, flag: "0"}))
    }

    const desHandler = () => {
        dispatch(updateQuantity({id, original_price, price, flag:1}))
    }
  return (
    <div className="relative flex min-h-[180px] gap-4 border-b border-gray-100 py-7 last:border-b-0 sm:gap-7">

      {/* ================= IMAGE ================= */}
      <div className="relative flex h-[130px] w-[110px] shrink-0 items-center justify-center sm:h-[150px] sm:w-[140px]">

        {/* Badge */}
        <div className="absolute left-0 top-0 z-10 rounded bg-[#0bbf45] px-2 py-1 text-[7px] font-bold leading-tight text-white sm:text-[8px]">
          {badge}
        </div>

        <img
          src={image}
          alt={name}
          className="max-h-[125px] max-w-[115px] object-contain sm:max-h-[140px] sm:max-w-[130px]"
        />
      </div>

      {/* ================= PRODUCT INFO ================= */}
      <div className="min-w-0 flex-1 pt-2">

        {/* Rating */}
        <div className="mb-1 text-[8px] text-gray-400">
          ({rating})
        </div>

        {/* Product Name */}
        <h3 className="max-w-[400px] text-[10px] font-bold leading-5 text-gray-900 sm:text-xs">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-1 text-sm font-bold text-gray-900 sm:text-base">
          {price}
        </div>

        {/* Quantity */}
        <div className="mt-3 flex h-7 w-[58px] items-center justify-between rounded border border-gray-200 bg-white">

          <button onClick={desHandler} className="flex h-full w-5 items-center justify-center text-gray-500 hover:text-black">
            <FiMinus size={9} />
          </button>

          <span className="text-[10px] font-semibold">
            {quantity}
          </span>

          <button onClick={incHandler} className="flex h-full w-5 items-center justify-center text-gray-500 hover:text-black">
            <FiPlus size={9} />
          </button>

        </div>

        {/* Shipping */}
        <div className="mt-3 flex flex-wrap gap-2">

          <span className="rounded bg-green-50 px-2 py-1 text-[7px] font-semibold text-green-600">
            {shipping}
          </span>

          {freeGift && (
            <span className="rounded bg-red-50 px-2 py-1 text-[7px] font-semibold text-red-500">
              FREE GIFT
            </span>
          )}

        </div>

        {/* Stock */}
        <div className="mt-2 flex items-center gap-1 text-[8px] text-gray-600">

          <FaCheckCircle
            className="text-green-500"
            size={8}
          />

          <span>In stock</span>

        </div>
      </div>

      {/* ================= COLOR OPTIONS ================= */}
      <div className="absolute right-1 top-7 flex gap-2 sm:right-5">

        <span className="h-4 w-4 rounded-full bg-[#e9ebf2] ring-1 ring-gray-100" />

        <span className="h-4 w-4 rounded-full bg-[#fff0f0] ring-1 ring-red-100" />

      </div>

      {/* ================= DELETE ================= */}
      <button className="absolute bottom-7 right-1 text-gray-300 transition hover:text-red-500">
        <FiTrash2 size={13} />
      </button>

    </div>
  );
}

