export default function TripleCategory() {
  const sections = [
    { title: "Audios & Cameras", items: ["Speaker", "DSLR Camera", "Earbuds", "Microphone"] },
    { title: "Gaming", items: ["Monitors", "Chair", "Controller", "Keyboards"] },
    { title: "Office Equipments", items: ["Printers", "Network", "Security", "Projectors"] }
  ];

  return (
    <section className="px-8 py-6 max-w-[1400px] mx-auto grid grid-cols-3 gap-6">
      {sections.map((sec, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Section Banner */}
          <div className="bg-gray-900 h-40 p-6 flex items-center relative overflow-hidden">
            <div className="text-white relative z-10">
              <p className="text-[10px] font-bold text-[#0bb59d] mb-1">BEST SELLER</p>
              <h4 className="font-bold text-lg leading-tight">{sec.title}</h4>
            </div>
            <div className="absolute right-[-20px] top-0 w-32 h-full bg-white/5 rotate-12"></div>
          </div>
          
          {/* Sub Grid */}
          <div className="p-4 grid grid-cols-2 gap-4">
            {sec.items.map((item, i) => (
              <div key={i} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer group">
                <div className="w-16 h-16 bg-gray-100 rounded-full mb-2 group-hover:shadow-md transition"></div>
                <p className="text-xs font-bold text-gray-700">{item}</p>
                <p className="text-[10px] text-gray-400 mt-1">12 items</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}