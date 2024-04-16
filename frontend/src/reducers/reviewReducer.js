import {
  ADMIN_ALL_REVIEW_FAIL,
  ADMIN_ALL_REVIEW_REQUEST,
  ADMIN_ALL_REVIEW_SUCCESS,
  ADMIN_DELETE_REVIEW_FAIL,
  ADMIN_DELETE_REVIEW_REQUEST,
  ADMIN_DELETE_REVIEW_RESET,
  ADMIN_DELETE_REVIEW_SUCCESS,
  CLEAR_ERRORS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
} from "../constants/reviewConstants";

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const adminProductReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ADMIN_ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ADMIN_ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const adminReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case ADMIN_DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
