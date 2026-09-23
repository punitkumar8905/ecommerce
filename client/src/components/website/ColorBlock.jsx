import React from "react";

const colors = [
  { name: "Black", code: "#000" },
  { name: "White", code: "#fff" },
  { name: "Blue", code: "#2563eb" },
  { name: "Red", code: "#ef4444" },
  { name: "Green", code: "#22c55e" },
  { name: "Yellow", code: "#facc15" },
];

export default function ColorBlock({colors,handleColorselect, colorIDS}) {
  return (
    <div className="bg-gray-100 rounded-lg p-5">
      <h2 className="text-lg font-bold mb-4">
        Colors
      </h2>

      <div className="flex flex-wrap gap-3">
        {colors.map((color, index) => (
          // return (
          //   <li key={color._id} className="cursor-pointer hover:scale-110 transition">
          //     <input
          //       checked={colorIDS.includes(color._id) ? true : false}
          //       onchange={handleColorselect}
          //       value={color._id}
          //       type="checkbox"
          //       title={color.name}
          //       />
          //     <span className='inline-block rounded-full p-2 border border-gray-300'
          //      style={{backgroundColor: color.code}}></span>
          //       </li> 
        //   )
        // }
          <button
            key={color._id}
            onChange={handleColorselect} value={color._id}
             type="button"
            title={color.name}
              className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition ${
              colorIDS.includes(color._id)
                ? "border-black scale-110"
                : "border-gray-300"
            }`}
       
            style={{
              backgroundColor: color.code,
            }}
          />
        ))}
      </div>
    </div>
  );
}