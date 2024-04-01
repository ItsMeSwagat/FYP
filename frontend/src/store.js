import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import { profileReducer } from "./reducers/profileReducer";
import { forgotPasswordReducer } from "./reducers/forgotPasswordReducer";
import { thunk } from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let initialCartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: {
    cart: initialCartState,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const persistor = persistStore(store);

export {store, persistor};
