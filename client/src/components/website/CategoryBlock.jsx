import Link from "next/link";
import React from "react";

const categories = [
  "All",
  "Iphone",
  "Samsung",
  "Xiaomi",
  "Asus",
  "Oppo",
  "Gaming Smartphone",
  "Ipad",
  "Window Tablets",
  "eReader",
  "Smartphone Chargers",
];


export default function CategoryBlock({categories, current_category}) {
  return (
    <div className="bg-gray-100 rounded-lg p-5">
      <h2 className="text-lg font-bold mb-4">
        Categories
      </h2>

      
      <button className="w-full bg-white border rounded-md py-2 mb-4">
      
        All Categories
      </button>
       

      <ul className="space-y-2">
        {
        categories.map((cat, index) => (
          <li
            key={index}
            className="cursor-pointer hover:text-blue-600"
          >
            <Link href={`/store/${cat.slug}`} className={`${current_category == undefined && 'font-bold text-gray-700 hover:text-blue-600'}`}>
            {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}