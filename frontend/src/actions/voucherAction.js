import axios from "axios";
import {
  APPLY_VOUCHER_REQUEST,
  APPLY_VOUCHER_SUCCESS,
  APPLY_VOUCHER_FAIL,
  CLEAR_ERRORS,
  REMOVE_VOUCHER_REQUEST,
  REMOVE_VOUCHER_SUCCESS,
  REMOVE_VOUCHER_FAIL,
} from "../constants/voucherConstants";

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
      "/api/v1/cart/removeVoucher",
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

export const clearVoucherErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
