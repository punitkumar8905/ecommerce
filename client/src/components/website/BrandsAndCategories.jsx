import { getBrand, getCategory } from "@/library/api-call";

export default async function BrandsAndCategories() {
  const brandJSON = await getBrand({ best: true, status: true });
  const brands = brandJSON.brands || [];
  const brandimage_path = brandJSON.image_path || [];

  const categoryJSON = await getCategory({ top: true, status: true });
  const topCategories = categoryJSON.categories || [];
  const image_path = categoryJSON.image_path || [];

  return (
    <div className="px-8 py-8 max-w-[1400px] mx-auto">
      {/* Featured Brands */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-xl uppercase tracking-tight">Featured Brands</h3>
          <a href="#" className="text-sm text-gray-400 hover:text-[#0bb59d] font-semibold transition">View All →</a>
        </div>
        <div className="grid grid-cols-6 gap-6">
          {brands?.map((brand, i) => (
            <div key={i} className="flex flex-col items-center justify-center group cursor-pointer">
              <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:bg-[#f0fffe] transition-all duration-300 border border-gray-100 overflow-hidden">
                <img src={`http://localhost:5000${brandimage_path}${brand.image_name}`} alt={brand.name} className="w-20 h-20 object-contain" />
              </div>
              <span className="text-xs font-semibold text-gray-700 mt-3 text-center group-hover:text-[#0bb59d]">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-xl uppercase tracking-tight">Top Categories</h3>
          <a href="#" className="text-sm text-gray-400 hover:text-[#0bb59d] font-semibold transition">View All →</a>
        </div>
        <div className="grid grid-cols-5 gap-6">
          {topCategories?.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 cursor-pointer group">
              <div className="w-28 h-28 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:bg-[#f0fffe] transition-all duration-300 border border-gray-100 overflow-hidden">
                <img src={`http://localhost:5000${image_path}${cat.image_name}`} alt={cat.name} className="w-24 h-24 object-contain" />
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center group-hover:text-[#0bb59d]">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}