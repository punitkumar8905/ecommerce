"use client";

import { getBrand, getColor, getCategory } from "@/library/api-call";
import { apiClient, titleToSlug } from "@/library/helper";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import Select from "react-select";

export default  function AddProduct() {

const [categoryData, setCategoryData] = useState([]);
const [brandData, setBrandData] = useState([])
const [colorData, setColorData] = useState([])
const [selectedCat, setSelectedCat] = useState(null);
const [selectedBrand, setSelectedBrand] = useState(null);
const [selectedColor, setSelectedColor] = useState(null);

  const nameRef = useRef(null);
  const slugRef = useRef(null);
  const originalPriceRef = useRef(null);
  const discountedPriceRef = useRef(null);
  const discountPercentageRef = useRef(null);
  const skuRef = useRef(null);
  const descriptionRef = useRef(null);
  const thumbnailRef = useRef(null);


 
  const getDiscountPercentage = () => {
    const op = originalPriceRef.current.value;
    const dp = discountedPriceRef.current.value;
    const discount = (100 - ( dp / op ) * 100).toFixed(2);
    discountPercentageRef.current.value = discount;
  };
 


const fetchBrandData = async () => {
    if(selectedCat == null) return;
     const {brands} = await getBrand({category_id: selectedCat});
    setBrandData(brands)
}

useEffect( () => {
   fetchBrandData() 
},[selectedCat])


const fetchData = async() => {
    const {categories} = await getCategory();
   setCategoryData(categories)   
   
    const {colors} = await  getColor();
    setColorData(colors);
}

useEffect( () => {
    fetchData();
},[]);




  const nameChangeHandler = () => {
    slugRef.current.value = titleToSlug(nameRef.current.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", nameRef.current.value);
    formData.append("slug", slugRef.current.value);
    formData.append("original_price", originalPriceRef.current.value);
    formData.append("discounted_price", discountedPriceRef.current.value);
    formData.append("discount_percentage", discountPercentageRef.current.value);
    formData.append("category_id", selectedCat );
    formData.append("color_ids", JSON.stringify(selectedColor));
    formData.append("brand_id", selectedBrand );
    formData.append("sku_id", skuRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("image", thumbnailRef.current.files[0]);
    apiClient
   .post("/product/create", formData)
   .then((response) => {
         console.log(response.data);
 
         if (response.data.flag == 1) {
           toast.success(response.data.msg);
           e.target.reset();
         } else {
           toast.warning(response.data.msg);
         }
       })
      .catch((error) => {
         console.log(error);
         toast.error("Something went wrong");
       });
       };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Add New Product
          </h1>

          <p className="text-gray-500 mt-1">
            Create a new product
          </p>
        </div>

        <Link href="/admin/product">
          <button className="flex items-center gap-2 text-gray-600 hover:text-black">
            <FaArrowLeft />
            Back to Products
          </button>
        </Link>
      </div>

      {/* Form */}
      <form
         onSubmit={submitHandler}
        className="bg-white rounded-xl border border-gray-200 shadow-sm"
         >
         <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Name */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Name <span className="text-red-500">*</span>
      </label>

      <input
        type="text"
        ref={nameRef}
        onChange={nameChangeHandler}
        placeholder="Product name"
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />
    </div>

    {/* Slug */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Slug <span className="text-red-500">*</span>
      </label>

      <input
        type="text"
        ref={slugRef}
        readOnly
        placeholder="product-slug"
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />
    </div>

    {/* SKU */}
    <div>
      <label className="block text-sm font-medium mb-2">
        SKU ID
      </label>

      <input
        type="text"
        ref={skuRef}
        placeholder="SKU ID"
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />
    </div>

    {/* Original Price */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Original Price <span className="text-red-500">*</span>
      </label>

      <input
        type="number"
        onChange={getDiscountPercentage}
        ref={originalPriceRef}
        placeholder="Original price"
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />
    </div>

    {/* Discounted Price */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Discounted Price
      </label>

      <input
        type="number"
      
        onChange={getDiscountPercentage}
        ref={discountedPriceRef}
        placeholder="Discounted price"
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />
    </div>

    {/* Discount Percentage */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Discount %
      </label>

      <input
        type="number"
        
        onChange={getDiscountPercentage}
        ref={discountPercentageRef}
        placeholder="Discount %"
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />
    </div>

    {/* Category */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Category
      </label>

        <Select 
         onChange={(opt) => setSelectedCat(opt.value)}
          
         options={
            categoryData.map(
                (cat_data) => {
                    return  {
                        value: cat_data._id,
                        label: cat_data.name,
                    }
                }
            ) 
        }/>
      {/* <select
        ref={categoryRef}
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      >
        <option>Select Category</option>
      </select> */}
    </div>

    {/* Color */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Color
      </label>

        <Select isMulti={true} closeMenuOnSelect={false}
        onChange={(opt) => {
            const ids = opt.map((o) => o.value);
                setSelectedColor(ids);
        }}
         options={
            colorData.map(
                (col_data) => {
                    return  {
                        value: col_data._id,
                        label: col_data.name,
                    }
                }
            ) 
        }/>

      {/* <select
        ref={colorRef}
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      >
        <option>Select Color</option>
      </select> */}
    </div>

    {/* Brand */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Brand
      </label>

        <Select 
        onChange={(opt) => setSelectedBrand(opt.value)}
        closeMenuOnSelect={false}
         options={
            brandData.map(
                (brand_data) => {
                    return  {
                        value: brand_data._id,
                        label: brand_data.name,
                    }
                }
            ) 
        }/>

      {/* <select
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      >
        <option>Select Brand</option>
      </select> */}
    </div>

    {/* Description */}
    <div className="md:col-span-3">
      <label className="block text-sm font-medium mb-2">
        Description
      </label>

      <textarea
        rows={5}
        ref={descriptionRef}
        placeholder="Product description..."
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />
    </div>

    {/* Thumbnail */}
    <div className="md:col-span-3">
      <label className="block text-sm font-medium mb-2">
        Thumbnail Image
      </label>

      <input
        type="file"
        ref={thumbnailRef}
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />
    </div>

  </div>

  {/* Footer */}
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
      Create Product
    </button>
  </div>
</form>
    </div>
  );
}