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
  CLEAR_ERRORS,
  SAVE_SHIPPING_DETAILS,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAIL,
} from "../constants/cartConstants";

export const addToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART_REQUEST });

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      "https://fyp-five-khaki.vercel.app/api/v1/cart/add",
      reqData,
      { config, withCredentials: true }
    );

    console.log(data.success);
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_REQUEST });

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(
      `https://fyp-five-khaki.vercel.app/api/v1/cart_items/${cartItemId}`,
      { config, withCredentials: true }
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
      `https://fyp-five-khaki.vercel.app/api/v1/cart_items/${reqData.cartItemId}`,
      reqData.data,
      { config, withCredentials: true }
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

    const { data } = await axios.get(
      `https://fyp-five-khaki.vercel.app/api/v1/cart/`,
      { config, withCredentials: true }
    );
    dispatch({ type: GET_USER_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CART_REQUEST });

    await axios.delete("https://fyp-five-khaki.vercel.app/api/v1/cart/clear", {
      withCredentials: true,
    });

    dispatch({ type: CLEAR_CART_SUCCESS });
  } catch (error) {
    dispatch({
      type: CLEAR_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const saveShippingDetails = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_DETAILS,
    payload: data,
  });

  localStorage.setItem("shippingDetails", JSON.stringify(data));
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
