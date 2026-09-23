"use client";

import { apiClient, titleToSlug } from "@/library/helper";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AddColor() {

  const nameRef = useRef(null);
  const slugRef = useRef(null);


  const nameChangeHandler = () => {
    const slug = titleToSlug(nameRef.current.value);
    slugRef.current.value = slug;
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      slug: slugRef.current.value,
      code: e.target.code.value
    }

        apiClient 
          .post("/color/create", data)
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
  

 


  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Add New Color
          </h1>

          <p className="text-gray-500 mt-1">
            Create a new product color
          </p>
        </div>
        <Link href="/admin/color">
        <button className="flex items-center gap-2 text-gray-600 hover:text-black">
          <FaArrowLeft />
          Back to Colors
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
              Color Name <span className="text-red-500">*</span>
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

          
          </div>

          {/* Image Name */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Code 
            </label>

            <input  type="color" name="code" />
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
            Create Color
          </button>
        </div>
      </form>
    </div>
  );
}
