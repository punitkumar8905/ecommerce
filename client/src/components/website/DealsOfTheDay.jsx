import { getCategory, getProduct } from '@/library/api-call';
import { FiCheck } from 'react-icons/fi';

export default async function DealsOfTheDay() {
  const categoryJSON  =  await getCategory({top:true})
  const dealsofcategory = categoryJSON.categories || [];
  const image_path = categoryJSON.image_path || [];
  return (
    <section className="px-8 py-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block bg-[#0bb59d] text-white font-bold px-6 py-3 rounded-xl uppercase tracking-wide text-sm shadow-md">
          🔥 Deals of the day
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex gap-8">

        {/* Left: Product Images */}
        <div className="w-1/3">
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {dealsofcategory.map((cat,item) => (
                <div key={item} className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#0bb59d] hover:shadow-md transition">
                     <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              {/* <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-md"> */}
                {/* SAVE<br />$199.00 */}
              {/* </div> */}
              {/* Replace with actual phone image */}
              <div className="w-40 h-64 bg-gray-300 rounded-lg">
                <img  src={`http://localhost:5000${image_path}${cat.image_name}`} width="100%" gap="8px" height="20% " alt="" />
              </div>
            </div>
                </div>
                
              ))}
            </div>
            {/* Main Image Placeholder */}
         
          </div>
        </div>

        {/* Center: Product Details & Timer */}
        <div className="w-1/3 flex flex-col justify-center">
          <div className="text-sm text-gray-400 mb-1">(152)</div>
          <h3 className="text-xl font-bold text-gray-800 leading-tight mb-3">
            Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-[#0bb59d]">$569.00</span>
            <span className="text-gray-400 line-through text-sm">$759.00</span>
          </div>

          <ul className="text-sm text-gray-600 space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5"></span>
              Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5"></span>
              DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5"></span>
              Commanding Power Design: Twin 16+1+2 Phases Digital VRM
            </li>
          </ul>

          <div className="flex gap-2 mb-6">
            <span className="text-xs bg-[#e6f7f5] text-[#0bb59d] font-semibold px-3 py-1 rounded">FREE SHIPPING</span>
            <span className="text-xs bg-[#e6f7f5] text-[#0bb59d] font-semibold px-3 py-1 rounded">FREE GIFT</span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-semibold uppercase text-gray-700">Hurry up!<br />Promotion will<br />expires in</span>
            <div className="flex gap-2">
              <div className="bg-gray-100 text-center rounded px-3 py-2 min-w-[50px]">
                <div className="font-bold text-lg leading-none">162</div>
                <div className="text-[10px] text-gray-500 uppercase">d</div>
              </div>
              <div className="bg-gray-100 text-center rounded px-3 py-2 min-w-[50px]">
                <div className="font-bold text-lg leading-none">09</div>
                <div className="text-[10px] text-gray-500 uppercase">h</div>
              </div>
              <div className="bg-gray-100 text-center rounded px-3 py-2 min-w-[50px]">
                <div className="font-bold text-lg leading-none">32</div>
                <div className="text-[10px] text-gray-500 uppercase">m</div>
              </div>
              <div className="bg-gray-100 text-center rounded px-3 py-2 min-w-[50px]">
                <div className="font-bold text-lg leading-none">44</div>
                <div className="text-[10px] text-gray-500 uppercase">s</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
              <span>Sold: <span className="text-black font-bold">26/75</span></span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#0bb59d] h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>
        </div>

        {/* Right: Promo Banners */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="flex gap-4 h-1/2">
            <div className="w-1/2 bg-gradient-to-br from-gray-900 to-black rounded-xl relative overflow-hidden flex items-center justify-center shadow-md">
              <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-lg">50%</div>
              <div className="text-white text-center">
                <div className="text-sm font-bold">Gaming</div>
                <div className="text-xs opacity-75">Xbox</div>
              </div>
            </div>
            <div className="w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl relative overflow-hidden flex items-center justify-center shadow-md">
              <div className="text-gray-700 text-center">
                <div className="text-sm font-bold">New</div>
                <div className="text-xs">Gadgets</div>
              </div>
            </div>
          </div>
          <div className="h-1/2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center shadow-md">
            <div className="text-gray-700 text-center">
              <div className="text-sm font-bold">Latest</div>
              <div className="text-xs">Accessories</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}