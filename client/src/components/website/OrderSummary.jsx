'use client'

import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { toLocalPrice } from "@/library/helper";
import { useSelector } from "react-redux";
import store from "@/redux/Store";
import { useRouter } from "next/navigation";

export default function OrderSummary({orderPlaceHandler = null,flag, original_price, price }) {
  //  flag -> 0: from cart page / 1 : from checkout page
  const router = useRouter();
  const user = useSelector((store) => store.user);


  const checkoutHandler = () =>{
    if(!user?.data){
      router.push("/login?redirect=/cart")
    }else{
      router.push("/checkout");
    }
    
  }
  return (
    <aside className="w-full lg:w-[290px] xl:w-[310px]">

      <div className="rounded-md border border-[#69d28a] bg-white p-5 sm:p-6">

        {/* Heading */}
        <h2 className="mb-5 text-sm font-bold text-gray-800">
          Order Summary
        </h2>

        {/* Sub Total */}
        <div className="flex items-center justify-between border-b border-gray-100 py-3 text-[10px]">
          <span className="text-gray-500">
             Total:
          </span>

          <span className="font-semibold text-gray-800">
          
            ${toLocalPrice(original_price)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between border-b border-gray-100 py-3 text-[10px]">
          <span className="text-gray-500">
            Discount:
          </span>

          <span className="font-semibold text-gray-800">
            ${toLocalPrice(original_price - price)}
          </span>
        </div>


        {/* Total */}
        <div className="flex items-center justify-between py-4">

          <span className="text-[10px] font-bold text-gray-700">
            ORDER TOTAL:
          </span>

          <span className="text-xs font-bold text-gray-900">
            ${toLocalPrice(price)}
          </span>

        </div>

        {
          flag === 0 ? (
              <button onClick={checkoutHandler} className="mx-auto flex h-9 w-[100px] items-center justify-center gap-2 rounded-md bg-[#00a99d] text-[8px] font-bold text-white transition hover:bg-[#008f85]">

          <FiShoppingCart size={10} />

          CHECKOUT

        </button>
          ): (
             <button onClick={orderPlaceHandler} className="mx-auto flex h-9 w-[100px] items-center justify-center gap-2 rounded-md bg-[#00a99d] text-[8px] font-bold text-white transition hover:bg-[#008f85]">

          <FiShoppingCart size={10} />

          Place Order

        </button>
          )
        }

        {/* Checkout */}
       

      </div>

    </aside>
  );
}