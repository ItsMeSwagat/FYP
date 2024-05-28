import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  ADMIN_UPDATE_ORDER_REQUEST,
  ADMIN_UPDATE_ORDER_SUCCESS,
  ADMIN_UPDATE_ORDER_FAIL,
  ADMIN_DELETE_ORDER_REQUEST,
  ADMIN_DELETE_ORDER_SUCCESS,
  ADMIN_DELETE_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    const paymentUrl = data?.data?.payment_url;
    
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: USER_ORDERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/v1/order/user", {config, withCredentials: true});

    dispatch({ type: USER_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: USER_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/details/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/orders");

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: ADMIN_UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({ type: ADMIN_DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST });

    const { data } = await axios.put(`/api/v1/order/${orderId}/cancel`);

    dispatch({
      type: CANCEL_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
