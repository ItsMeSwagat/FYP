import axios from "axios";
import {
  ADMIN_ALL_REVIEW_FAIL,
  ADMIN_ALL_REVIEW_REQUEST,
  ADMIN_ALL_REVIEW_SUCCESS,
  ADMIN_DELETE_REVIEW_FAIL,
  ADMIN_DELETE_REVIEW_REQUEST,
  ADMIN_DELETE_REVIEW_SUCCESS,
  CLEAR_ERRORS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
} from "../constants/reviewConstants";

export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`https://fyp-five-khaki.vercel.app/api/v1/review`, reviewData, config);

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminGetAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`https://fyp-five-khaki.vercel.app/api/v1/reviews?id=${id}`);

    dispatch({
      type: ADMIN_ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminDeleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `https://fyp-five-khaki.vercel.app/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: ADMIN_DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
