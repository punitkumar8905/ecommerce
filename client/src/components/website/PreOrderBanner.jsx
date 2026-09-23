export default function PreOrderBanner() {
  return (
    <section className="px-8 py-8 max-w-[1400px] mx-auto">
      <div className="bg-gradient-to-r from-[#0bb59d] to-[#09a88a] rounded-2xl flex items-center justify-between px-12 py-10 text-white overflow-hidden relative shadow-lg">
        {/* Left Side */}
        <div className="relative z-10 max-w-xs">
          <p className="text-sm font-bold uppercase tracking-wider text-white/80 mb-2">Experience the Future</p>
          <h2 className="text-4xl font-bold uppercase mb-2">Pre Order</h2>
          <p className="text-2xl font-bold text-white/95">From $399</p>
        </div>

        {/* Center Image Placeholder */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0 w-80 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 h-40 w-72 flex items-center justify-center">
          <div className="w-56 h-28 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-sm font-semibold border border-white/30">
            Smartwatch Showcase
          </div>
        </div>

        {/* Right Side */}
        <div className="relative z-10 flex flex-col items-end text-right max-w-xs">
          <p className="text-sm opacity-90 mb-2">Oppo Watch Sport Series 8</p>
          <h3 className="text-3xl font-bold mb-6">A healthy leap ahead</h3>
          <button className="bg-white text-[#0bb59d] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg">
            Discover Now →
          </button>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-5 bg-white rounded-2xl\"></div>
      </div>
    </section>
  );
}