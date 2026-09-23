import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice(
    {
        name: "product",
        initialState: {
            data: [],
            img_url: ""
        },

        reducers:{
            getAllData(){

            },
            getActiveData(){

            },
            getHomeData(){

            }
        }
    }
)

export const { getAllData, getActiveData, getHomeData} = ProductSlice.actions;

export default ProductSlice.reducer;