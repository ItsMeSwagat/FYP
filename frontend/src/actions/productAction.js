import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
} from "../constants/productConstants";

export const getProduct =
  (
    keyword = "",
    currentPage = 1,
    resultPerPage = 8,
    price = [0, 50000],
    category,
    ratings
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let api = `https://fyp-five-khaki.vercel.app/api/v1/products?keyword=${keyword}&page=${currentPage}&limit=${resultPerPage}`;

      if (price && Array.isArray(price) && price.length === 2) {
        api += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }

      if (category) {
        api += `&category=${category}`;
      }

      const { data } = await axios.get(api);

      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAllProductAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("https://fyp-five-khaki.vercel.app/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`https://fyp-five-khaki.vercel.app/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `https://fyp-five-khaki.vercel.app/api/v1/admin/product/create`,
      productData,
      config
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `https://fyp-five-khaki.vercel.app/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: ADMIN_UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`https://fyp-five-khaki.vercel.app/api/v1/admin/product/${id}`);

    dispatch({
      type: ADMIN_DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
