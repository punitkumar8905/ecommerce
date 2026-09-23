import React from "react";
import Link from "next/link";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaPen } from "react-icons/fa";
import ToggleBtn from "@/components/admin/toggleBtn";
import { getBrand } from "@/library/api-call";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function BrandPage() {
  const {brands, image_path} = await getBrand(); 
  const base_url = "/brand/toggle"

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Brands
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your product brands
          </p>
        </div>

       <Link href="/admin/brand/add">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium">
          <FaPlus />
          Add Brand
        </button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search categories..."
              className="w-full border boder-gray-300 rounded-lg pl-12 pr-4 py-3 outline-none"
            />
          </div>

          <span className="text-gray-600">
            6 brands found
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-300  rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border border-gray-300 bg-gray-50">
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                 NAME
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                SLUG
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Category name(s)
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                IMAGE
              </th>


              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                SETTING
              </th>

              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            

              {
                brands?.map(
                  (brand) => {
                    return <tr key = {brand._id} className="border-b hover:bg-gray-50">
                         <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{brand.slug}</div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                        <ul className="text-sm font-medium text-gray-900">
                          {brand.category_ids.map((cat) =>(
                            <li key={cat}>{cat.name}</li>
                          ) )}
                          </ul>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                        
                          <img
                            // src={`${process.env.NEXT_PUBLIC_ASSET_PATH}${image_path}${brand.image_name}`}
                           src={`http://localhost:5000/images/brand/${brand.image_name}`}
                            alt=""
                            className="h-10 w-10 rounded object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <ToggleBtn 
                          id= {brand._id} 
                          current={brand.status} 
                          flag ="1" 
                          trueText={"Active"} 
                          falseText= {"Inactive"} 
                           base_url={base_url}/>

                            <ToggleBtn 
                          id= {brand._id} 
                          current={brand.is_best} 
                          flag ="1" 
                          trueText={"is Best"} 
                          falseText= {"Not in Best"} 
                           base_url={base_url}/>

                        </td>

                          <td className="px-6 py-4 whitespace-nowrap ">
                            <div className="flex gap-2">
                           <DeleteBtn className="inline-block" delete_url={`/brand/delete/${brand._id}`}/>
                           <Link href={`/admin/brand/edit/${brand._id}`}>
                           <FaPen className="inline-block cursor-pointer mx-2"/>
                           </Link>
                           </div>
                        </td>
                        </tr>
                  } 
                )
              }            
              </tbody>
        </table>
      </div>
    </div>
  );
}