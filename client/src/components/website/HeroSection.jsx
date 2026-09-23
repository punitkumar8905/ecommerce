import { getCategory } from "@/library/api-call";

export default async function HeroSection() {
  const categoryJSON = await getCategory({ home: true, status: true });
  const categories = categoryJSON.categories || [];

  return (
    <div className="flex px-8 py-8 gap-6 max-w-[1400px] mx-auto">
      {/* Sidebar Categories */}
      <div className="w-1/4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-32">
          <h2 className="font-bold text-base border-b border-gray-200 pb-4 mb-4">Category</h2>
          <ul className="flex flex-col gap-1">
            {categories?.map((cat, idx) => (
              <li key={idx} className="flex justify-between items-center px-3 py-3 hover:bg-[#f0fffe] rounded-lg cursor-pointer transition group">
                <span className="text-gray-700 font-medium text-sm group-hover:text-[#0bb59d]">{cat.name}</span>
                <span className="bg-[#e6f7f5] text-[#0bb59d] text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold text-center">
                  {cat.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Banner */}
      <div className="w-3/4">
        <div className="bg-gradient-to-br from-[#0bb59d] via-[#09a88a] to-[#0a8f77] rounded-2xl overflow-hidden relative flex items-center justify-between pl-12 pr-8 py-16 shadow-lg">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          {/* Left Content */}
          <div className="relative z-10 max-w-md">
            <h2 className="text-5xl font-bold leading-tight text-white mb-3">
              Don't miss amazing<br />grocery deals
            </h2>
            <p className="text-lg text-white/90 mb-8">Sign up for the daily newsletter</p>
            <div className="flex rounded-full overflow-hidden bg-white/95 p-1 w-full max-w-sm shadow-lg">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent text-gray-800 px-5 py-3 w-full outline-none placeholder-gray-500 font-medium text-sm"
              />
              <button className="bg-[#0bb59d] text-white px-6 py-3 rounded-full font-bold hover:bg-[#099884] transition text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Decoration */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full flex items-center justify-center">
            <div className="w-64 h-64 bg-white/20 rounded-full filter blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}