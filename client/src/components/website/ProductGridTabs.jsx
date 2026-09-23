import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { BsCheckCircleFill } from 'react-icons/bs';

export default function ProductGridTabs() {
  // Dummy product data
  const products = [
    {
      id: 1,
      name: "BOSO 2 Wireless On Ear Headphone",
      price: "$359.00",
      oldPrice: null,
      reviews: "(152)",
      inStock: true,
      badge: null,
    },
    {
      id: 2,
      name: "OPO Pad 12.9 Inch M1 2023, 64GB + Wifi, GPS",
      price: "$979.00",
      oldPrice: "$1,259.00",
      reviews: "(152)",
      inStock: true,
      badge: { text: "SAVE $199.00", color: "bg-[#0bb59d]" },
    },
    {
      id: 3,
      name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
      price: "$1,729.00",
      oldPrice: "$2,119.00",
      reviews: "(8)",
      inStock: false,
      badge: { text: "SAVE $59.00", color: "bg-[#0bb59d]" },
    },
    {
      id: 4,
      name: "Oppo Watch Series 8 GPS + Cellular Stainless Steel Case",
      price: "$979.00 - $1,259.00",
      oldPrice: null,
      reviews: "(152)",
      inStock: true,
      isPreOrder: true,
      badge: null,
    },
  ];

  return (
    <section className="px-8 py-6 max-w-[1400px] mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">

        {/* Tabs Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
          <div className="flex gap-8 font-bold text-gray-500">
            <span className="text-black border-b-2 border-[#0bb59d] pb-4 -mb-[18px] cursor-pointer">BEST SELLER</span>
            <span className="cursor-pointer hover:text-black transition">NEW IN</span>
            <span className="cursor-pointer hover:text-black transition">POPULAR</span>
          </div>
          <a href="#" className="text-sm text-gray-400 hover:text-[#0bb59d]">View All</a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-4 gap-6 relative">

          {/* Navigation Arrows (Absolute positioning on edges) */}
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-md w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black z-10 border border-gray-100">{'<'}</button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-md w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black z-10 border border-gray-100">{'>'}</button>

          {products.map((product) => (
            <div key={product.id} className="group flex flex-col relative bg-white border border-gray-100 hover:border-[#0bb59d] hover:shadow-xl rounded-xl p-5 transition-all duration-300">

              {/* Badges */}
              {product.badge && (
                <div className={`absolute top-4 left-4 ${product.badge.color} text-white text-[10px] font-bold px-2 py-1 rounded z-10`}>
                  {product.badge.text}
                </div>
              )}

              {/* Hover Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button className="w-8 h-8 bg-white shadow rounded-full flex items-center justify-center text-gray-500 hover:text-[#0bb59d]"><FiHeart size={16} /></button>
                <button className="w-8 h-8 bg-white shadow rounded-full flex items-center justify-center text-gray-500 hover:text-[#0bb59d]"><MdOutlineRemoveRedEye size={16} /></button>
              </div>

              {/* Product Image */}
              <div className="h-48 bg-gray-50 rounded-md mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col">
                <div className="text-xs text-gray-400 mb-1">{product.reviews}</div>
                <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 hover:text-[#0bb59d] cursor-pointer">
                  {product.name}
                </h4>

                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-lg text-black">{product.price}</span>
                    {product.oldPrice && <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>}
                  </div>

                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-1 rounded">FREE SHIPPING</span>
                  </div>

                  {product.inStock ? (
                    <div className="flex items-center gap-1 text-xs text-[#0bb59d] font-semibold">
                      <BsCheckCircleFill /> In stock
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-red-500 font-semibold">
                      <BsCheckCircleFill /> Out of stock
                    </div>
                  )}

                  {product.isPreOrder && (
                    <div className="text-xs text-gray-500 font-semibold mt-1">PRE - ORDER</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section >
  );
}