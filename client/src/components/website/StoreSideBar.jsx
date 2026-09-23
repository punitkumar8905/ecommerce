'use client'

import React from "react";

import CategoryBlock from "./CategoryBlock";
import BrandBlock from "./BrandBlock";
import ColorBlock from "./ColorBlock";

import { getBrand, getCategory, getColor } from "@/library/api-call";
import { useState, useEffect } from "react";
import { useParams,useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation"; 
import { useRouter } from "next/navigation";



export default function Sidebar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {category_slug} = params;

  const [categories, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

    const[brandIDS, setBrandIDS] = useState([]);
    const[colorIDS, setColorIDS] = useState([]); 

useEffect(
  ()=>{
    // if(firstRenderRef.current == false){
    //   firstRenderRef.current = true;
    //   return;
    // }
    setBrandIDS([])
    setColorIDS([])
  },[pathname] )

    useEffect(
      () => { 
          const query = new URLSearchParams(searchParams.toString());
          // [1,3,2] =  1,2,3
          if(brandIDS.length != 0) {
             query.delete("brandIDS");
            query.append("brandIDS", brandIDS.join("_"));
          }
          if(colorIDS.length != 0) {
            query.delete("colorIDS");
            query.append("colorIDS", colorIDS.join("_"));
          }

        // router.push(`${pathname}?${query.toString()}`);
        router.replace(`${pathname}?${query.toString()}`,{
          scroll: false,
        });


    },[brandIDS, colorIDS])

  const handleBrandselect = (e) => {
    const brandID  = e.target.value;
    const currentIDS = [...brandIDS];
    const index = currentIDS.indexOf(brandID);
    if(index != -1){
      currentIDS.splice(index, 1);
    }else{
      currentIDS.push(brandID);
    }
    setBrandIDS(currentIDS);
  }

  const handleColorselect = (e) => {
    const colorID = e.target.value;
    const currentIDS = [...colorIDS];
    const index = currentIDS.indexOf(colorID);
    if(index === -1){
       currentIDS.splice(index, 1);
    }else{
    
        currentIDS.push(colorID);
    }
    setColorIDS(currentIDS);
  }


  const fetchData = async () => {
    const categoryJSON = await getCategory();
    const categoryData = await categoryJSON.categories;
    setCategory(categoryData)

    const brandJSON  = await getBrand();
    const brandData = await brandJSON.brands;
    setBrands(brandData);


    const colorJSON = await getColor();
    const colorData = await colorJSON.colors;
    setColors(colorData);

  }

  useEffect(
    () => {
      fetchData();
    },[]
  )

  return (
    <aside className="w-72 flex flex-col gap-6">
      <CategoryBlock current_category = {category_slug} categories = {categories} />
      <BrandBlock brandIDS = {brandIDS} brands = {brands} handleBrandselect = {handleBrandselect}/>
      <ColorBlock colorIDS = {colorIDS} colors = {colors} handleColorselect = {handleColorselect}/>
    </aside>
  );
}












 