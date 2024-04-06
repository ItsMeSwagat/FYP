import axios from "axios";
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  GET_USER_CART_REQUEST,
  GET_USER_CART_SUCCESS,
  GET_USER_CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAIL,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_FAIL,
  APPLY_VOUCHER_REQUEST,
  APPLY_VOUCHER_SUCCESS,
  APPLY_VOUCHER_FAIL,
  CLEAR_ERRORS,
} from "../constants/cartConstants";

export const addToCart = (data) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART_REQUEST });

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data: responseData } = await axios.put(
      "/api/v1/cart/add",
      data,
      config
    );
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: responseData });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error.message,
    });
  }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_REQUEST });

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(
      `/api/v1/cart_items/${cartItemId}`,
      config
    );
    dispatch({ type: REMOVE_CART_SUCCESS, payload: cartItemId });
  } catch (error) {
    dispatch({ type: REMOVE_CART_FAIL, payload: error.response.data.message });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_REQUEST });

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/cart_items/${reqData.cartItemId}`,
      reqData.data,
      config
    );
    dispatch({ type: UPDATE_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_FAIL, payload: error.response.data.message });
  }
};

export const getUserCart = () => async (dispatch) => {
  dispatch({ type: GET_USER_CART_REQUEST });

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.get(`/api/v1/cart/`, config);
    dispatch({ type: GET_USER_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const applyVoucher = (voucherCode) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_VOUCHER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/cart/applyvoucher",
      { voucherCode },
      config
    );

    dispatch({ type: APPLY_VOUCHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPLY_VOUCHER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
