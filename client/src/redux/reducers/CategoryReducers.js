import { createSlice} from "@reduxjs/toolkit";

const CategorySlice = createSlice(
    {
        name: "category",
        initialState: {
            data: [],
            img_url: ""
        },

        reducers:{
           setData(current_state, {payload} ){
           current_state.data = payload.data;
           current_state.img_url = payload.img_url;
           }
        }
    }
)

export const { setData } = CategorySlice.actions;

export default CategorySlice.reducer;