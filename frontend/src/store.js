import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { productReducer, productDetailsReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import {thunk}  from "redux-thunk";

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
});


let initialState = {};

const store = configureStore({reducer: rootReducer, initialState, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)});

export default store;
