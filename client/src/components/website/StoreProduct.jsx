'use client';
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/reducers/CartReducer';
import {toLocalPrice} from '@/library/helper'


const ProductCard = ({ productData, productImg }) => {
    const dispatcher = useDispatch();

    const addToCartHandler = () => {
        const item = {
            id: productData._id,
            name: productData.name,
            price: productData.discounted_price,
            original_price: productData.original_price,
            productImg:productImg,
        }
        dispatcher(addToCart(item))
    }

  return (
    <div className="relative flex flex-col p-4 bg-white group hover:shadow-lg transition-shadow duration-300">
      {/* Badges */}
      {productData.badge && (
        <div className={`absolute top-4 left-4 z-10 px-2 py-1 text-xs font-bold text-white rounded ${
          productData.badge.type === 'save' ? 'bg-green-500' : 'bg-gray-800'
        }`}>
          {productData.badge.text}
        </div>
      )}
      
      {/* Wishlist Placeholder */}
      <div className="absolute top-4 right-4 w-6 h-6 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" />

      {/* Image */}
      <div className="h-48 flex items-center justify-center mb-4">
        <img src={productImg} alt={productData.name} className="max-h-full max-w-full object-contain" />
      </div>

      {/* Meta */}
      <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
        {productData.rating > 0 ? `(${productData.rating})` : '\u00A0'}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-3 line-clamp-2 min-h-[2.5rem]">
        {productData.name}
      </h3>

      {/* Price */}
      <div className="mb-3 min-h-[1.5rem]">
        {productData.priceRange ? (
          <span className="text-base font-bold text-gray-900">{productData.priceRange}</span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-red-500">{productData.original_price}</span>
            {toLocalPrice(productData.discounted_price) && (
              <span className="text-xs text-gray-400 line-through">{toLocalPrice(productData.discounted_price)}</span>
            )}
          </div>
        )}
      </div>
      
    

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {productData.shipping && (
          <span className={`text-[10px] px-2 py-1 rounded font-semibold ${
            productData.shipping === 'FREE SHIPPING' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {productData.shipping}
          </span>
        )}
        {productData.hasFreeGift && (
          <span className="text-[10px] px-2 py-1 rounded font-semibold bg-red-50 text-red-500">
            FREE GIFT
          </span>
        )}
      </div>

      {/* Status & Variants */}
      <div className="mt-auto flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs">
          {productData.status === 'in-stock' && <><FaCheckCircle className="text-green-500" /> <span className="text-gray-600">In stock</span></>}
          {productData.status === 'out-of-stock' && <><FaTimesCircle className="text-red-500" /> <span className="text-gray-600">Out of stock</span></>}
          {productData.status === 'pre-order' && <span className="text-gray-600 uppercase text-[10px] tracking-wider">PRE - ORDER</span>}
          {productData.status === 'contact' && <span className="text-gray-600">Contact</span>}
        </div>
        
        {/* Variants Thumbnails */}
        {productData.variants && (
          <div className="flex gap-1">
            {productData.variants.map((v, i) => (
              <img key={i} src={v} alt="variant" className="w-5 h-5 border border-gray-200 cursor-pointer" />
            ))}
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <button onClick={addToCartHandler} 
      className="w-full bg-teal-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
        Add to Cart
      </button>
    </div>
  );
};



export default ProductCard;