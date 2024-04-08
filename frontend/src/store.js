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
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { voucherReducer } from "./reducers/applyVoucherReducer";

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  voucher: voucherReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

let initialState = {
  user: {
    loading: false,
    isAuthenticated: false,
  },
  cart: {
    cart: {},
    loading: false,
    error: null,
    cartItems: [],
    shippingDetails: localStorage.getItem("shippingDetails")
      ? JSON.parse(localStorage.getItem("shippingDetails"))
      : {},
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,
});

const persistor = persistStore(store);

export { store, persistor };
