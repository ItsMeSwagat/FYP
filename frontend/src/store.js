import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  productsReducer,
  productDetailsReducer,
  createProductReducer,
  productReducer,
} from "./reducers/productReducer";
import { adminAllUsersReducer, adminUserDetailsReducer, userReducer } from "./reducers/userReducer";
import { profileReducer } from "./reducers/profileReducer";
import { forgotPasswordReducer } from "./reducers/forgotPasswordReducer";
import { thunk } from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { adminVoucherReducer, createVoucherReducer, getAllVouchersReducer, voucherDetailsReducer, voucherReducer } from "./reducers/applyVoucherReducer";
import {
  createOrderReducer,
  getAllOrdersReducer,
  orderDetailsReducer,
  orderReducer,
  userOrdersReducer,
} from "./reducers/orderReducer";
import { adminProductReviewsReducer, adminReviewReducer, createReviewReducer } from "./reducers/reviewReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  product: productReducer,
  user: userReducer,
  profile: profileReducer,
  newOrder: createOrderReducer,
  userOrder: userOrdersReducer,
  orderDetail: orderDetailsReducer,
  createReview: createReviewReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  voucher: voucherReducer,
  newProduct: createProductReducer,
  allOrders: getAllOrdersReducer,
  order: orderReducer,
  userDetails: adminUserDetailsReducer,
  allUsers: adminAllUsersReducer,
  adminProductReviews: adminProductReviewsReducer,
  adminReview: adminReviewReducer,
  adminVoucher: adminVoucherReducer,
  createVoucher: createVoucherReducer,
  allVouchers: getAllVouchersReducer,
  voucherDetails: voucherDetailsReducer,
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
