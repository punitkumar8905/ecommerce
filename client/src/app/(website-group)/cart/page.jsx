'use client';

import React from "react";

import BreadCrumb from "@/components/website/BreadCrumb";
import CartItem from "@/components/website/CartItem";
import OrderSummary from "@/components/website/OrderSummary";
import { useSelector } from "react-redux";

const cartProducts = [
  {
    id: 1,
    name: "SROK Smart Phone 128GB, Oled Retina",
    image: "/images/product/mobile.png",
    price: "$579.00",
    rating: 152,
    badge: "SAVE $199.00",
    shipping: "FREE SHIPPING",
    freeGift: false,
  },

  {
    id: 2,
    name: "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB",
    image: "/images/product/tab.png",
    price: "$979.00",
    rating: 0,
    badge: "NEW",
    shipping: "$2.98 SHIPPING",
    freeGift: false,
  },

  {
    id: 3,
    name: "Samsung Galaxy X6 Ultra LTE 4G/128 Gb, Black Smartphone",
    image: "/images/product/phone.png",
    price: "$659.00",
    rating: 5,
    badge: "NEW",
    shipping: "FREE SHIPPING",
    freeGift: true,
  },
];

export default function CartPage() {

  const cart = useSelector((store) => store.cart);

  return (
    <main className="min-h-screen bg-[#f5f6fa]">

      {/* Top Border */}
      <div className="h-2 w-full bg-[#00a99d]" />

      <div className="mx-auto w-full max-w-[1400px] px-2 py-3 sm:px-4 md:px-6">

        {/* ================= BREADCRUMB ================= */}

        <BreadCrumb />

        {/* ================= CART AREA ================= */}

        <div className="mt-3 rounded-md bg-white p-3 shadow-sm sm:p-5 lg:p-7">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

            {/* ================= LEFT ================= */}

            <section className="min-w-0 flex-1">

              {cart?.items?.length === 0 ? (
                <div className="bg-white rounded-xl p-6 text-center text-gray-500">
                  your cart is empty
                </div>
              ) : (
                cart?.items?.map((item) => {
                  const image = item.productImg || (item.image_path ? `${process.env.NEXT_PUBLIC_ASSET_PATH}${item.image_path}` : "");

                  return (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      image={image}
                      name={item.name}
                      price={`$${item.price}`}
                      original_price={item.original_price}
                      rating={item.rating || 0}
                      badge={item.original_price && item.price ? `SAVE $${item.original_price - item.price}` : "NEW"}
                      badgeColor='bg-green-500'
                      shipping='free shipping'
                      quantity={item.quantity}
                    />
                  );
                })
              )}

            </section>

            {/* ================= RIGHT ================= */}

            <OrderSummary flag={0} original_price={cart?.totalOriginalPrice} price={cart?.totalPrice} />

          </div>

        </div>

      </div>

    </main>
  );
}