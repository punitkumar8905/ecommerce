import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    token: null
};


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginAdmin(currentState, {payload}) {
            currentState.data = payload.data;
            localStorage.setItem("admin", JSON.stringify(payload.data));
        },
        logoutAdmin(currentState) {
            currentState.data = null;
            localStorage.removeItem("admin");
        }, 
        lsToAdmin(currentState){
            const lsAdmin = localStorage.getItem("admin")
            if(lsAdmin){
                try {
                    currentState.data = JSON.parse(lsAdmin)
                } catch (error) {
                    console.error("Invalid localStorage data:", error);
            localStorage.removeItem("admin");
            currentState.data = null;

                }
                
            }
        }
    }
});

export const {loginAdmin, logoutAdmin, lsToAdmin} = adminSlice.actions;
export default adminSlice.reducer;