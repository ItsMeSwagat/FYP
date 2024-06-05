import axios from "axios";
import {
  APPLY_VOUCHER_REQUEST,
  APPLY_VOUCHER_SUCCESS,
  APPLY_VOUCHER_FAIL,
  CLEAR_ERRORS,
  REMOVE_VOUCHER_REQUEST,
  REMOVE_VOUCHER_SUCCESS,
  REMOVE_VOUCHER_FAIL,
  CREATE_VOUCHER_REQUEST,
  CREATE_VOUCHER_SUCCESS,
  CREATE_VOUCHER_FAIL,
  UPDATE_VOUCHER_REQUEST,
  UPDATE_VOUCHER_SUCCESS,
  UPDATE_VOUCHER_FAIL,
  DELETE_VOUCHER_REQUEST,
  DELETE_VOUCHER_SUCCESS,
  DELETE_VOUCHER_FAIL,
  GET_ALL_VOUCHERS_REQUEST,
  GET_ALL_VOUCHERS_SUCCESS,
  GET_ALL_VOUCHERS_FAIL,
  VOUCHER_DETAILS_REQUEST,
  VOUCHER_DETAILS_SUCCESS,
  VOUCHER_DETAILS_FAIL,
} from "../constants/voucherConstants";

export const applyVoucher = (voucherCode) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_VOUCHER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "https://fyp-five-khaki.vercel.app/api/v1/cart/applyvoucher",
      { voucherCode },
      config
    );

    dispatch({ type: APPLY_VOUCHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPLY_VOUCHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const removeVoucher = (voucherCode) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_VOUCHER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://fyp-five-khaki.vercel.app/api/v1/cart/removeVoucher",
      { voucherCode },
      config
    );

    dispatch({
      type: REMOVE_VOUCHER_SUCCESS,
      payload: data.cart,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_VOUCHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createVoucher = (voucherData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_VOUCHER_REQUEST });

    const { data } = await axios.post(
      "https://fyp-five-khaki.vercel.app/api/v1/admin/voucher/create",
      voucherData
    );

    dispatch({
      type: CREATE_VOUCHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_VOUCHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateVoucher = (voucherId, updateData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_VOUCHER_REQUEST });

    const { data } = await axios.put(
      `https://fyp-five-khaki.vercel.app/api/v1/admin/voucher/${voucherId}`,
      updateData
    );

    dispatch({
      type: UPDATE_VOUCHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_VOUCHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteVoucher = (voucherId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_VOUCHER_REQUEST });

    const { data } = await axios.delete(`https://fyp-five-khaki.vercel.app/api/v1/admin/voucher/${voucherId}`);

    dispatch({
      type: DELETE_VOUCHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_VOUCHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllVouchers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_VOUCHERS_REQUEST });

    const { data } = await axios.get("https://fyp-five-khaki.vercel.app/api/v1/admin/voucher/all");

    dispatch({
      type: GET_ALL_VOUCHERS_SUCCESS,
      payload: data.vouchers,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_VOUCHERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getVoucherDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VOUCHER_DETAILS_REQUEST });

    const { data } = await axios.get(`https://fyp-five-khaki.vercel.app/api/v1/admin/voucher/${id}`);

    dispatch({
      type: VOUCHER_DETAILS_SUCCESS,
      payload: data.voucher,
    });
  } catch (error) {
    dispatch({
      type: VOUCHER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearVoucherErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
