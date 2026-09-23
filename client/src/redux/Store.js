import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducers/AdminReducers";
import ProductReducer from "./reducers/ProductReducers";
import CategoryReducer from "./reducers/CategoryReducers";
import UserReducers from "./reducers/UserReducers";
import CartReducer from "./reducers/CartReducer";

const  store = configureStore({
    reducer: {
        admin: adminReducer,
        product: ProductReducer,
        category: CategoryReducer,
        user: UserReducers,
        cart: CartReducer
    },
});

export default store;