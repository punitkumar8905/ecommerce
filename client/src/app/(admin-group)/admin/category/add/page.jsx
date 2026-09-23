"use client";

import { apiClient, titleToSlug } from "@/library/helper";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AddCategory() {

  const nameRef = useRef(null);
  const slugRef = useRef(null);
  const imageRef = useRef(null);


  const nameChangeHandler = () => {
    const slug = titleToSlug(nameRef.current.value);
    slugRef.current.value = slug;
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
  
    if(nameRef.current.value === '' || slugRef.current.value === ''  ){

      }else{
        const image_file = imageRef.current.files[0];

     
       const formData = new FormData();
       formData.append("name", nameRef.current.value);
       formData.append("slug", slugRef.current.value);
       formData.append("image", image_file);
        apiClient 
          .post("/category/create", formData)
          .then((response) =>{  
            if(response.data.flag == 1){
              toast.success(response.data.msg);
              e.target.reset();
            }else{
              toast.warning(response.data.msg);
            }
          })  
          .catch(() => {
            toast.warning("something went wrong")
          })
      }
  }

 


  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Add New Category
          </h1>

          <p className="text-gray-500 mt-1">
            Create a new product category
          </p>
        </div>
        <Link href="/admin/category">
        <button className="flex items-center gap-2 text-gray-600 hover:text-black">
          <FaArrowLeft />
          Back to Categories
        </button>
        </Link>
      </div>

      {/* Form Card */}
      <form 
        onSubmit={submitHandler}
        className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6">
          {/* Category Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="name"
              ref={nameRef}
              onChange = {nameChangeHandler}
            
              // onChange={handleChange}
              placeholder="e.g., Electronics, Clothing, Books"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Slug */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Slug <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="slug"
              ref={slugRef}
              readOnly= {true}
            
              // onChange={handleChange}
              placeholder="e.g., electronics, clothing, books"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-sm text-gray-500 mt-2">
              URL-friendly version of the category name
            </p>
          </div>

          {/* Image Name */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Category Image Name
            </label>

            <input
              type="file"
              accept="image/png, image/jpg, image/svg, image/jpeg "
              name="image_name"
              ref={imageRef}
           
              // onChange={handleChange}
              placeholder="e.g., electronics.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t p-6 flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            <FaCheck />
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
}
