// import { createSlice } from "@reduxjs/toolkit";

// const UserSlice = createSlice(
//     {
//         name: "user",
//         initialState: {
//             data: null
//         },

//         reducers:{
//             setData(current_state,{payload}){

//         }
//       }
//     }
// )

// export const { setData} = UserSlice.actions;

// export default UserSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    token: null
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser(currentState, { payload }) {
            currentState.data = payload.data;
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(payload.data));
            }
        },
        logoutUser(currentState) {
            currentState.data = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
            }
        },
        lsToUser(currentState) {
            if (typeof window === "undefined") return;
            const lsUser = localStorage.getItem("user")
            if (lsUser) {
                try {
                    currentState.data = JSON.parse(lsUser)
                } catch (error) {
                    console.error("Invalid localStorage data:", error);
                    localStorage.removeItem("user");
                    currentState.data = null;
                }
            }
        }
    }
});

export const { loginUser, logoutUser, lsToUser } = userSlice.actions;
export default userSlice.reducer;