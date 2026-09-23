import React from "react";
import Link from "next/link";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaPen } from "react-icons/fa";
import ToggleBtn from "@/components/admin/toggleBtn";
import { getCategory } from "@/library/api-call";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function CategoriesPage() {
  const {categories, image_path} = await getCategory(); 
  const base_url = "/category/toggle"

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Categories
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your product categories
          </p>
        </div>

       <Link href="/admin/category/add">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium">
          <FaPlus />
          Add Category
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
            6 categories found
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-300  rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border border-gray-300 bg-gray-50">
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                CATEGORY NAME
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                SLUG
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                PRODUCTS
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
                categories?.map(
                  (cat) => {
                    return <tr key = {cat._id} className="border-b hover:bg-gray-50">
                         <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{cat.slug}</div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">0</div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                        
                          <img
                            // src={`${process.env.NEXT_PUBLIC_ASSET_PATH}${image_path}${cat.image_name}`}
                             src={`http://localhost:5000/images/category/${cat.image_name}`}
                            alt=""
                            className="h-10 w-10 rounded object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <ToggleBtn 
                          id= {cat._id} 
                          current={cat.status} 
                          flag ="1" 
                          trueText={"Active"} 
                          falseText= {"Inactive"} 
                           base_url={base_url}/>

                          <ToggleBtn 
                          id= {cat._id} 
                          current={cat.on_home} 
                          flag ="2"
                           trueText={"on home"}
                            falseText= {"not on home"}
                               base_url={base_url}/>


                          <ToggleBtn 
                          id= {cat._id} 
                          current={cat.is_featured} 
                          flag ="3" 
                          trueText={"featured"}
                           falseText= {"not featured"} 
                             base_url={base_url}/>


                          <ToggleBtn 
                          id= {cat._id} 
                          current={cat.is_top}
                           flag ="4" 
                           trueText={"in top"} 
                           falseText= {"not in top"}
                              base_url={base_url}  />

                        </td>

                          <td className="px-6 py-4 whitespace-nowrap ">
                            <div className="flex gap-2">
                           <DeleteBtn className="inline-block" delete_url={`/category/delete/${cat._id}`}/>
                           <Link href={`/admin/category/edit/${cat._id}`}>
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