import React from 'react'
import { getProduct } from '@/library/api-call';

export default async function page({ params, searchParams }) {

        const { category_slug } = await params;
        const query = { category_slug: category_slug, status: true, limit: 10 };
        const urlSearchParams = new URLSearchParams(searchParams);
        if(urlSearchParams.brand_id){
            query.brand_id = await urlSearchParams.brand_id;
        }
        if(urlSearchParams.color_id){
            query.color_id = await urlSearchParams.color_id;  
        }
    
        const productJSON = await getProduct(query);
    const image_path = productJSON.image_path;
    const productsData = productJSON.products;
    const ishotProducts = productsData.filter(
        (product) => {
            if(product.is_hot === true){
                return true;
            }else{
                return false;
            }
        });
    
  return (
    <div>page</div>
  )
}
