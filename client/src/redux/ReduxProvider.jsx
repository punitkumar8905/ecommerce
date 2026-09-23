// 'use client'

// import React from 'react'
// import { Provider } from 'react-redux'
// import store from './Store'

// export default function ReduxProvider({children}) {
//   return (
//     <Provider store={store}>
//       {children}
//     </Provider>
//   )
// }



"use client";

import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import store from "./Store";
import { lsToCart } from "@/redux/reducers/CartReducer";

function ReduxInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(lsToCart());
  }, [dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <ReduxInitializer>
        {children}
      </ReduxInitializer>
    </Provider>
  );
}