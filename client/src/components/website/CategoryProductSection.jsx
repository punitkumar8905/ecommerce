import { BsArrowRight } from 'react-icons/bs';

export default function CategoryProductSection({ title, bannerColor, bannerTitle, products, subCategories }) {
  return (
    <section className="px-8 py-8 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-2xl uppercase tracking-tight">{title}</h3>
        <a href="#" className="text-sm text-gray-400 hover:text-[#0bb59d] font-semibold transition">View All →</a>
      </div>

      <div className="flex gap-8">
        {/* Left Column: Big Banner & Mini Categories */}
        <div className="w-[40%] flex flex-col gap-6">
          <div className={`${bannerColor} rounded-2xl p-10 text-white relative overflow-hidden h-[320px] flex flex-col justify-between shadow-lg`}>
            <div className="relative z-10">
              <h4 className="text-4xl font-bold leading-tight mb-6">{bannerTitle}</h4>
              <button className="bg-black/80 text-white px-7 py-3 text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-black transition uppercase shadow-md">
                Shop Now <BsArrowRight />
              </button>
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-t from-black to-transparent z-0"></div>
          </div>

          {/* Mini Sub-Categories Grid */}
          <div className="grid grid-cols-3 gap-3">
            {subCategories?.map((sub, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl flex flex-col items-center gap-2 border border-gray-100 hover:shadow-lg hover:border-[#0bb59d] cursor-pointer transition">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                <div className="text-center">
                  <p className="text-[12px] font-bold text-gray-800 leading-snug">{sub.name}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{sub.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 4 Product Grid */}
        <div className="w-[60%] grid grid-cols-2 gap-5">
          {products?.map((p, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 hover:border-[#0bb59d] hover:shadow-lg transition cursor-pointer group">
              <div className="flex gap-4">
                <div className="w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden border border-gray-100 flex items-center justify-center">
                  {p.badge && <span className="absolute top-2 left-2 bg-[#0bb59d] text-white text-[9px] px-2 py-1 font-bold rounded-lg">{p.badge}</span>}
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-[11px] text-gray-500 font-semibold mb-2">{p.reviews}</p>
                    <h5 className="text-sm font-bold text-gray-800 group-hover:text-[#0bb59d] line-clamp-2 transition">{p.name}</h5>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#0bb59d] mb-2">{p.price}</p>
                    <div className="flex gap-2">
                      <div className="w-4 h-4 rounded-full bg-black border border-gray-300 cursor-pointer hover:border-[#0bb59d]"></div>
                      <div className="w-4 h-4 rounded-full bg-blue-500 border border-gray-300 cursor-pointer hover:border-[#0bb59d]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}