'use client';

import { useState } from "react";
import React from "react";



const brands = [
  { name: "Apple", count: 18 },
  { name: "Samsung", count: 14 },
  { name: "Xiaomi", count: 10 },
  { name: "OnePlus", count: 7 },
  { name: "Oppo", count: 5 },
];


export default function BrandBlock({brands,handleBrandselect, brandIDS}) {

  return (
    <div className="bg-gray-100 rounded-lg p-5">
      <h2 className="text-lg font-bold mb-4">
        Brands
      </h2>

      <input
        type="text"
        placeholder="Search Brand"
        className="w-full border rounded-md p-2 mb-4"
      />

      <div className="space-y-3">
        {brands.map((brand, index) => (
          <label
            key={index}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <input
              checked={brandIDS.includes(brand.slug) ? true : false}
               onChange={handleBrandselect} value={brand.slug} type="checkbox" />
              <span>{brand.name}</span>
            </div>

            <span className="text-gray-500">
              ({brand.count})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}