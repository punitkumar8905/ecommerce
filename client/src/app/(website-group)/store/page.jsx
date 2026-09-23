

import React, { Suspense } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiList,
  FiChevronDown
} from 'react-icons/fi';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Sidebar from '@/components/website/StoreSideBar';
import { getProduct } from '@/library/api-call';
import ProductCard from '@/components/website/StoreProduct';


// --- MOCK DATA ---


const bestSellersData = [
  {
    id: 1,
    title: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
    image: "/images/product/mac.png",
    reviews: 8,
    price: "$1,729.00",
    oldPrice: "$2,110.00",
    badge: { type: "save", text: "SAVE $59.00" },
    shipping: "FREE SHIPPING",
    status: "out-of-stock"
  },
  {
    id: 2,
    title: "Opplo Watch Series 8 GPS + Cellular Stainless Steel Case",
    image: "/images/product/watch.png",
    reviews: 0,
    priceRange: "$979.00 - $1,259.00",
    shipping: "$2.98 SHIPPING",
    status: "pre-order"
  },
  {
    id: 3,
    title: "iSmart 24V Charger",
    image: "/images/product/charger.png",
    reviews: 9,
    price: "$9.00",
    oldPrice: "$12.00",
    badge: { type: "save", text: "SAVE $3.00" },
    shipping: "$3.86 SHIPPING",
    status: "contact"
  },
  {
    id: 4,
    title: "OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS",
    image: "/images/product/opad.png",
    reviews: 152,
    price: "$569.00",
    oldPrice: "$759.00",
    badge: { type: "save", text: "SAVE $199.00" },
    shipping: "FREE SHIPPING",
    status: "in-stock"
  }
];

const gridProductsData = [
  {
    id: 5,
    title: "SROK Smart Phone 128GB, Oled Retina",
    image: "/images/product/mobile.png",
    reviews: 152,
    price: "$579.00",
    oldPrice: "$859.00",
    badge: { type: "save", text: "SAVE $199.00" },
    shipping: "FREE SHIPPING",
    status: "in-stock"
  },
  {
    id: 6,
    title: "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 inch",
    image: "/images/product/tab.png",
    reviews: 0,
    priceRange: "$979.00 - $1,259.00",
    badge: { type: "new", text: "NEW" },
    shipping: "$2.98 SHIPPING",
    status: "in-stock"
  },
  {
    id: 7,
    title: "Samsung Galaxy X6 Ultra LTE 4G/128 Gb, Black",
    image: "/images/product/phone.png",
    reviews: 5,
    price: "$659.00",
    badge: { type: "new", text: "NEW" },
    shipping: "FREE SHIPPING",
    hasFreeGift: true,
    status: "in-stock",
    variants: [
      "https://placehold.co/20x20/475569/475569",
      "https://placehold.co/20x20/94a3b8/94a3b8"
    ]
  },
  {
    id: 8,
    title: "Xiamoi Redmi Note 5, 64GB",
    image: "/images/product/redmi.png",
    reviews: 9,
    price: "$1,239.00",
    oldPrice: "$1,610.00",
    badge: { type: "save", text: "SAVE $59.00" },
    shipping: "FREE SHIPPING",
    status: "contact"
  }
];



// --- COMPONENTS ---



const MainContent = ({ productData, productImg }) => (
  <main className="flex-1 flex flex-col w-full min-w-0">
    {/* Best Sellers Section */}
    <section className="mb-10 relative">


      {/* Carousel Navigation Placeholder */}
      <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-8 h-12 bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded-r-md">
        <FiChevronLeft size={20} />
      </button>
      <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-8 h-12 bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded-l-md">
        <FiChevronRight size={20} />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {
          productData?.map((pd, index) => {
            return <ProductCard
              key={pd._id}
              productData={pd}
              productImg={`${productImg}/main_images/${pd.image_name}`}

            />
          })
        }


        {/* {bestSellersData.map(product => (
          <ProductCard key={product.id} productData={productData} productImg={productImg} />
        ))} */}
      </div>
    </section>

    {/* Filter & Controls Bar */}
    <div className="border-t border-gray-200 py-4 mb-6 flex flex-wrap items-center justify-between text-sm text-gray-500">
      <div>
        <span className="font-bold text-gray-800">1 - 40</span> of 120 results
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <span>Show item</span>
          <div className="flex bg-gray-100 rounded overflow-hidden">
            <button className="px-3 py-1 bg-white border border-gray-200 font-bold text-gray-800 shadow-sm">24</button>
            <button className="px-3 py-1 hover:bg-gray-200 transition-colors">48</button>
            <button className="px-3 py-1 hover:bg-gray-200 transition-colors">72</button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span>Show item</span>
          <button className="flex items-center justify-between w-32 px-3 py-1.5 bg-gray-100 rounded text-gray-700 hover:bg-gray-200">
            Default <FiChevronDown />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span>View As</span>
          <div className="flex items-center gap-2 text-gray-400">
            <button className="text-gray-800"><FiGrid size={18} /></button>
            <button className="hover:text-gray-800"><FiList size={18} /></button>
          </div>
        </div>
      </div>
    </div>

    <button
      className='w-full bg-teal-500 text-white hover:bg-teal-700 py-2 rounded-lg text-sm font-medium
           transition '
    > Add to Cart </button>
    {/* Grid Content */}
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {/* Simulating the dotted dashed line seen in the image_57b284.png design */}
        <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-blue-400 z-0 opacity-50" />
        {/*         
        {gridProductsData.map(product => (
          <div key={product.id} className="z-10 bg-white">
            <ProductCard productData={product} productImg={product.image} />
          </div>
        ))} */}
      </div>
    </section>
  </main>
);

// --- MAIN LAYOUT EXPORT ---
export default async function ECommerceLayout({ params, searchParams }) {

  const query = { status: true, limit: 10 };
  const urlSearchParams = new URLSearchParams(searchParams);
  if (urlSearchParams.brand_id) {
    query.brand_id = await urlSearchParams.brand_id;
  }
  if (urlSearchParams.color_id) {
    query.color_id = await urlSearchParams.color_id;
  }

  const productJSON = await getProduct(query);

  const productData = productJSON.products || [];
  const productImgBase = `${process.env.NEXT_PUBLIC_ASSET_PATH || ""}${productJSON.image_path || ""}`.replace(/\/\/+$/, "");
  return (

    <div className="min-h-screen bg-white p-6 md:p-8 flex gap-14 max-w-[1600px] mx-auto font-sans">
      <Suspense fallback={<div className="w-72" />}>
        <Sidebar />
      </Suspense>
      <MainContent
        productData={productData}
        productImg={productImgBase}
      />
    </div>

  );
}