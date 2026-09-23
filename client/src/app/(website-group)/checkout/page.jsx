"use client";

import OrderSummary from "@/components/website/OrderSummary";
import { apiClient } from "@/library/helper";
import { clearCart } from "@/redux/reducers/CartReducer";
import store from "@/redux/Store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  FiPlus,
  FiMapPin,
  FiPhone,
  FiCreditCard,
  FiTruck,
  FiCheck,
  FiChevronRight,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";


/* =========================================================
   DELIVERY ADDRESS
========================================================= */

function DeliveryAddress({ user,
  selectedAddressIndex,
  setSelectedAddressIndex,}) {


  useEffect(() => {
    if(user?.data?.addresses){
      const defaultIndex = user.data.addresses.findIndex(
        (address) => address.is_default,
      ) 
      setSelectedAddressIndex(defaultIndex !== -1 ? defaultIndex : 0);
    }
  },[user]);

  
  return (
    <section className=" mt-5 rounded-md bg-white border border-gray-100 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f7f5] text-[#00a99d]">
            <FiMapPin size={17} />
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase text-gray-800">
              Delivery Address
            </h2>

            <p className="mt-1 text-[9px] text-gray-400">
              Select your delivery address
            </p>
          </div>

        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-[#00a99d] px-3 py-2 text-[9px] font-bold text-[#00a99d] transition hover:bg-[#00a99d] hover:text-white"
        >
          <FiPlus size={12} />
          ADD ADDRESS
        </button>

      </div>


      {/* Addresses */}

      <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 md:grid-cols-2">

        {/* Address 1 */}
        {
          user?.data?.addresses.map((address, i) => (
            <div
            onClick={() => setSelectedAddressIndex(i)}
            key = {i}
            className="relative rounded-md border-2 border-[#00a99d] bg-[#f8fffe] p-4"
            >         

          <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#00a99d] text-white">
            {/* {if is_default mark it} */}
             {selectedAddressIndex === i &&(
              <FiCheck size={11} />
             )}
            

          </div>

          <div className="mb-3 flex items-center gap-2">

            <span className="text-xs font-bold text-gray-800">
              {address.name}
            </span>

            <span className="rounded bg-[#e6f7f5] px-2 py-1 text-[7px] font-semibold text-[#00a99d]">
              HOME
            </span>

          </div>

          <p className="max-w-[300px] text-[10px] leading-5 text-gray-600">
           {address.street}, {address.city}, {address.state},{address.country} {address.zip}
          </p>

          <div className="mt-3 flex items-center gap-2 text-[9px] text-gray-500">
            <FiPhone size={11} />
            {address.contact}
          </div>

        </div>
          ))
        }


        


      </div>

    </section>
  );
}


/* =========================================================
   CART DETAILS
========================================================= */

function CartDetails() {



  // const products = [
  //   {
  //     id: 1,
  //     name: "SROK Smart Phone 128GB, Oled Retina",
  //     image: "/images/product/mobile.png",
  //     price: 579,
  //     quantity: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "aPod Pro Tablet 2023 LTE + Wifi",
  //     image: "/images/product/tab.png",
  //     price: 979,
  //     quantity: 1,
  //   },
  //   {
  //     id: 3,
  //     name: "Samsung Galaxy X6 Ultra LTE 4G",
  //     image: "/images/product/phone.png",
  //     price: 659,
  //     quantity: 1,
  //   },
  // ];

  const cart = useSelector((state) => state.cart)

  const products = cart?.items || []

  return (
    <section className="rounded-md bg-white border border-gray-100 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f7f5] text-[#00a99d]">
            <FiTruck size={17} />
          </div>

          <div>

            <h2 className="text-sm font-bold uppercase text-gray-800">
              Cart Details
            </h2>

            <p className="mt-1 text-[9px] text-gray-400">
              Review your products before placing the order
            </p>

          </div>

        </div>

        <span className="text-[9px] font-semibold text-gray-400">
          3 ITEMS
        </span>

      </div>


      {/* Products */}

      <div className="divide-y divide-gray-100 px-5 sm:px-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="flex items-center gap-4 py-5"
          >

            {/* Image */}

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-gray-50">

              <img
                src={product.productImg}
                alt={product.name}
                className="h-14 w-14 object-contain"
              />

            </div>


            {/* Info */}

            <div className="min-w-0 flex-1">

              <h3 className="text-[10px] font-bold leading-4 text-gray-800">
                {product.name}
              </h3>

              <p className="mt-1 text-[9px] text-gray-400">
                Quantity: {product.quantity}
              </p>

            </div>


            {/* Price */}

            <div className="text-right">

              <p className="text-xs font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </p>

              <p className="mt-1 text-[8px] font-semibold text-green-500">
                FREE SHIPPING
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}


/* =========================================================
   CART SUMMARY
========================================================= */

function CartSummary({ user, selectedAddressIndex, paymentMode,}) {
  const {Razorpay} = useRazorpay();
  const dispatch = useDispatch();
  const router = useRouter()
      const cart = useSelector((state) => state.cart)

      const orderPlaceHandler = () => {
        const orderData = {
          product_details: cart.items.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            price_at_purchase: item.price,
            image_path: item.image_path,
          })),
          delivery_address: user.data.addresses[selectedAddressIndex],
          user_id: user.data._id,
          payment_mode: paymentMode,
          total_amount: cart.totalPrice,
        };
        apiClient.post("/order/place-order", orderData).then((response) => {
          if(response.data.flag){
            if(paymentMode === 1){
                  dispatch(clearCart())
                  router.push(`/order-placed/${response.data.order_id}`);
            }else {
              const {razorpay_order_id, order_id} = response.data
              if (!razorpay_order_id || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
                console.error("Razorpay configuration/order ID is missing", response.data)
                return
              }
              //  ye wala code addd 
              const options = {
                   key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                   currency: "INR",
                   name: "ecommerce",
                   description: "Test Transaction",
                   order_id: razorpay_order_id, // Generate order_id on server
                   handler: (payment_response) => {
                     apiClient.post("/order/verify-payment",
                      {
                        ...payment_response,
                        order_id,
                      }).then((success) => {
                        if(success.data.flag == 1){
                          dispatch(clearCart())
                          router.push(`/order-placed/${response.data.order_id}`);
                        } else {
                          console.error("Payment verification failed", success.data)
                        }
                      })
                      .catch((error) => console.error("Payment verification request failed", error))
                   },
                   prefill: {
                     name: user?.data?.name,
                     email: user?.data?.email,
                     contact: user?.data?.contact ?? "",
                   },
                   theme: {
                     color: "#14b8a6",
                   },
                 };
                 const rzp = new Razorpay(options)
                 rzp.open(); 

                 rzp.on("payment.failed", function (response){
                 apiClient.post("/order/payment-failed",
                  //  order se phle / or paymeent k .
                      {
                        ...response,
                        order_id,
                      }).then((success) => {
                        if(success.data.flag == 1){
                          dispatch(clearCart())
                          router.push(`/order-placed/${response.data.order_id}`);
                        }
                      })
                      .catch((error) => console.error("Payment failure update failed", error))
                 })
               }
        
            
            console.log(response.data)
          }else { 
            // alert("Failed to place order, please try again.");
            console.log(response.data, "error")
          }
        }).catch((error) => {
          console.log(error)
        })
      }
  return (
    <aside className="rounded-md   bg-white p-6 shadow-sm sm:p-6 h-fit">

      <h2 className="mb-5 text-sm font-bold text-gray-800">
        Cart Details
      </h2>


        <OrderSummary
         flag={1} original_price={cart?.totalOriginalPrice} price={cart?.totalPrice}
         orderPlaceHandler = {orderPlaceHandler}
         />

    </aside>
  );
}


/* =========================================================
   PAYMENT MODE
========================================================= */

function PaymentMode( {paymentMode, setPaymentMode}) {

  
  // 0 -> prepaid , 1 -> COD


  return (
    <section className="rounded-md bg-white border border-gray-100 shadow-sm">

      {/* Header */}

      <div className="border-b border-gray-100 px-5 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f7f5] text-[#00a99d]">
            <FiCreditCard size={17} />
          </div>

          <div>

            <h2 className="text-sm font-bold uppercase text-gray-800">
              Payment Mode
            </h2>

            <p className="mt-1 text-[9px] text-gray-400">
              Select your preferred payment method
            </p>

          </div>

        </div>

      </div>


      {/* Payment Options */}

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3 sm:p-6">

        {/* COD */}

        <label className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-[#00a99d] bg-[#f8fffe] p-4">

          <input
            type="radio"
            name="payment"
            checked={paymentMode === 1}
            onChange={() => setPaymentMode(1)}
            className="accent-[#00a99d]"
            />

          <div>

            <p className="text-[10px] font-bold text-gray-800">
              Cash on Delivery
            </p>

            <p className="mt-1 text-[8px] text-gray-400">
              Pay when your order arrives
            </p>

          </div>

        </label>


        {/* Card */}
{/* 
        <label className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 p-4 transition hover:border-[#00a99d]">

          <input
            type="radio"
            name="payment"
            className="accent-[#00a99d]"
          />

          <div>

            <p className="text-[10px] font-bold text-gray-800">
              Credit / Debit Card
            </p>

            <p className="mt-1 text-[8px] text-gray-400">
              Visa, Mastercard, RuPay
            </p>

          </div>

        </label> */}


        {/* UPI */}

        <label className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 p-4 transition hover:border-[#00a99d]">

            <input
              type="radio"
              name="payment"
              checked={paymentMode === 0}
              onChange={() => setPaymentMode(0)}
              className="accent-[#00a99d]"
            />

          <div>

            <p className="text-[10px] font-bold text-gray-800">
              Pre paid (UPI)
            </p>

            <p className="mt-1 text-[8px] text-gray-400">
              Google Pay / PhonePe / Paytm
            </p>

          </div>

        </label>

      </div>

    </section>
  );
}


/* =========================================================
   PLACE ORDER
========================================================= */

function PlaceOrder() {

  return (
    <div className="rounded-md bg-white border border-gray-100 p-5 shadow-sm sm:p-6">

      <label className="mb-4 flex cursor-pointer items-start gap-2">

        <input
          type="checkbox"
          className="mt-0.5 h-3.5 w-3.5 accent-[#00a99d]"
        />

        <span className="text-[9px] leading-4 text-gray-500">
          I agree to the Terms & Conditions, Privacy Policy
          and confirm that all the information provided above
          is correct.
        </span>

      </label>


      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#00a99d] text-xs font-bold text-white transition hover:bg-[#008f85]"
      >

        <FiCheck size={15} />

        PLACE ORDER

        <FiChevronRight size={14} />

      </button>

    </div>
  );
}


/* =========================================================
   MAIN CHECKOUT PAGE
========================================================= */

export default function CheckoutPage() {

  const user = useSelector((store) => store.user);

  const [selectedAddressIndex, setSelectedAddressIndex] = React.useState(0);

  const [paymentMode, setPaymentMode] = React.useState(1);
  // 0 = prepaid
  // 1 = COD

  useEffect(() => {
    if (user?.data?.addresses?.length) {

      const defaultIndex = user.data.addresses.findIndex(
        (address) => address.is_default === true
      );

      setSelectedAddressIndex(
        defaultIndex !== -1 ? defaultIndex : 0
      );
    }
  }, [user]);
 
  return (
    <main className="min-h-screen bg-[#f5f6fa]">

      {/* Top Border */}

      <div className="h-2 w-full bg-[#00a99d]" />


      <div className="mx-auto w-full max-w-[1400px] px-3 py-4 sm:px-5 md:px-8">

        {/* Breadcrumb */}

        <div className="mb-4 flex items-center gap-2 rounded-md bg-white px-4 py-3 text-[10px] text-gray-500 shadow-sm">

          <span className="hover:text-[#00a99d]">
            Home
          </span>

          <span>/</span>

          <span className="hover:text-[#00a99d]">
            Cart
          </span>

          <span>/</span>

          <span className="font-semibold text-gray-800">
            Checkout
          </span>

        </div>



           <div className="mt-5">

          <PaymentMode 
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
          />

        </div>

        {/* =================================================
            DELIVERY ADDRESS
        ================================================= */}

        <DeliveryAddress className="mt-5"
          user={user}
          selectedAddressIndex={selectedAddressIndex}
          setSelectedAddressIndex={setSelectedAddressIndex}
        />


        {/* =================================================
            CART + SUMMARY
        ================================================= */}

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* Left */}

          <CartDetails />

          {/* Right */}

          <CartSummary 
             user={user}
              selectedAddressIndex={selectedAddressIndex}
              paymentMode={paymentMode}
          />

        </div>


        {/* =================================================
            PAYMENT
        ================================================= */}

       


        {/* =================================================
            PLACE ORDER
        ================================================= */}

        {/* <div className="mt-5">

          <PlaceOrder />

        </div> */}

      </div>

    </main>
  );
}